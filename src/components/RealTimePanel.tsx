import React from 'react';
import Waveform from './Waveform';

const RealTimePanel: React.FC<{
    videoStatus: boolean;
    emotion: string;
    toggleVideo: () => void;
    audioStatus: boolean;
    toggleAudio: () => void;
}> = ({ videoStatus, emotion, toggleVideo, audioStatus, toggleAudio }) => {
    return (
        <div className="real-time-panel">
            <h2>Real-Time Emotion Detection</h2>

            {/* Video Feed */}
            <div className="video-section">
                {videoStatus ? (
                    <video id="videoFeed" autoPlay muted className="video-feed" />
                ) : (
                    <div className="no-video">No Video Feed Available</div>
                )}
            </div>

            <p>Detected Emotion: <span className="detected-emotion">{emotion}</span></p>

            {/* Audio Visualization */}
            <Waveform active={false} />

            {/* Control Buttons */}
            <div className="control-buttons">
                <button onClick={toggleVideo}>
                    {videoStatus ? 'Stop Video' : 'Start Video'}
                </button>
                <button onClick={toggleAudio}>
                    {audioStatus ? 'Stop Audio' : 'Start Audio'}
                </button>
            </div>
        </div>
    );
};

export default RealTimePanel;
