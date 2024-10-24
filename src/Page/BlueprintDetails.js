import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import BlueprintCanvas from './BlueprintsCanvas';

const BlueprintDetails = ({ selectedBlueprint, refreshBlueprints }) => {
  const [points, setPoints] = useState(selectedBlueprint.points || []);

  useEffect(() => {
    // Actualizamos los puntos cuando cambie el blueprint seleccionado
    setPoints(selectedBlueprint.points || []);
  }, [selectedBlueprint]);

  const addPoint = (newPoint) => {
    // Actualizamos el estado local con el nuevo punto
    const updatedPoints = [...points, newPoint];
    setPoints(updatedPoints);

    // Actualizamos los puntos en el blueprint seleccionado
    selectedBlueprint.points = updatedPoints;
  };

  const saveBlueprint = () => {
    const blueprintData = {
      ...selectedBlueprint,
      version: selectedBlueprint.version
    };
  
    $.ajax({
      url: `/api/blueprints/${selectedBlueprint.author}/${selectedBlueprint.name}`,
      type: 'PUT',
      data: JSON.stringify(blueprintData),
      contentType: 'application/json',
      success: () => {
        console.log('Blueprint actualizado correctamente');
      },
      error: (err) => {
        if (err.status === 409) {
          alert("El blueprint ha sido actualizado por otro usuario. Recarga la página para ver los cambios.");
        } else {
          console.error('Error al actualizar el blueprint:', err);
        }
      }
    });
  };

  return (
    <div>
      <h3>Detalles del Blueprint: {selectedBlueprint.name}</h3>

      <div className="canvas-container">
        <BlueprintCanvas className="canvas" points={points} addPoint={addPoint} />
      </div>

      {/* Botón para guardar los cambios */}
      <button onClick={saveBlueprint}>Save/Update</button>
    </div>
  );
};

export default BlueprintDetails;
