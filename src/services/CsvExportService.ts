const CsvExportService = {
    exportToCsv: (data: string[]) => {
        const csvContent = 'data:text/csv;charset=utf-8,' + data.join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'emotion_history.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
};

export default CsvExportService;
