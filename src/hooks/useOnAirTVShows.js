import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addOnAirTVShows } from "../utils/moviesSlice";
import { useEffect } from "react";

const useOnAirTVShows = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const onAirShows = useSelector(
    (store) => store.movies.onAirShows
  );

  const getOnAirTVShows = async () => {
    const data = await fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', API_OPTIONS)
    const json = await data.json();
    dispatch(addOnAirTVShows(json.results))
  }

  useEffect(() => {
    !onAirShows && getOnAirTVShows();
  },[]);
};

export default useOnAirTVShows;