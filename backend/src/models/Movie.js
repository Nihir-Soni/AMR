import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    overview: {
      type: String,
      required: true,
    },

    genres: {
      type: [String],
      required: true,
    },

    releaseYear: {
      type: Number,
      required: true,
    },

    director: {
      type: String,
    },

    cast: {
      type: [String],
    },

    rating: {
      type: Number,
    },

    posterPath: {
      type: String,
    },

    tmdbId: {
      type: Number,
      required: true,
      unique: true,
    },

    embedding: {
      type: [Number],
      required: true,
    },
    keywords: {
  type: [String],
  default: []
},
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
