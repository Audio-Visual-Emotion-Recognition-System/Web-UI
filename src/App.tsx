import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import AppWithJetson from './AppWithJetson';
import AppWithoutJetson from './AppWithoutJetson';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="container">
                <header className="header">
                    <h1>Audio-Visual Emotion Recognition System</h1>
                    <nav>
                        <ul className="nav-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/with-jetson">With Jetson AI</Link></li>
                            <li><Link to="/without-jetson">Without Jetson AI</Link></li>
                            <li><Link to="/project-breakdown">Project Breakdown</Link></li>
                            <li><Link to="/authors">Authors</Link></li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={
                            <div className="landing-page">
                                <h2>Welcome to the Emotion Recognition System</h2>
                                <p>This project integrates cutting-edge audio and visual emotion recognition technologies. Explore the system below:</p>
                                <div className="button-group">
                                    <Link to="/with-jetson" className="button">With Jetson AI</Link>
                                    <Link to="/without-jetson" className="button">Without Jetson AI</Link>
                                </div>
                            </div>
                        } />
                        <Route path="/with-jetson" element={<AppWithJetson />} />
                        <Route path="/without-jetson" element={<AppWithoutJetson />} />
                        <Route path="/project-breakdown" element={<ProjectBreakdown />} />
                        <Route path="/authors" element={<Authors />} />
                    </Routes>
                </main>

                <footer className="footer">
                    <p>&copy; 2025 Audio-Visual Emotion Recognition System. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
};

const ProjectBreakdown: React.FC = () => (
    <div className="project-breakdown">
        <h2>Project Breakdown</h2>
        <section>
            <h3>1. Problem Statement</h3>
            <p>Develop a real-time system that recognizes human emotions by analyzing facial expressions and voice tone, combining these modalities for improved accuracy.</p>

            <h3>2. Key Features</h3>
            <ul>
                <li><strong>Visual Emotion Recognition:</strong> Detects faces and classifies expressions (e.g., happy, sad, angry).</li>
                <li><strong>Audio Emotion Recognition:</strong> Captures audio input and analyzes features like pitch and tone.</li>
                <li><strong>Multimodal Fusion:</strong> Combines visual and audio data for enhanced accuracy.</li>
                <li><strong>Output:</strong> Displays detected emotions in real-time or sends results to a mobile app.</li>
            </ul>

            <h3>3. Technology Stack</h3>
            <ul>
                <li><strong>Languages:</strong> Python, C/C++.</li>
                <li><strong>Libraries:</strong> OpenCV, TensorFlow, Librosa, PyTorch.</li>
                <li><strong>Hardware:</strong> NVIDIA Jetson Nano, camera module, microphone.</li>
                <li><strong>Datasets:</strong> FER-2013, RAVDESS.</li>
            </ul>

            <h3>4. UML Overview</h3>
            <p>The system architecture includes edge processing on devices like NVIDIA Jetson Nano, communication via WebSockets/REST APIs, and a web app interface for visualization.</p>
        </section>
    </div>
);

const Authors: React.FC = () => (
    <div className="authors">
        <h2>Authors</h2>
        <ul>
            <li>Aaron</li>
            <li>Bisum</li>
            <li>Ratish</li>
        </ul>

        <p>This project was collaboratively developed by a team of researchers passionate about embedded machine learning and emotion recognition technologies.</p>
    </div>
);

export default App;
