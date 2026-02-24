import mongoose from "mongoose";
import dotenv from "dotenv";
import Movie from "../models/Movie.js";
import { generateEmbedding } from "../services/embeddingService.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB");

  const movies = await Movie.find({
  $or: [
    { embedding: { $exists: false } },
    { embedding: { $size: 0 } }
  ]
});


  console.log(`Found ${movies.length} movies without embeddings`);

  for (const movie of movies) {
    const text = `
        Title: ${movie.title}.
        Overview: ${movie.description}.
        Genres: ${movie.genre}.
        Keywords: ${movie.keywords.join(" ")}
        `;


    console.log(`Generating embedding for: ${movie.title}`);

    const embedding = await generateEmbedding(text);

    movie.embedding = embedding;
    await movie.save();
  }

  console.log("All embeddings generated.");
  process.exit();
};

run();
