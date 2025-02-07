import React from 'react';
import CsvExportService from '../services/CsvExportService';

const HistoricalDataPanel: React.FC<{ emotionHistory: string[] }> = ({ emotionHistory }) => {
    const handleExport = () => {
        CsvExportService.exportToCsv(emotionHistory);
    };

    return (
        <div className="history-panel">
            <h2>Historical Emotion Data</h2>
            <ul>
                {emotionHistory.map((emotion, index) => (
                    <li key={index}>
                        {index + 1}. {emotion}
                    </li>
                ))}
            </ul>
            <button onClick={handleExport}>Export as CSV</button>
        </div>
    );
};

export default HistoricalDataPanel;
