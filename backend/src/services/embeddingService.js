import { pipeline } from "@xenova/transformers";

let extractor = null;

export const generateEmbedding = async (text) => {
  try {
    if (!extractor) {
      console.log("Loading embedding model (first time only)...");
      extractor = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2"
      );
      console.log("Model loaded successfully.");
    }

    const result = await extractor(text, {
      pooling: "mean",
      normalize: true,
    });

    return Array.from(result.data);
  } catch (error) {
    console.error("Embedding generation failed:", error);
    throw error;
  }
};
