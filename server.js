import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 8080 });

const emotions = ['Happy', 'Sad', 'Angry', 'Surprised', 'Neutral'];

server.on('connection', (socket) => {
    console.log('Client connected');

    // Send random emotions every 3 seconds to the client
    const interval = setInterval(() => {
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        socket.send(randomEmotion);
    }, 3000);

    socket.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});
