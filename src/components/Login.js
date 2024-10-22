import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  const [errorMessage, setErrorMessage] = useState(null);

  const handleButtonClick = () => {
    console.log("Email: " + email.current.value);
    console.log("Password: " + password.current.value);
    const message = checkValidData(email.current.value, password.current.value, name?.current?.value);
    setErrorMessage(message);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="login_background.jpg"
          alt='background'
        />
      </div>
      <form onSubmit={(e)=> e.preventDefault()} className="w-1/4 absolute my-40 mx-auto right-0 left-0 p-12 bg-black text-white bg-opacity-75">
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
