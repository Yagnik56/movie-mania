import React from "react";

const Header = () => {
  return (
    <div className="absolute px-6 py-3 bg-gradient-to-b from-black w-full z-10">
      <img
        className="w-40"
        src="site_logo.png"
        alt='logo'
      />
    </div>
  );
};

export default Header;
