import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const fetchPopularMovies = async (page = 1) => {
  const response = await tmdb.get("/movie/popular", {
    params: { page },
  });

  return response.data.results;
};

export const searchMovieByTitle = async (title) => {
  const response = await tmdb.get("/search/movie", {
    params: { query: title }
  });

  return response.data.results[0]; // take best match
};

export const fetchTopRatedMovies = async (page = 1) => {
  const response = await tmdb.get("/movie/top_rated", {
    params: { page }
  });
  return response.data.results;
};

export const fetchTrendingMovies = async (page = 1) => {
  const response = await tmdb.get("/trending/movie/week", {
    params: { page }
  });
  return response.data.results;
};

export const fetchMovieKeywords = async (tmdbId) => {
  try {
    const response = await tmdb.get(`/movie/${tmdbId}/keywords`);
    return response.data.keywords.map(k => k.name);
  } catch (error) {
    console.log(`No keywords found for ID: ${tmdbId}`);
    return [];
  }
};


export const fetchGenres = async () => {
  const response = await tmdb.get("/genre/movie/list");
  return response.data.genres;
};
