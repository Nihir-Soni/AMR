import { useState } from "react";

const MovieCard = ({ results, onBackToSearch }) => {
  const [expandedId, setExpandedId] = useState(null);
  const toggleExpand = (tmdbId) => {
    setExpandedId(expandedId === tmdbId ? null : tmdbId);
  };

  return (
    <div className="min-h-screen pt-8 pb-8">
      <div className="absolute inset-0 bg-black/60" />
      <div className="max-w-7xl mx-auto relative">
        {/* Header with Title and Back Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">FEATURED MOVIES</h1>
          <button
            onClick={onBackToSearch}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            ← Back to Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {results.map((movie) => {
            const isExpanded = expandedId === movie.id;

            return (
              <div
                key={movie.id}
                className={`${
                  isExpanded
                    ? "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
                    : "relative"
                }`}
                onClick={() => isExpanded && toggleExpand(movie.id)}
              >
                <div
                  onClick={(e) => {
                    if (!isExpanded) {
                      e.stopPropagation();
                      toggleExpand(movie.id);
                    }
                  }}
                  className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                    isExpanded
                      ? "max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                      : "hover:scale-105 h-full flex flex-col"
                  }`}
                >
                  <div className={`flex ${isExpanded ? "flex-row" : "flex-col"}`}>
                    {/* Poster Section */}
                    <div className={`${isExpanded ? "w-64 flex-shrink-0" : "w-full"}`}>
                      <img
                        src={
                          movie.imageUrl ||
                          "https://via.placeholder.com/300x450?text=No+Image"
                        }
                        alt={movie.title}
                        className={`w-full ${isExpanded ? "h-full" : "h-72"} object-cover`}
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h2 className="text-xl font-bold text-white flex-1">
                          {movie.title}
                        </h2>
                        <div className="flex items-center bg-yellow-500 text-gray-900 px-2 py-1 rounded text-sm font-bold ml-2">
                          ⭐ {movie.rating}
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm mb-3">{movie.year}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {movie.genres.map((genre, index) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="mt-4 space-y-4 animate-fade-in">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              Overview
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {movie.description}
                            </p>
                          </div>

                          <div className="pt-2">
                            <button className="text-gray-400 hover:text-white text-sm">
                              Click to collapse
                            </button>
                          </div>
                        </div>
                      )}

                      {!isExpanded && (
                        <p className="text-gray-500 text-xs mt-2">
                          Click to view details
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;