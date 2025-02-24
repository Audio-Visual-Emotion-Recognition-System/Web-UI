import React, {useEffect, useRef, useState} from 'react';
import {FaceMesh, FACEMESH_TESSELATION, Results} from '@mediapipe/face_mesh';
import {drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils';
import {FaCamera, FaMicrophone, FaRobot} from 'react-icons/fa';
import Waveform from './components/Waveform';
import './App.css';

const AppWithoutJetson: React.FC = () => {
    const [emotion, setEmotion] = useState<string>('Neutral');
    const [emotionHistory, setEmotionHistory] = useState<string[]>([]);
    const [videoStatus, setVideoStatus] = useState<boolean>(false);
    const [audioStatus, setAudioStatus] = useState<boolean>(false);
    const [mediaPipeActive, setMediaPipeActive] = useState<boolean>(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        console.log("Audio status changed:", audioStatus);
        if (audioStatus) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    if (audioRef.current) {
                        audioRef.current.srcObject = stream;
                        audioRef.current.play();
                        console.log("🎤 Microphone started");
                    }
                })
                .catch((err) => console.error("Failed to access microphone:", err));
        } else if (audioRef.current && audioRef.current.srcObject) {
            const stream = audioRef.current.srcObject as MediaStream;
            stream?.getTracks().forEach(track => track.stop());
            audioRef.current.srcObject = null;
            console.log("🎤 Microphone stopped");
        }
    }, [audioStatus]);

    const startVideoStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setVideoStatus(true);
                console.log("🎥 Video stream started");
            }
        } catch (err) {
            console.error("Failed to access camera:", err);
        }
    };

    const stopVideoStream = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream?.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setVideoStatus(false);
            console.log("🛑 Video stream stopped");
        }
    };

    const initMediaPipe = async () => {
        if (mediaPipeActive) return;

        console.log("⚙️ Initializing MediaPipe...");

        const faceMesh = new FaceMesh({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        faceMesh.onResults(onResults);

        if (!videoStatus) {
            await startVideoStream();
        }

        const detectFaces = async () => {
            if (!videoRef.current) return;
            const video = videoRef.current;

            const loop = async () => {
                if (!mediaPipeActive) return;
                if (video.readyState === 4) {
                    await faceMesh.send({ image: video });
                }
                requestAnimationFrame(loop);
            };
            requestAnimationFrame(loop);
        };

        setMediaPipeActive(true);
        detectFaces();
        console.log("✅ MediaPipe initialized");
    };

    const stopMediaPipe = () => {
        setMediaPipeActive(false);
        console.log("⛔ MediaPipe stopped");
    };

    const onResults = (results: Results) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

        if (results.multiFaceLandmarks) {
            for (const landmarks of results.multiFaceLandmarks) {
                drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, { color: '#00FF00', lineWidth: 0.5 });
                drawLandmarks(ctx, landmarks, { color: '#FF0000', lineWidth: 0.5 });

                const upperLip = landmarks[13];
                const lowerLip = landmarks[14];
                const mouthOpen = Math.abs(upperLip.y - lowerLip.y);

                let detectedEmotion = 'Neutral';
                if (mouthOpen > 0.05) {
                    detectedEmotion = 'Happy';
                }

                setEmotion(detectedEmotion);
                setEmotionHistory((prev) => [...prev, detectedEmotion]);
            }
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Emotion Recognition (No Jetson)</h1>
            </div>

            <div className="video-container" style={{ position: 'relative' }}>
                <video ref={videoRef} autoPlay muted className="video-feed" width="640" height="480" />
                <canvas ref={canvasRef} className="video-feed" width="640" height="480" style={{ position: 'absolute', top: 0, left: 0 }} />
            </div>

            <div className="emotion-display">
                <p>Detected Emotion: <span className="emotion-text">{emotion}</span></p>
            </div>

            <div className="waveform-container">
                <Waveform active={audioStatus} />
            </div>

            <div className="button-group">
                <button onClick={() => videoStatus ? stopVideoStream() : startVideoStream()}>
                    <FaCamera /> {videoStatus ? 'Stop Video' : 'Start Video'}
                </button>
                <button onClick={() => setAudioStatus(!audioStatus)}>
                    <FaMicrophone /> {audioStatus ? 'Stop Audio' : 'Start Audio'}
                </button>
                <button onClick={initMediaPipe}>
                    <FaRobot /> Start MediaPipe
                </button>
                <button onClick={stopMediaPipe}>
                    <FaRobot /> Stop MediaPipe
                </button>
            </div>

            <div className="emotion-history">
                <h3>Emotion History</h3>
                <ul>
                    {emotionHistory.map((e, index) => (
                        <li key={index}>{index + 1}. {e}</li>
                    ))}
                </ul>
            </div>

            <audio ref={audioRef} hidden />
        </div>
    );
};

export default AppWithoutJetson;
