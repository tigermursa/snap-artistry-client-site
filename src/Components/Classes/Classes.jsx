import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

const Classes = () => {
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/classes")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleAddToCart = (data) => {
    console.log(data);
    if (user && user.email) {
      const cartItem = {
        menuItemId: data._id,
        classImage: data.classImage,
        className: data.className,
        instructorName: data.instructorName,
        classEnrolled: data.classEnrolled,
        availableSeats: data.availableSeats,
        price: data.price,
        email: user.email,
      };
      fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-start",
              icon: "success",
              title: "Class added to your list.",
              showConfirmButton: false,
              timer: 2500,
            });
          } else {
            Swal.fire({
              icon: "info",
              title: "Oops...",
              text: "This class is already in your selected list!",
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
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
                  instructor.availableSeats == 0 ?  "bg-red-600" : "bg-white"
                } rounded-lg p-4`}
              >
                <img
                  src={instructor.classImage}
                  alt={instructor.classImage}
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="mt-4 text-start ms-2 text-black">
                  <p className="text-2xl font-semibold mb-3">
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
              <button
                className={`mt-7 bg-purple-500 text-white px-4 py-2 rounded-lg ${
                  instructor.availableSeats === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={instructor.availableSeats === 0}
                onClick={() => handleAddToCart(instructor)}
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

export default Classes;
