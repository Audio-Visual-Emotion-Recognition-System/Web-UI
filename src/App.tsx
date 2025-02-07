import React, { useEffect, useState } from 'react';
import WebSocketService from './services/WebSocketService';
import { FaSmile, FaFrown, FaAngry, FaSurprise, FaCamera, FaMicrophone } from 'react-icons/fa';
import Waveform from './components/Waveform';
import './App.css';

const App: React.FC = () => {
    const [emotion, setEmotion] = useState<string>('Neutral');
    const [emotionHistory, setEmotionHistory] = useState<string[]>([]);
    const [videoStatus, setVideoStatus] = useState<boolean>(false);
    const [audioStatus, setAudioStatus] = useState<boolean>(false);
    const [jetsonConnected, setJetsonConnected] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {
        if (audioStatus) {
            WebSocketService.connect('ws://localhost:8080', (message: string) => {
                setEmotion(message);
                setEmotionHistory((prev) => [...prev, message]);
            });
        } else {
            WebSocketService.disconnect();
        }
    }, [audioStatus]);

    const startVideoStream = async (deviceId: string | undefined = undefined) => {
        try {
            const constraints: MediaStreamConstraints = { video: true };
            if (deviceId) {
                constraints.video = { deviceId: { exact: deviceId } };
            }
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            const videoElement = document.getElementById('videoFeed') as HTMLVideoElement;
            if (videoElement) {
                videoElement.srcObject = stream;
            }
        } catch (err) {
            console.error('Failed to access camera:', err);
        }
    };

    const handleJetsonConnect = () => {
        if (jetsonConnected) {
            startVideoStream(); // Use local camera
        } else {
            setShowPopup(true);
        }
    };

    const connectJetsonCamera = async () => {
        setJetsonConnected(true);
        setShowPopup(false);
        // Simulate switching to a different hardware camera (Jetson AI camera)
        const jetsonDeviceId = 'jetson-camera-id'; // Replace with actual hardware ID
        startVideoStream(jetsonDeviceId);
    };

    const getEmotionIcon = () => {
        switch (emotion) {
            case 'Happy': return <FaSmile className="emotion-icon text-yellow-500" />;
            case 'Sad': return <FaFrown className="emotion-icon text-blue-500" />;
            case 'Angry': return <FaAngry className="emotion-icon text-red-500" />;
            case 'Surprised': return <FaSurprise className="emotion-icon text-orange-500" />;
            default: return <FaSmile className="emotion-icon text-gray-500" />;
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Audio-Visual Emotion Recognition System</h1>
                <div className={`status ${audioStatus ? 'connected' : 'disconnected'}`}>
                    {audioStatus ? 'Connected to Audio' : 'Audio Disabled'}
                </div>
            </div>

            <div className="card">
                {/* Video Section */}
                <div className="video-container">
                    {videoStatus ? (
                        <video id="videoFeed" autoPlay muted className="video-feed" />
                    ) : (
                        <div className="no-video">No Video Feed Available</div>
                    )}
                </div>

                {/* Detected Emotion */}
                <div className="emotion-display">
                    {getEmotionIcon()}
                    <p>Detected Emotion: <span className="emotion-text">{emotion}</span></p>
                </div>

                {/* Audio Waveform */}
                <div className="waveform-container">
                    <Waveform active={audioStatus} />
                </div>

                {/* Buttons to Control Video, Audio, and Jetson */}
                <div className="button-group">
                    <button onClick={() => setVideoStatus(!videoStatus)}>
                        <FaCamera /> {videoStatus ? 'Stop Video' : 'Start Video'}
                    </button>
                    <button onClick={() => setAudioStatus(!audioStatus)}>
                        <FaMicrophone /> {audioStatus ? 'Stop Audio' : 'Start Audio'}
                    </button>
                    <button onClick={handleJetsonConnect}>
                        {jetsonConnected ? 'Switch to Local Camera' : 'Connect to Jetson AI'}
                    </button>
                </div>

                {/* Popup Modal */}
                {showPopup && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>Please Connect to Jetson AI</h2>
                            <p>The system needs to establish a connection with Jetson AI to access its camera.</p>
                            <div className="modal-buttons">
                                <button onClick={connectJetsonCamera}>Connect</button>
                                <button onClick={() => setShowPopup(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Emotion History */}
                <div className="emotion-history">
                    <h3>Emotion History</h3>
                    <ul>
                        {emotionHistory.map((e, index) => (
                            <li key={index}>{index + 1}. {e}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default App;
