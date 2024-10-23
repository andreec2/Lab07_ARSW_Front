import { useState } from 'react';
import apiClient from './apiClient'; 

const useBlueprint = () => {
  const [blueprints, setBlueprints] = useState([]);
  const [author, setAuthor] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedBlueprint, setSelectedBlueprint] = useState(null);

  const handleInputChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    try {
      const data = await apiClient.getBlueprintsByAuthor(author); 
      setBlueprints(data);

      const total = data.reduce((sum, blueprint) => sum + blueprint.points.length, 0);
      setTotalPoints(total);
    } catch (error) {
      console.error("Error fetching blueprints:", error);
    }
  };

  const handleOpen = (blueprint) => {
    setSelectedBlueprint(blueprint);
    console.log(blueprint);
  };

  return {
    blueprints,
    author,
    submitted,
    totalPoints,
    selectedBlueprint,
    handleInputChange,
    handleSubmit,
    handleOpen,
  };
};

export default useBlueprint;
