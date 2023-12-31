import React, { useEffect, useState } from "react";

const Instructors = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://y-tigermursa.vercel.app/classes")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // Filter out duplicate instructors based on instructorName
  const uniqueInstructors = [
    ...new Map(
      data.map((instructor) => [instructor.instructorName, instructor])
    ).values(),
  ];

  return (
    <div className="container mx-auto px-4 text-start mb-28">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {uniqueInstructors.map((instructor, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={instructor.instructorImage}
              alt={instructor.instructorName}
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="mt-4 ms-2">
              <p className="font-semibold text-3xl">
                {instructor.instructorName}
              </p>
              <p className="text-gray-500">Email: {instructor.email}</p>
              <p className="text-gray-500 font-bold">
                Total Classes Taken: {instructor.totalClassesTaken}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
