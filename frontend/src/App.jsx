import { useEffect } from "react";
import HomePage from "./pages/HomePage.jsx"
import searchMovies from './services/api.js';



const App=()=>{

  /*useEffect(()=>{
    const test=async()=>{
      const result=await searchMovies("best horror movies");
          console.log(result);
    }
    test();
  },[]);*/




  return (
    <div className="overflow-hidden">
        <HomePage/>
        
    </div>
  )
}

export default App;