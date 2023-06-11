import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/classes", data)
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Class Added",
          text: "The class has been successfully added.",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const defaultEmailValue = user ? user.email : "";

  return (
    <div className="container mx-auto p-2">
      <h2 className="text-2xl font-bold mb-4">Add Class</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-4">
          <div className="w-1/2 px-4 mb-4">
            <label className="block mb-2 text-lg font-bold">Class Name:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("className", { required: "Class name is required" })}
            />
            {errors.className && (
              <span className="text-red-500">{errors.className.message}</span>
            )}
          </div>
          <div className="w-1/2 px-4 mb-4">
            <label className="block mb-2 text-lg font-bold">Class Image:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("classImage")}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-1/2 px-4 mb-4">
            <label className="block mb-2 text-lg font-bold">
              Class Enrolled:
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("classEnrolled")}
            />
          </div>
          <div className="w-1/2 px-4 mb-4">
            <label className="block mb-2 text-lg font-bold">
              Instructor Name:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("instructorName")}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-1/2 px-4 mb-4">
            <label className="block mb-2 text-lg font-bold">
              Total Classes Taken:
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("totalClassesTaken")}
            />
          </div>
          <div className="w-1/2 px-4 mb-4">
            <label className="block mb-2 text-lg font-bold">Price:</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("price")}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-bold">
            Instructor Image:
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            {...register("instructorImage")}
          />
        </div>

        <div className="flex flex-wrap -mx-4 items-center">
          <div className="w-1/2 px-4 mb-4">
            <label className="block mb-2 text-lg font-bold">
              Available Seats:
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("availableSeats")}
            />
          </div>
          <div className="w-1/2 px-4 mb-4">
            <label className="block mb-2 text-lg font-bold">
              Instructor Email:
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("email")}
              defaultValue={defaultEmailValue}
              readOnly
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-8 mb-8"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
