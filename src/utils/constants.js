export const User_AVATAR = "https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid";

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  }
};

export const IMAGE_CDN_URL = 'http://image.tmdb.org/t/p/w500/'