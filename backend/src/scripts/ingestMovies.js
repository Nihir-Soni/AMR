import connectDB from "../../config/db.js";
import Movie from "../models/Movie.js";
import dotenv from "dotenv";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  searchMovieByTitle,
  fetchMovieKeywords
} from "../services/tmdbService.js";
import { transformTMDBMovie } from "../utils/transformMovie.js";
import { genreMap } from "../utils/genreMap.js";
import { myMovies } from "../data/MyMovies.js";

dotenv.config();

const ingestList = async (movies, sourceLabel) => {
  for (const movie of movies) {
    try {
      if (!movie || !movie.overview) continue;

      const transformed = transformTMDBMovie(movie, genreMap);

      // fetch keywords
      const keywords = await fetchMovieKeywords(transformed.tmdbId);

      const exists = await Movie.findOne({ tmdbId: transformed.tmdbId });
      if (exists) {
        console.log(`Skipping duplicate: ${transformed.title}`);
        continue;
      }

      transformed.source = sourceLabel;
      transformed.keywords = keywords;

      await Movie.create(transformed);

      console.log(`Inserted: ${transformed.title}`);
    } catch (err) {
      console.log(`Error inserting movie: ${movie?.title || "Unknown"}`);
    }
  }
};

const ingestCustomTitles = async () => {
  const uniqueTitles = [...new Set(myMovies)];

  for (const title of uniqueTitles) {
    try {
      console.log(`Searching: ${title}`);

      const movie = await searchMovieByTitle(title);

      if (!movie) {
        console.log(`Not found: ${title}`);
        continue;
      }

      if (!movie.overview) {
        console.log(`No overview: ${title}`);
        continue;
      }

      const transformed = transformTMDBMovie(movie, genreMap);

      const exists = await Movie.findOne({ tmdbId: transformed.tmdbId });
      if (exists) {
        console.log(`Duplicate custom: ${title}`);
        continue;
      }

      const keywords = await fetchMovieKeywords(transformed.tmdbId);

      transformed.source = "custom";
      transformed.keywords = keywords;

      await Movie.create(transformed);

      console.log(`Inserted custom: ${title}`);
    } catch (err) {
      console.log(`Error processing custom: ${title}`);
    }
  }
};

const ingestMovies = async () => {
  await connectDB();

  console.log("Ingesting Popular Movies...");
  for (let page = 1; page <= 3; page++) {
    const movies = await fetchPopularMovies(page);
    await ingestList(movies, "popular");
  }

  console.log("Ingesting Top Rated Movies...");
  for (let page = 1; page <= 3; page++) {
    const movies = await fetchTopRatedMovies(page);
    await ingestList(movies, "top-rated");
  }

  console.log("Ingesting Trending Movies...");
  for (let page = 1; page <= 2; page++) {
    const movies = await fetchTrendingMovies(page);
    await ingestList(movies, "trending");
  }

  console.log("Ingesting Custom Movies...");
  await ingestCustomTitles();

  console.log("All ingestion complete.");
  process.exit(0);
};

ingestMovies();
