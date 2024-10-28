import React from "react";
import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

const VideoTitle = ({title, overview}) => {
    return (
        <div className="w-full aspect-video pt-[40%] sm:pt-[36%] md:pt-[25%] lg:pt-[20%] xl:pt-[17%] px-6 lg:px-20 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-base sm:text-lg lg:text-4xl font-bold">{title}</h1>
            <p className="hidden md:inline-block text-lg md:py-2 lg:py-6 md:w-5/12 lg:w-1/3">{overview}</p>
            <div className="flex my-2">
                <button className="bg-white text-black py-1 lg:py-2 px-2 flex items-center justify-center space-x-2 rounded-md w-20 lg:w-32 hover:bg-opacity-80"><FaPlay /> <p>Play</p></button>
                <button className="hidden md:flex bg-gray-600 text-white p-2 bg-opacity-70 flex items-center justify-center space-x-2 rounded-md w-40 hover:bg-opacity-85 mx-4">
                    <BsInfoCircle className="text-lg mx-1"/>
                    <p>More Info</p>
                </button>
            </div>
        </div>
    )
};

export default VideoTitle;
