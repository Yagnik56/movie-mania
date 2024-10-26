import React from "react";
import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

const VideoTitle = ({title, overview}) => {
    return (
        <div className="w-full aspect-video pt-[17%] px-24 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-lg py-6 w-1/4">{overview}</p>
            <div className="flex">
                <button className="bg-white text-black p-2 flex items-center justify-center space-x-2 rounded-md w-32 hover:bg-opacity-80"><FaPlay /> <p>Play</p></button>
                <button className="bg-gray-600 text-white p-2 bg-opacity-70 flex items-center justify-center space-x-2 rounded-md w-40 hover:bg-opacity-85 mx-4">
                    <BsInfoCircle className="text-lg mx-1"/>
                    <p>More Info</p>
                </button>
            </div>
        </div>
    )
};

export default VideoTitle;
