import dotenv from "dotenv";
import { generateEmbedding } from "../services/embeddingService.js";

dotenv.config();

const test = async () => {
  const embedding = await generateEmbedding(
    "A group of friends stranded on an island"
  );

  console.log("Embedding length:", embedding.length);
};

test();
