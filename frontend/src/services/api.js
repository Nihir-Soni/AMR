import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api';

const searchMovies = async (query) => {
  try {
    const response = await axios.post(
      API_BASE_URL + "/search",
      { query }   
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetching movies", error);
  }
};

export default searchMovies;