class WebSocketService {
    private socket: WebSocket | null = null;
    private reconnectInterval: number = 5000;
    private shouldReconnect: boolean = false;

    connect(url: string, onMessage: (message: string) => void) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            console.log('WebSocket already connected.');
            return;
        }

        this.shouldReconnect = true;

        try {
            this.socket = new WebSocket(url);

            this.socket.onopen = () => {
                console.log('✅ WebSocket connection established');
            };

            this.socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.emotion) {
                        onMessage(data.emotion);
                    } else {
                        console.warn('⚠️ Unrecognized message format:', data);
                    }
                } catch (error) {
                    console.error('❌ Error parsing WebSocket message:', error);
                }
            };

            this.socket.onerror = (error) => {
                console.error('🔥 WebSocket error:', error);
            };

            this.socket.onclose = (event) => {
                console.log(`🔌 WebSocket closed: Code ${event.code}, Reason: ${event.reason}`);
                if (!event.wasClean && this.shouldReconnect) {
                    console.log(`🔄 Reconnecting in ${this.reconnectInterval / 1000}s...`);
                    setTimeout(() => this.connect(url, onMessage), this.reconnectInterval);
                }
            };
        } catch (error) {
            console.error('❌ Failed to establish WebSocket connection:', error);
        }
    }

    disconnect() {
        if (this.socket) {
            console.log('🚫 Closing WebSocket connection...');
            this.shouldReconnect = false;
            this.socket.close();
        }
    }

    send(message: string) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.warn('⚠️ WebSocket is not open. Message not sent.');
        }
    }
}

export default new WebSocketService();
