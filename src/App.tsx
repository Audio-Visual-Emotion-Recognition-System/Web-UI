import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import AppWithJetson from './AppWithJetson';
import AppWithoutJetson from './AppWithoutJetson';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="container">
                <div className="header">
                    <h1>Audio-Visual Emotion Recognition System</h1>
                    <nav>
                        <ul className="nav-links">
                            <li>
                                <Link to="/with-jetson">With Jetson AI</Link>
                            </li>
                            <li>
                                <Link to="/without-jetson">Without Jetson AI</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <Routes>
                    <Route path="/with-jetson" element={<AppWithJetson />} />
                    <Route path="/without-jetson" element={<AppWithoutJetson />} />
                    <Route path="/" element={
                        <div className="landing-page">
                            <h2>Welcome to the Emotion Recognition System</h2>
                            <p>Select one of the options above to get started:</p>
                            <div className="button-group">
                                <Link to="/with-jetson" className="button">With Jetson AI</Link>
                                <Link to="/without-jetson" className="button">Without Jetson AI</Link>
                            </div>
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
