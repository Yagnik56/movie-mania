import React, { useRef } from "react";
import openAi from "../utils/openAi";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleSearch = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openAi.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
    });

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",").map(item => item.trim());

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
  <div className="pt-[35%] md:pt-[12%] xl:pt-[7%] flex justify-center">
    <form
        onSubmit={(e)=> e.preventDefault()}
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg"
    >
        <input
            ref={searchText}
            type="text"
            className="p-4 m-4 col-span-9 rounded-md"
            placeholder="What would you like to watch today?"
        />
        <button
            className="m-4 py-2 px-4 col-span-3 bg-red-700 text-white rounded-lg"
            onClick={handleSearch}
        >
            Search
        </button>
    </form>
  </div>);
};

export default GptSearchBar;
