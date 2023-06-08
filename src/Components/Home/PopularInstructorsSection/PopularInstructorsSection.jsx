import React, { useEffect, useState } from "react";

const PopularInstructorsSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // Sort the data array based on totalClassesTaken in descending order
  const sortedData = [...data].sort((a, b) => b.totalClassesTaken - a.totalClassesTaken);

  // Slice the sortedData array to show only the top 6 instructors
  const slicedData = sortedData.slice(0, 6);

  return (
    <div>
      <div className="container mx-auto px-4 mb-40">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {slicedData.map((instructor, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={instructor.instructorImage}
                alt={instructor.instructorName}
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="mt-4">
                <p className="text-lg font-semibold">{instructor.instructorName}</p>
                <p className="text-gray-500">Email: {instructor.email}</p>
                <p className="text-gray-500">Total Classes Taken: {instructor.totalClassesTaken}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularInstructorsSection;
