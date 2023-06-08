import React from "react";


const FourOhFour = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <img
        src="https://bashooka.com/wp-content/uploads/2015/03/404-illustrations-bshk-11.jpg"
        alt="Error 404"
        className="w-1/2 mb-8"
      />
      <h1 className="text-5xl font-bold text-purple-500 mb-4 p-1">
        Oops! Page not found.
      </h1>
      <p className="text-lg text-purple-300 font-bold p-1">
        The page you are looking for might have been removed or temporarily
        unavailable.
      </p>
    </div>
  );
};

export default FourOhFour;
