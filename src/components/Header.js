import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

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
    <div className="absolute px-6 py-3 bg-gradient-to-b from-black w-full z-10 flex justify-between">
      <img
        className="w-36"
        src="site_logo.png"
        alt='logo'
      />
      {user && (<div className="flex">
        <img
          className="w-16 m-2"
          src={user.photoURL}
          alt='User Icon'
        />
        <button onClick={handleSignOut} className="font-bold text-white">(Sign Out)</button>
      </div>)}
    </div>
  );
};

export default Header;
