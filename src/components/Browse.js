import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useOnAirTVShows from "../hooks/useOnAirTVShows";
import useOnDemandTVShows from "../hooks/useOnDemandTVShows";
import GptSearchPage from "./GptSearchPage";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useOnAirTVShows();
  useOnDemandTVShows();

  return (
    <div className="overflow-x-hidden">
      <Header />
      {
        showGptSearch ? (
          <GptSearchPage/>
        ) : (
          <div>
            <MainContainer/>
            <SecondaryContainer/>
          </div>
        )
      }
    </div>
  );
};

export default Browse;
