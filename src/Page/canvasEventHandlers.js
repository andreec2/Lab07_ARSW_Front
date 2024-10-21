export const initializeCanvasEventHandlers = (canvasRef, onClick) => {
    const canvas = canvasRef.current;
  
    // Manejador de eventos para el clic
    const handlePointerDown = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left; // Obtener la posición X
      const y = event.clientY - rect.top;  // Obtener la posición Y
      onClick({ x, y }); // Llamar a la función onClick con las coordenadas
    };
  
    // Agregar el manejador de eventos al canvas
    canvas.addEventListener('pointerdown', handlePointerDown);
  
    // Limpiar los eventos al desmontar el componente
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
    };
  };
