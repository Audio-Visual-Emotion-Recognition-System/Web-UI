import React from 'react';

interface EmotionHistoryProps {
    history: string[];
}

const EmotionHistory: React.FC<EmotionHistoryProps> = ({ history }) => {
    return (
        <div>
            <h3 className="font-semibold text-lg">Emotion History</h3>
            <ul>
                {history.map((emotion, index) => (
                    <li key={index} className="text-gray-700">
                        {index + 1}. {emotion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmotionHistory;
