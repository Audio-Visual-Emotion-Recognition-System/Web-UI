class WebSocketService {
    private socket: WebSocket | null = null;

    connect(url: string, onMessage: (message: string) => void) {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        this.socket.onmessage = (event) => {
            onMessage(event.data);  // Pass received message to App
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
        }
    }

    send(message: string) {
        if (this.socket) {
            this.socket.send(message);
        }
    }
}

export default new WebSocketService();
