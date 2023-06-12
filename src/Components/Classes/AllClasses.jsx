import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const AllClasses = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://y-tigermursa.vercel.app/classes") 
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  

  const [classes, setClasses] = useState([]);

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
          setData((prevData) =>
            prevData.filter((classItem) => classItem._id !== _id)
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

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`https://y-tigermursa.vercel.app/classes/${id}/status`, {
        status,
      });
      Swal.fire({
        icon: "success",
        title: "Class Status Updated",
        text: "The class status has been successfully updated.",
      });

      // Update the status of the class item in data state
      setData((prevData) =>
        prevData.map((classItem) =>
          classItem._id === id ? { ...classItem, status } : classItem
        )
      );
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Unable to update the class status.",
      });
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.map((instructor, index) => (
            <div key={index} className="shadow-md rounded-lg p-4">
              <div
                className={`${
                  instructor.availableSeats == 0 ? "bg-red-600" : "bg-white"
                } rounded-lg p-4 h-96`}
              >
                <img
                  src={instructor.classImage}
                  alt={instructor.classImage}
                  className="w-full h-28 object-cover rounded-lg"
                />
                <div className="mt-4 text-start ms-2 text-black">
                  <p className="text-lg font-semibold mb-3">
                    {instructor.className}
                  </p>
                  <p className="text-xl">
                    Instructor: {instructor.instructorName}
                  </p>
                  <p className="text-xl">
                    Enrolled: {instructor.classEnrolled}
                  </p>
                  <p className="text-xl">
                    Available Seats: {instructor.availableSeats}
                  </p>
                  <p className="font-bold mt-2 text-2xl">
                    Price: ${instructor.price}
                  </p>
                </div>
              </div>

              <div className="flex justify-center mt-5">
                {instructor.status === "pending" && (
                  <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                )}
                {instructor.status === "approved" && (
                  <div className="w-6 h-6 rounded-full bg-green-500"></div>
                )}
                {instructor.status === "denied" && (
                  <div className="w-6 h-6 rounded-full bg-red-500"></div>
                )}
              </div>
              <div className="mt-7 ">
                <select
                  className="bg-purple-500 text-white px-2 py-2 rounded-lg"
                  value={instructor.status}
                  onChange={(e) =>
                    handleStatusUpdate(instructor._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="denied">Denied</option>
                </select>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="text-red-500 mr-2"
                  onClick={() => handleDelete(instructor._id)}
                >
                  <FaTrash />
                </button>
                <Link
                  to={`/dashboards/myclasses/update/${instructor._id}`}
                  className="text-blue-500"
                >
                  <FaEdit />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
