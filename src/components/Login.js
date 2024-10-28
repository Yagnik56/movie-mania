import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BG_IMG, User_AVATAR } from "../utils/constants.js";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  const [errorMessage, setErrorMessage] = useState(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value, name?.current?.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: name.current.value, photoURL: User_AVATAR
          }).then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL:photoURL}));
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/email-already-in-use") {
            setErrorMessage("Email already registered. Log in!");
          } else {
            setErrorMessage(errorCode + " - " + errorMessage);
          }
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorCode === 'auth/invalid-credential'){
            setErrorMessage('Invalid credentials, please try again!');
          } else {
            setErrorMessage(errorCode + " - " + errorMessage);
          }
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute bg-black">
        <img
          className="h-screen w-screen object-cover opacity-80"
          src={BG_IMG}
          alt='background'
        />
      </div>
      <form onSubmit={(e)=> e.preventDefault()} className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 absolute my-40 mx-auto right-0 left-0 p-2 sm:p-6 lg:p-12 bg-black text-white bg-opacity-75 rounded-lg">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        { !isSignInForm &&
          (<input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-2 w-full bg-black bg-opacity-40 border-gray-500 border rounded"
          />)}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 my-2 w-full bg-black bg-opacity-40 border-gray-500 border rounded"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full bg-black bg-opacity-40 border-gray-500 border rounded"
        />

        <p className="text-red-600 font-bold text-sm">{errorMessage}</p>

        <button className="p-2 my-4 bg-red-600 w-full rounded" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-2 text-gray-400 text-sm" onClick={toggleSignInForm}>
          {isSignInForm ? "New Here? Sign Up now!" : " Already registered? Sign in now!"}
        </p>
      </form>
    </div>
  );
};

export default Login;
