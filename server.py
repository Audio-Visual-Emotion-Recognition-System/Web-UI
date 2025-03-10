from flask import Flask, Response, jsonify
import cv2
import imutils
import dlib
from keras.models import load_model
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array
from scipy.spatial import distance as dist
import os

app = Flask(__name__)

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
video_emotion_model_path = os.path.join(BASE_DIR, "models", "model_num.hdf5")
shape_predictor_path = os.path.join(
    BASE_DIR, "models", "shape_predictor_68_face_landmarks.dat"
)  # Fixed extra space

# Load models
emotion_classifier = load_model(video_emotion_model_path, compile=False)
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(shape_predictor_path)

# Emotion labels
EMOTIONS = ["angry", "disgust", "fear", "happy", "sad", "surprised", "neutral"]

# Store latest detected emotion globally
latest_emotion = "neutral"


# EAR Calculation for blink detection
def eye_aspect_ratio(eye):
    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])
    C = dist.euclidean(eye[0], eye[3])
    return (A + B) / (2.0 * C)


# Generate Video Frames
def generate_frames():
    global latest_emotion  # Track latest detected emotion
    cap = cv2.VideoCapture(0)
    EAR_THRESHOLD = 0.25
    CONSEC_FRAMES = 3
    blink_counter = 0
    total_blinks = 0

    while True:
        success, frame = cap.read()
        if not success:
            break

        frame = imutils.resize(frame, width=600)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = detector(gray)

        if len(faces) == 0:
            latest_emotion = "neutral"  # No face detected
        else:
            for face in faces:
                landmarks = predictor(gray, face)

                left_eye = [
                    (landmarks.part(i).x, landmarks.part(i).y) for i in range(36, 42)
                ]
                right_eye = [
                    (landmarks.part(i).x, landmarks.part(i).y) for i in range(42, 48)
                ]
                ear = (eye_aspect_ratio(left_eye) + eye_aspect_ratio(right_eye)) / 2.0

                if ear < EAR_THRESHOLD:
                    blink_counter += 1
                else:
                    if blink_counter >= CONSEC_FRAMES:
                        total_blinks += 1
                    blink_counter = 0

                (x, y, w, h) = (face.left(), face.top(), face.width(), face.height())

                face_roi = gray[y : y + h, x : x + w]
                face_roi = cv2.resize(face_roi, (48, 48))
                face_roi = face_roi.astype("float") / 255.0
                face_roi = img_to_array(face_roi)
                face_roi = np.expand_dims(face_roi, axis=0)

                preds = emotion_classifier.predict(face_roi)[0]
                latest_emotion = EMOTIONS[preds.argmax()]  # Update latest emotion

                # Draw on the frame
                cv2.rectangle(frame, (x, y), (x + w, y + h), (100, 200, 255), 2)
                cv2.putText(
                    frame,
                    f"Attentive ({latest_emotion})",
                    (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.6,
                    (255, 255, 255),
                    2,
                )

                cv2.putText(
                    frame,
                    f"Blinks: {total_blinks}",
                    (10, 60),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.7,
                    (0, 255, 0),
                    2,
                )

        _, buffer = cv2.imencode(".jpg", frame)
        frame_bytes = buffer.tobytes()
        yield (
            b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n"
        )

    cap.release()


# Video Feed Route
@app.route("/video_feed")
def video_feed():
    return Response(
        generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame"
    )


# Emotion API Route
@app.route("/emotion")
def get_emotion():
    return jsonify({"emotion": latest_emotion})  # Return the latest detected emotion


# Start Server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)
