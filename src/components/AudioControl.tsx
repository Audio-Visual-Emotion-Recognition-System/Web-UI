import React, { useState } from 'react';

const AudioControl: React.FC = () => {
    const [isRecording, setIsRecording] = useState<boolean>(false);

    const toggleRecording = () => {
        setIsRecording((prev) => !prev);
        console.log(isRecording ? 'Stopped recording' : 'Started recording');
    };

    return (
        <button
            onClick={toggleRecording}
            className="px-4 py-2 bg-blue-600 text-white rounded"
        >
            {isRecording ? 'Stop Audio' : 'Start Audio'}
        </button>
    );
};

export default AudioControl;
