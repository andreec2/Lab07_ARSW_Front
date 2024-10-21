import React, { useRef, useEffect } from 'react';
import { initializeCanvasEventHandlers } from './canvasEventHandlers'; 

const BlueprintCanvas = ({ points, addPoint }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#1ABC9C'; 
    ctx.lineWidth = 2; 

    if (points.length > 0) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y); 
      points.forEach((point) => {
        ctx.lineTo(point.x, point.y); 
      });
      ctx.stroke(); 
    }

    const cleanup = initializeCanvasEventHandlers(canvasRef, addPoint);

    return () => {
      cleanup();
    };
  }, [points, addPoint]);

  return (
    <canvas 
      ref={canvasRef} 
      width={500} 
      height={500} 
      style={{ border: '1px solid #000' }} 
    />
  );
};

export default BlueprintCanvas;
