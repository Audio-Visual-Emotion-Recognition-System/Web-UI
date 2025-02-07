import React from 'react';
import './Header.css';

const Header: React.FC<{ connected: boolean }> = ({ connected }) => {
    return (
        <header className="header">
            <h1>Audio-Visual Emotion Recognition System</h1>
            <div className={`status ${connected ? 'connected' : 'disconnected'}`}>
                {connected ? 'Connected to Jetson AI' : 'Disconnected'}
            </div>
        </header>
    );
};

export default Header;
