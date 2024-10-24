import React, { useState, useEffect } from 'react';
import BlueprintCanvas from './BlueprintsCanvas'; 


const BlueprintDetails = ({ selectedBlueprint }) => {

  const [points, setPoints] = useState(selectedBlueprint.points || []);

  useEffect(() => {
    // Cada vez que cambie el blueprint seleccionado, actualizamos los puntos
    setPoints(selectedBlueprint.points || []);
  }, [selectedBlueprint]);

  const addPoint = (newPoint) => {
    // Actualizamos el estado local con el nuevo punto
    const updatedPoints = [...points, newPoint];
    setPoints(updatedPoints);

    // Actualizamos los puntos en el blueprint seleccionado
    selectedBlueprint.points = updatedPoints;
  }

  return (
    <div>
      <h3>Detalles del Blueprint: {selectedBlueprint.name}</h3>

      <div className="canvas-container">
        <BlueprintCanvas className="canvas" points={selectedBlueprint.points} addPoint={addPoint} />
      </div>
    </div>
  );
};

export default BlueprintDetails;
