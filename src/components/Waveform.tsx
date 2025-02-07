import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface WaveformProps {
    active: boolean;  // Prop to control when to start/stop the waveform
}

const Waveform: React.FC<WaveformProps> = ({ active }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);
    const [data, setData] = useState<number[]>([]);

    useEffect(() => {
        if (canvasRef.current) {
            chartRef.current = new Chart(canvasRef.current, {
                type: 'line',
                data: {
                    labels: Array(50).fill(''),
                    datasets: [
                        {
                            label: 'Audio Signal',
                            data: data,
                            borderColor: '#007bff',
                            borderWidth: 2,
                            pointRadius: 0,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { display: false },
                        y: { display: false },
                    },
                },
            });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timer | undefined;

        if (active) {
            interval = setInterval(() => {
                setData((prev) => {
                    const updatedData = [...prev.slice(-49), Math.random() * 100];
                    if (chartRef.current) {
                        chartRef.current.data.datasets[0].data = updatedData;
                        chartRef.current.update();
                    }
                    return updatedData;
                });
            }, 100);
        } else {
            setData([]);  // Clear data when stopping
            if (chartRef.current) {
                chartRef.current.data.datasets[0].data = [];
                chartRef.current.update();
            }
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [active]);

    return <canvas ref={canvasRef} />;
};

export default Waveform;
