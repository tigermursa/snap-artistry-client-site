import React, { useEffect, useState } from "react";

const TopSixClass = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // Sort the data array based on classEnrolled in descending order
  const sortedData = [...data].sort((a, b) => b.classEnrolled - a.classEnrolled);

  // Slice the sortedData array to show only the top 6 entries
  const slicedData = sortedData.slice(0, 6);

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {slicedData.map((instructor, index) => (
            <div
              key={index}
              className={`bg-white shadow-md rounded-lg p-4 ${
                instructor.availableSeats === 0 ? "bg-red-900 text-white" : ""
              }`}
            >
              <img
                src={instructor.classImage}
                alt={instructor.classImage}
                className="w-full h-80 object-cover rounded-lg"
              />
              <div
                className={`mt-4 ${
                  instructor.availableSeats === 0 ? "text-white" : "text-black"
                }`}
              >
                <p className="text-lg font-semibold">{instructor.className}</p>
                <p className="text-gray-500">
                  Instructor: {instructor.instructorName}
                </p>
                <p className="text-gray-500">
                  Available Seats: {instructor.availableSeats}
                </p>
                <p className="text-gray-500">Price: {instructor.price}</p>
              </div>
              <button
                className={`mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg ${
                  instructor.availableSeats === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={instructor.availableSeats === 0}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSixClass;