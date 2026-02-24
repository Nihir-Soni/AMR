
export const transformTMDBMovie = (movie, genreMap) => {
  return {
    tmdbId: movie.id,
    title: movie.title,
    overview: movie.overview,
    genres: movie.genre_ids.map(id => genreMap[id]).filter(Boolean),
    releaseYear: movie.release_date?.split("-")[0],
    rating: movie.vote_average,
    posterPath: movie.poster_path,
  };
};
