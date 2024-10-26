import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const apiClient = {
  getBlueprintsByAuthor: async (author) => {
    try {
      const response = await axios.get(`${API_URL}/blueprints/${author}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blueprints:", error);
      throw error; 
    }
  },

    getBlueprintByAuthorAndName: async (author, bpname) => {
      try {
        const response = await axios.get(`${API_URL}/blueprints/${author}/${bpname}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching blueprint by author and name:", error);
        throw error; 
      }
    },


  updateBlueprint: async (author, blueprintName, blueprintData) => {
    try {
      const response = await axios.put(
        `${API_URL}/blueprints/${author}/${blueprintName}`,
        blueprintData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating blueprint:", error);
      throw error;
    }
  },

  createBlueprint: async (blueprintData) => {
    try {
      const response = await axios.post(
        `${API_URL}/blueprints`, 
        blueprintData,      
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating blueprint:", error);
      throw error;
    }
  },
  
};

export default apiClient;
