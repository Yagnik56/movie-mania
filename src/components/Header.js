import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)
  const user = useSelector(store => store.user);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL:photoURL}));
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {}).catch((error) => {
      navigate("/error");
    });
  };

  return (
    <div className="absolute px-6 py-4 bg-gradient-to-b from-black w-full z-10 flex flex-col md:flex-row justify-between">
      <img
        className="w-28 mx-auto md:mx-0"
        src="site_logo.png"
        alt='logo'
      />
      {user && (<div className="flex mx-auto md:mx-0">
        <button
          className="px-4 mx-4 my-4 bg-red-800 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {showGptSearch? "HomePage" : "GPT Search"}
        </button>
        <img
          className="w-14 m-2 rounded-full"
          src={user.photoURL}
          alt='User Icon'
        />
        <button onClick={handleSignOut} className="font-bold text-white">(Sign Out)</button>
      </div>)}
    </div>
  );
};

export default Header;
