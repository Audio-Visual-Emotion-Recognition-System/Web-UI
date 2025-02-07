import React from 'react';
import { FaSmile, FaFrown, FaAngry, FaSurprise } from 'react-icons/fa';

interface EmotionDisplayProps {
    emotion: string;
}

const EmotionDisplay: React.FC<EmotionDisplayProps> = ({ emotion }) => {
    const getEmotionIcon = () => {
        switch (emotion) {
            case 'Happy':
                return <FaSmile className="text-yellow-500 text-5xl" />;
            case 'Sad':
                return <FaFrown className="text-blue-500 text-5xl" />;
            case 'Angry':
                return <FaAngry className="text-red-500 text-5xl" />;
            case 'Surprised':
                return <FaSurprise className="text-orange-500 text-5xl" />;
            default:
                return <FaSmile className="text-gray-500 text-5xl" />;
        }
    };

    return (
        <div className="text-center">
            {getEmotionIcon()}
            <p className="text-xl font-semibold mt-2">Current Emotion: {emotion}</p>
        </div>
    );
};

export default EmotionDisplay;
