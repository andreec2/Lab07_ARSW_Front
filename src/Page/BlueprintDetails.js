import React, { useEffect, useState } from 'react';
import BlueprintCanvas from './BlueprintsCanvas';
import apiClient from '../Services/apiClient';

const BlueprintDetails = ({ selectedBlueprint, setSelectedBlueprint }) => {
  const [points, setPoints] = useState(selectedBlueprint.points || []);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    setPoints(selectedBlueprint.points || []);
  }, [selectedBlueprint]);

  const addPoint = (newPoint) => {
    const updatedPoints = [...points, newPoint];
    setPoints(updatedPoints);
    selectedBlueprint.points = updatedPoints;
  };

  const updateBlueprint = async () => {
    const blueprintData = {
      ...selectedBlueprint,
      points,
      version: selectedBlueprint.version,
    };

    try {
      await apiClient.updateBlueprint(selectedBlueprint.author, selectedBlueprint.name, blueprintData);
      console.log('Blueprint actualizado correctamente');
      handleSubmit();
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("El blueprint ha sido actualizado por otro usuario. Recarga la página para ver los cambios.");
      } else {
        console.error('Error al actualizar el blueprint:', err);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const data = await apiClient.getBlueprintByAuthorAndName(selectedBlueprint.author, selectedBlueprint.name);
      const total = data.reduce((sum, blueprint) => sum + blueprint.points.length, 0);
      setTotalPoints(total);
    } catch (error) {
      console.error("Error fetching blueprints:", error);
    }
  };

  const createBlueprint = async () => {
    const blueprintData = {
      ...selectedBlueprint,
      points, 
      version: selectedBlueprint.version || 1, 
    };

    try {
      await apiClient.createBlueprint(blueprintData);
      console.log('Blueprint creado correctamente');
      handleSubmit();
    } catch (err) {
      console.error('Error al crear el blueprint:', err);
    }
  };

  const deleteBlueprint = async () => {
    try {
      await apiClient.deleteBlueprint(selectedBlueprint.author, selectedBlueprint.name);
      console.log('Blueprint eliminado correctamente');
      
      setSelectedBlueprint(null); // Limpia selectedBlueprint para borrar el canvas
      handleSubmit();
    } catch (err) {
      console.error('Error al eliminar el blueprint:', err);
    }
  };

  return (
    <div>
      <h3>Detalles del Blueprint: {selectedBlueprint.name}</h3>

      <div className="canvas-container">
        {selectedBlueprint && ( // Renderiza solo si selectedBlueprint existe
          <BlueprintCanvas className="canvas" points={points} addPoint={addPoint} />
        )}
      </div>

      {/* Botón para guardar*/}
      <button onClick={createBlueprint}>Save</button>

      {/* Botón para guardar*/}
      <button onClick={updateBlueprint}>Update</button>

      {/* Botón para eliminar el blueprint */}
      <button onClick={deleteBlueprint}>Delete</button>

    </div>
  );
};

export default BlueprintDetails;
