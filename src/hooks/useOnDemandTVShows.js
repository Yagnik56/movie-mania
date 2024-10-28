import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addOnDemandTVShows } from "../utils/moviesSlice";
import { useEffect } from "react";

const useOnDemandTVShows = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const onDemandShows = useSelector(
    (store) => store.movies.onDemandShows
  );

  const getOnDemandTVShows = async () => {
    const data = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', API_OPTIONS)
    const json = await data.json();
    dispatch(addOnDemandTVShows(json.results))
  }

  useEffect(() => {
    !onDemandShows && getOnDemandTVShows();
  },[]);
};

export default useOnDemandTVShows;