# Jupyter Notebook for Audio-Visual Emotion Recognition System

## **Step 1: Import Required Libraries**

```python
import numpy as np
import matplotlib.pyplot as plt
import librosa
import librosa.display
import cv2
import os
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, Conv2D, Flatten, LSTM, Concatenate, MaxPooling2D, Dropout
from sklearn.model_selection import train_test_split
```

---

## **Step 2: Data Loading and Exploration**

### **2.1 Load Visual Data (Images)**

Assume that the image dataset is stored in a directory `./images` with subfolders for each emotion (e.g., `Happy`, `Sad`).

```python
image_data = []
labels = []
emotion_classes = {"Happy": 0, "Sad": 1, "Angry": 2, "Surprised": 3, "Neutral": 4}

for emotion, label in emotion_classes.items():
    folder_path = f"./images/{emotion}"
    for filename in os.listdir(folder_path):
        image_path = os.path.join(folder_path, filename)
        image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        resized_image = cv2.resize(image, (48, 48))
        image_data.append(resized_image)
        labels.append(label)

image_data = np.array(image_data).reshape(-1, 48, 48, 1) / 255.0  # Normalize
labels = np.array(labels)
```

### **2.2 Load Audio Data**
Assume audio files are in `./audio`, one folder per emotion.

```python
def extract_audio_features(file_path):
    y, sr = librosa.load(file_path)
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
    return np.mean(mfccs.T, axis=0)

audio_data = []
labels_audio = []

for emotion, label in emotion_classes.items():
    folder_path = f"./audio/{emotion}"
    for filename in os.listdir(folder_path):
        audio_path = os.path.join(folder_path, filename)
        features = extract_audio_features(audio_path)
        audio_data.append(features)
        labels_audio.append(label)

audio_data = np.array(audio_data)
labels_audio = np.array(labels_audio)
```

### **2.3 Visualize a Sample Image and Audio Waveform**

```python
plt.figure(figsize=(6, 3))
plt.imshow(image_data[0].reshape(48, 48), cmap='gray')
plt.title("Sample Face Image")
plt.show()

plt.figure(figsize=(10, 4))
librosa.display.waveshow(librosa.load(f"./audio/Happy/sample.wav")[0], sr=22050)
plt.title("Sample Audio Waveform")
plt.show()
```

---

## **Step 3: Train-Test Split**

```python
X_train_images, X_test_images, y_train, y_test = train_test_split(image_data, labels, test_size=0.2, random_state=42)
X_train_audio, X_test_audio, y_train_audio, y_test_audio = train_test_split(audio_data, labels_audio, test_size=0.2, random_state=42)
```

---

## **Step 4: Model Definition**

### **Vision Submodel**

```python
vision_input = Input(shape=(48, 48, 1))
vision_model = Conv2D(32, (3, 3), activation='relu')(vision_input)
vision_model = MaxPooling2D(pool_size=(2, 2))(vision_model)
vision_model = Flatten()(vision_model)
```

### **Audio Submodel**

```python
audio_input = Input(shape=(40, 1))
audio_model = LSTM(64, return_sequences=False)(audio_input)
```

### **Fusion Layer**

```python
merged = Concatenate()([vision_model, audio_model])
merged = Dense(128, activation='relu')(merged)
merged = Dropout(0.5)(merged)
output = Dense(5, activation='softmax')(merged)

model = Model(inputs=[vision_input, audio_input], outputs=output)
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
```

---

## **Step 5: Training the Model**

```python
history = model.fit(
    [X_train_images, X_train_audio], y_train,
    validation_data=([X_test_images, X_test_audio], y_test),
    epochs=30,
    batch_size=32,
    verbose=1
)
```

---

## **Step 6: Plot Training Results**

```python
plt.plot(history.history['accuracy'], label='train accuracy')
plt.plot(history.history['val_accuracy'], label='validation accuracy')
plt.legend()
plt.show()
```

---

## **Step 7: Evaluate the Model**

```python
eval_results = model.evaluate([X_test_images, X_test_audio], y_test)
print(f"Test Accuracy: {eval_results[1] * 100:.2f}%")
```

---

## **Step 8: Export the Model for Deployment**

```python
model.save("./emotion_model.h5")
```

---

## **Step 9: TensorRT Optimization (On Jetson)**
Use the following commands in the Jetson environment:

```bash
trtexec --savedModel=./emotion_model --fp16
```

---

You’re all set to deploy and run on Jetson AI with the optimized model! 🚀
