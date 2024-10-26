import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative py-2 text-white">
      <h1 className="text-3xl py-4"> {title}</h1>

      <button
        className="absolute left-2 top-[52%] bg-gray-600 opacity-60 p-2 z-10"
        onClick={scrollLeft}
      >
        {"<"}
      </button>

      <div className="overflow-hidden relative">
        <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide scroll-smooth">
          {movies?.map((movie) => (
            <div key={movie.id} className="min-w-[200px]">
              <MovieCard posterPath={movie.poster_path} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute right-2 top-[52%] bg-gray-600 opacity-60 p-2 z-10"
        onClick={scrollRight}
      >
        {">"}
      </button>
    </div>
  );
};

export default MovieList;
