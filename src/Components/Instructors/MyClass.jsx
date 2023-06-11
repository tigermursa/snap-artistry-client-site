import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
const MyClass = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/classes/email/${user?.email}`
        );
        setClasses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClasses();
  }, [user?.email]);

  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/classes/${_id}`);
          setClasses((prevClasses) =>
            prevClasses.filter((classItem) => classItem._id !== _id)
          );
          Swal.fire({
            icon: "success",
            title: "Class Deleted",
            text: "The class has been successfully deleted.",
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Unable to delete the class.",
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {classes.map((classItem) => (
            <div key={classItem._id} className="shadow-md rounded-lg p-4">
              <div
                className={`${
                  classItem.availableSeats === 0 ? "bg-red-600" : "bg-white"
                } rounded-lg p-4`}
              >
                <img
                  src={classItem.classImage}
                  alt={classItem.classImage}
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="mt-4 text-start ms-2 text-black">
                  <p className="text-2xl font-semibold mb-3">
                    {classItem.className}
                  </p>
                  <p className="text-xl">
                    Instructor: {classItem.instructorName}
                  </p>
                  <p className="text-xl">Enrolled: {classItem.classEnrolled}</p>
                  <p className="text-xl">
                    Available Seats: {classItem.availableSeats}
                  </p>
                  <p className="font-bold mt-2 text-2xl">
                    Price: ${classItem.price}
                  </p>
                </div>
              </div>
              <button
                className={`mt-7 bg-purple-500 text-white px-4 py-2 rounded-lg ${
                  classItem.availableSeats === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={classItem.availableSeats === 0}
                onClick={() => handleDelete(classItem._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyClass;
