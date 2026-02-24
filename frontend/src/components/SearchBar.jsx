const SearchBar = ({inputRef,onKeyDown}) => {
    return (
        <div className="w-full  p-4">
            <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                    
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                
                <input 
                    type="text" 
                    placeholder="Describe a movie scenario, mood, or keywords..." 
                    className="w-full pl-14 pr-6 py-5 text-base bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:bg-white focus:border-gray-400 focus:shadow-xl transition-all duration-200 placeholder:text-gray-500"
                    ref={inputRef}
                    onKeyDown={onKeyDown}
                />
            </div>
        </div>
    );
}

export default SearchBar;