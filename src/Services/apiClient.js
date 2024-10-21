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
};

export default apiClient;
