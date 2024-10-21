import React, { useState } from 'react';
import BlueprintCanvas from './BlueprintsCanvas'; 

const BlueprintDetails = ({ selectedBlueprint }) => {
  const [points, setPoints] = useState(selectedBlueprint.points || []);

  const addPoint = (newPoint) => {
    // Actualizamos el estado con el nuevo punto agregado al final
    setPoints([...points, newPoint]);
  };

  return (
    <div>
      <h3>Detalles del Blueprint: {selectedBlueprint.name}</h3>

      <div className="canvas-container">
        <BlueprintCanvas className="canvas" points={points} addPoint={addPoint} />
      </div>
    </div>
  );
};

export default BlueprintDetails;
