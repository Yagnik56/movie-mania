import React, { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const movieData = movies?.filter((movie) => movie.poster_path)
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (!movieData?.length) return;

  return (
    <div className="relative py-2 text-white">
      <h1 className="text-lg md:text-xl lg:text-3xl py-2 md:py-4"> {title}</h1>

      { movieData?.length > 7 && (
        <button
          className="absolute left-2 top-[52%] bg-gray-500 opacity-70 p-2 z-10"
          onClick={scrollLeft}
        >
          {"<"}
        </button>
      )}

      <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide scroll-smooth">
        <div className="flex">
          {movieData?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>

      { movieData?.length > 7 && (
        <button
          className="absolute right-2 top-[52%] bg-gray-500 opacity-70 p-2 z-10"
          onClick={scrollRight}
        >
          {">"}
        </button>
      )}
    </div>
  );
};

export default MovieList;
