
import { fetchGenres } from "../services/tmdbService.js";

const genreList=await fetchGenres();
//creating a map of genre id and genre name for easy access
const genreMap={};

genreList.forEach(genre=>{
    genreMap[genre.id]=genre.name;
})

export {genreMap};