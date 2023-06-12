import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyClass = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `https://y-tigermursa.vercel.app/classes/email/${user?.email}`
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
          await axios.delete(`https://y-tigermursa.vercel.app/classes/${_id}`);
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="bg-white rounded-md shadow-md overflow-hidden"
          >
            <img
              src={classItem.classImage}
              alt={classItem.classImage}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-black text-start">
              <p className="text-xl font-bold mb-2">{classItem.className}</p>
              <p className="text-lg">Instructor: {classItem.instructorName}</p>
              <p className="text-lg">Enrolled: {classItem.classEnrolled}</p>
              <p className="text-lg">
                Available Seats: {classItem.availableSeats}
              </p>
              <p className="font-bold mt-2 text-2xl">
                Price: ${classItem.price}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  className="text-red-500 mr-2"
                  onClick={() => handleDelete(classItem._id)}
                >
                  <FaTrash />
                </button>
                <Link
                  to={`/dashboards/myclasses/update/${classItem._id}`}
                  className="text-blue-500"
                >
                  <FaEdit />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
