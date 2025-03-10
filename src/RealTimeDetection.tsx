import  { Component } from "react";
import "./RealTimeDetection.css";

interface State {
    emotion: string;
    emotionHistory: string[];
    isStreaming: boolean;
}

class RealTimeDetection extends Component<object, State> {
    private emotionInterval: ReturnType<typeof setInterval> | null = null;

    constructor(props: object) {
        super(props);
        this.state = {
            emotion: "Neutral 🙂",
            emotionHistory: [],
            isStreaming: true,
        };
    }

    componentDidMount() {
        this.fetchEmotion();
        this.emotionInterval = setInterval(() => this.fetchEmotion(), 4000);
    }

    componentWillUnmount() {
        if (this.emotionInterval) {
            clearInterval(this.emotionInterval);
        }
    }

    fetchEmotion = async () => {
        try {
            const response = await fetch("http://localhost:4000/emotion");
            const data = await response.json();
            const detectedEmotion = this.getEmoji(data.emotion);

            this.setState((prevState) => ({
                emotion: detectedEmotion,
                emotionHistory: [detectedEmotion, ...prevState.emotionHistory.slice(0, 4)],
            }));
        } catch (error) {
            console.error("Error fetching emotion:", error);
        }
    };

    getEmoji = (emotion: string) => {
        const emojiMap: { [key: string]: string } = {
            happy: "Happy 😃",
            sad: "Sad 😢",
            angry: "Angry 😡",
            surprised: "Surprised 😲",
            neutral: "Neutral 🙂",
            fear: "Fear 😨",
            disgust: "Disgust 🤢",
        };
        return emojiMap[emotion] || "Neutral 🙂";
    };

    toggleVideo = () => {
        this.setState((prevState) => ({ isStreaming: !prevState.isStreaming }));
    };

    render() {
        return (
            <div className="real-time-detection-container">
                <h2 className="title">Real-Time Attention Detection</h2>

                <div className="info-box">
                    <p>
                        This system performs <strong>real-time emotion recognition</strong> using a deep learning model trained on the <strong>FER-2013 dataset</strong>.
                        It detects <strong>facial landmarks</strong> and classifies emotions using <strong>Dlib's 68-point model</strong>.
                    </p>
                </div>

                <div className="video-box">
                    {this.state.isStreaming ? (
                        <img src="http://localhost:4000/video_feed" alt="Live Video Stream" className="video-stream" />
                    ) : (
                        <div className="video-placeholder">Video Stopped</div>
                    )}
                </div>

                <div className="controls">
                    <button onClick={this.toggleVideo} className="toggle-btn">
                        {this.state.isStreaming ? "Stop Video" : "Start Video"}
                    </button>
                    <button className="feedback-btn thumbs-up">👍 Correct</button>
                    <button className="feedback-btn thumbs-down">👎 Incorrect</button>
                </div>
            </div>
        );
    }
}

export default RealTimeDetection;
