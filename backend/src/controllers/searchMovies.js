import { generateEmbedding } from "../services/embeddingService.js";
import Movie from "../models/Movie.js";
import { cosineSimilarity } from "../services/similarityService.js";

export const searchMovies = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    //  Generate embedding for user query
    const queryEmbedding = await generateEmbedding(query);

    //  Fetch all movies with embeddings
    const movies = await Movie.find({ embedding: { $exists: true } });

    //  Score each movie
  const scoredMovies = movies.map(movie => ({
 _id: movie._id,
  title: movie.title,
  overview: movie.overview,
  genres: movie.genres,
  releaseYear: movie.releaseYear,
  rating: movie.rating,
  posterPath: movie.posterPath,
  cast: movie.cast,
  score: cosineSimilarity(queryEmbedding, movie.embedding)
}));
 


   const filteredMovies = scoredMovies
  .filter(movie => movie.score > 0.3)
  .sort((a, b) => b.score - a.score)                  
  .slice(0, 10);                          

  res.json(filteredMovies);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Search failed" });
  }
};
