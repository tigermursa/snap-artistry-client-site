import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSixClass = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://y-tigermursa.vercel.app/classes")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // Sort the data array based on classEnrolled in descending order
  const sortedData = [...data].sort(
    (a, b) => b.classEnrolled - a.classEnrolled
  );

  // Slice the sortedData array to show only the top 6 entries
  const slicedData = sortedData.slice(0, 6);

  return (
    <div>
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {slicedData.map((instructor, index) => (
            <div
              key={index}
              className={`shadow-md rounded-lg p-4 ${
                instructor.availableSeats === 0 ? "bg-red-600" : "bg-white"
              }`}
            >
              <img
                src={instructor.classImage}
                alt={instructor.classImage}
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="mt-4 text-start ms-2">
                <p className="text-2xl font-semibold mb-3">
                  {instructor.className}
                </p>
                <p>Instructor: {instructor.instructorName}</p>
                <p>Students: {instructor.classEnrolled}</p>
                <p>Available Seats: {instructor.availableSeats}</p>
                <p className="font-bold mt-2 text-2xl">
                  Price: ${instructor.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link to="/classes">
        <button className="mt-7 bg-purple-500 text-white px-4 py-2 rounded-lg ">
          All Classes
        </button>
      </Link>
    </div>
  );
};

export default TopSixClass;
