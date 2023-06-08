import React, { useEffect, useState } from "react";

const Instructors = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {data.map((instructor, index) => (
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
  ); 
};

export default Instructors;
