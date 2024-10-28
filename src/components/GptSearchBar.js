import React, { useRef, useState } from "react";
import OpenAI from 'openai';
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const apiKey = useRef(null);
  const [blink, setBlink] = useState(false);
  const [error, setError] = useState(null);

  const blinkInputField = (n) => {
    let blinkCount = 0;
    const blinkInterval = setInterval(() => {
      setBlink((prevBlink) => !prevBlink);
      blinkCount++;
      if (blinkCount >= n) {
        clearInterval(blinkInterval);
      }
    }, 250);
  }

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
    dispatch(
      addGptMovieResult({ movieNames: null, movieResults: null })
    );
    setError(null);

    if (searchText.current.value && apiKey.current.value) {
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        searchText.current.value +
        ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      const openAi = new OpenAI({
        apiKey: apiKey.current.value, // This is the default and can be omitted
        dangerouslyAllowBrowser: true
      });

      try {
        const gptResults = await openAi.chat.completions.create({
          messages: [{ role: 'user', content: gptQuery }],
          model: 'gpt-3.5-turbo',
        });

        const gptMovies = gptResults.choices?.[0]?.message?.content
          .split(",")
          .map((item) => item.trim());

        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        const tmdbResults = await Promise.all(promiseArray);

        dispatch(
          addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
        );
      } catch (error) {
        setError(error.error.message);
        blinkInputField(6);
      }
    }
  };

  return (
    <div>
      <div className="pt-[35%] md:pt-[12%] xl:pt-[7%] flex justify-center">
        <form
            onSubmit={(e)=> e.preventDefault()}
            className="w-full md:w-2/3 bg-black grid grid-cols-12 rounded-lg"
        >
            <input
                ref={searchText}
                type="text"
                className="p-2 lg:p-4 mx-4 mt-4 lg:m-4 col-span-12 lg:col-span-6 rounded-md"
                placeholder="What would you like to watch today?"
            />
            <input
                ref={apiKey}
                type="text"
                className={`p-2 lg:p-4 mx-4 mt-4 lg:m-4 col-span-12 lg:col-span-4 rounded-md ${blink ? "border-2 bg-red-600" : ''}`}
                placeholder="OpenAI Api Key..."
            />
            <button
                className="py-2 px-4 m-4  col-span-4 lg:col-span-2 bg-red-700 text-white rounded-lg"
                onClick={handleSearch}
            >
                Search
            </button>
        </form>
      </div>
      { error && <p className="text-red-600 text-xl bg-black my-3 py-2 mx-auto text-center">Incorrect API key provided.</p>}
    </div>
  );
};

export default GptSearchBar;
