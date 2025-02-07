import React, { useEffect, useRef } from 'react';

const VideoFeed: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((err) => console.error('Error accessing camera:', err));
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay muted className="border rounded w-full h-64"></video>
        </div>
    );
};

export default VideoFeed;
