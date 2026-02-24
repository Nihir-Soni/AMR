import moviebg from '../assets/moviebg.png';
import Button from '../components/Button.jsx';
import SearchBar from '../components/SearchBar.jsx';
import searchMovies from '../services/api.js';
import MovieCard from '../components/MovieCard.jsx';
import { useState } from 'react';
import { useRef } from 'react';

const HomePage = () => {
    const [searchFeature, setSearchFeature] = useState(true);
    const [showMovies, setShowMovies] = useState(false);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef(null);

    const handleSearchClick = async () => {
        const query = searchRef.current.value;
        
        if (!query) return alert("Please enter a description!");
        
        setLoading(true);
        console.log("searching for:", query);
        
        try {
            const results = await searchMovies(query);

            const formattedResults = results.map(movie => ({
                id: movie._id,
                title: movie.title,
                description: movie.overview,
                genres: movie.genres || [],
                year: movie.releaseYear,
                rating: movie.rating,
                imageUrl: movie.posterPath
                    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                    : null,
                cast: movie.cast || []
            }));

            setMovies(formattedResults);
            setSearchFeature(false);
            setShowMovies(true);
        } catch (error) {
            console.error("Search failed:", error);
            alert("Failed to search movies. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const handleBackToSearch = () => {
        setSearchFeature(true);
        setShowMovies(false);
        setMovies([]);
        if (searchRef.current) {
            searchRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${moviebg})` }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

            {/* Search Feature Section */}
            {searchFeature && (
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
                    {/* Logo/Title with Gradient */}
                    <div className="mb-6 animate-fade-in">
                        <h1 className="font-bold text-8xl md:text-9xl font-sans tracking-wider drop-shadow-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                            AMR
                        </h1>
                        <div className="h-1 w-32 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    {/* Subtitle */}
                    <div className="max-w-2xl mb-12 animate-fade-in-delay">
                        <h2 className="text-white font-semibold text-2xl md:text-3xl text-center mb-4 drop-shadow-lg">
                            Your Advanced Movie Recommender
                        </h2>
                        <p className="text-gray-200 text-base md:text-lg text-center leading-relaxed px-6 py-4 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10">
                            Simply describe a scenario, a mood, or specific keywords, and our AI will find the perfect cinematic match for your preferences.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full max-w-3xl mb-8 animate-slide-up">
                        <SearchBar
                            inputRef={searchRef}
                            onKeyDown={(e) => e.key === 'Enter' && !loading && handleSearchClick()}
                        />
                    </div>

                    {/* Search Button */}
                    <div className="animate-slide-up-delay mb-16">
                        <Button
                            onClick={handleSearchClick}
                            disabled={loading}
                            className="transform transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Searching...
                                </span>
                            ) : (
                                'Search Movies'
                            )}
                        </Button>
                    </div>

                    {/* Feature Icons - Fixed positioning */}
                    <div className="flex justify-center gap-8 text-white/60 text-sm mt-auto">
                        <div className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300">
                            <span>🎬</span>
                            <span>AI-Powered</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300">
                            <span>⚡</span>
                            <span>Instant Results</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300">
                            <span>🎯</span>
                            <span>Personalized</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Movies Display Section */}
            {showMovies && <MovieCard results={movies} onBackToSearch={handleBackToSearch} />}

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }

                .animate-fade-in-delay {
                    animation: fade-in 1s ease-out 0.3s both;
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease-out 0.5s both;
                }

                .animate-slide-up-delay {
                    animation: slide-up 0.8s ease-out 0.7s both;
                }
            `}</style>
        </div>
    );
}

export default HomePage;