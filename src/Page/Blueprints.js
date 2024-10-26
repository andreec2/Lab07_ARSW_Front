import React from 'react';
import useBlueprint from '../Services/useBlueprints';
import '../Styles/Blueprints.css';
import BlueprintDetails from './BlueprintDetails';
import BlueprintForm from './BlueprintForm';
import BlueprintTable from './BlueprintTable';

const Blueprints = () => {
  const { blueprints, author, submitted, totalPoints, selectedBlueprint, 
    handleInputChange, handleSubmit, handleOpen, setSelectedBlueprint, } = useBlueprint();

    const handleCreateNewBlueprint = async () => {
      const newName = prompt("Ingrese el nombre del nuevo blueprint:");
  
      if (newName) {
        // Limpia el canvas y selecciona el nuevo blueprint
        setSelectedBlueprint({
          name: newName,
          points: [], 
          version: 1, 
          author: selectedBlueprint.author,
        });
        console.log("Nuevo blueprint creado:", newName);
      }
  };

  return (
    <div className="blueprints-container">
      <div className="blueprints-left">
        <h1>Blueprints</h1>
        <BlueprintForm author={author} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />

        {submitted && blueprints.length > 0 && (
          <div>
            <h2>Blueprints de {author}</h2>
            <BlueprintTable blueprints={blueprints} handleOpen={handleOpen} />

            <div>
              <h3>Total de puntos: {totalPoints}</h3>
            </div>
          </div>
        )}

        {submitted && blueprints.length === 0 && (
          <div>No se encontraron blueprints para el autor: {author}</div>
        )}
      </div>

      <div className="blueprints-right">
        <div className="blueprint-buttons">
          <button onClick={handleCreateNewBlueprint}>Create new blueprint</button>
        </div>
        {selectedBlueprint && (
          <>
            <BlueprintDetails selectedBlueprint={selectedBlueprint} />
            <div className="blueprint-buttons">
              <button onClick>Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blueprints;
