import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(user);
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

  const email = user ? user.email : "";
  const name = user ? user.displayName : "";
  const image = user ? user.photoURL : "";

  return (
    <div className="ms-10 mx-auto w-full">
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
            <label className="block mb-2 text-lg font-bold">Class Image( put url)  :</label>
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
              defaultValue={name}
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
            defaultValue={image}
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
              defaultValue={email}
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









//  i added img bbf but server was going down so i just using url for now 

// import React, { useContext } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../Provider/AuthProvider";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

// const AddClass = () => {
//   const [axiosSecure] = useAxiosSecure();
//   const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
//   const { user } = useContext(AuthContext);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();
//   console.log(user);

//   const onSubmit = (data) => {
//     const formData = new FormData();
//     formData.append("image", data.Image[0]);

//     axios
//       .post(img_hosting_url, formData)
//       .then((res) => res.data)
//       .then((imagResponse) => {
//         if (imagResponse.success) {
//           const imgURL = imagResponse.data.display_url;
//           const {
//             pending,
//             className,
//             classEnrolled,
//             instructorName,
//             instructorImage,
//             price,
//             totalClassesTaken,
//             availableSeats,
//             email,
//           } = data;
//           const newClass = {
//             pending,
//             className,
//             classEnrolled,
//             instructorName,
//             instructorImage,
//             price: parseFloat(price),
//             totalClassesTaken,
//             availableSeats,
//             email,
//             classImage: imgURL,
//           };
//           console.log(newClass);
//           axiosSecure
//             .post("http://localhost:3000/classes", newClass)
//             .then((response) => {
//               console.log(response.data);
//               reset();
//               Swal.fire({
//                 icon: "success",
//                 title: "Class Added",
//                 text: "The class has been successfully added.",
//               });
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const email = user ? user.email : "";
//   const name = user ? user.displayName : "";
//   const image = user ? user.photoURL : "";

//   return (
//     <div className="ms-10 mx-auto w-full">
//       <h2 className="text-2xl font-bold mb-4">Add Class</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="flex flex-wrap -mx-4">
//           <div className="w-1/2 px-4 mb-4">
//             <label className="block mb-2 text-lg font-bold">Class Name:</label>
//             <input
//               type="text"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               {...register("className", { required: "Class name is required" })}
//             />
//             {errors.className && (
//               <span className="text-red-500">{errors.className.message}</span>
//             )}
//           </div>
//           <div className="w-1/2 px-4 mb-4">
//             <label className="block mb-2 text-lg font-bold">Class Image:</label>
//             <input
//               type="file"
//               className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//               {...register("Image", { required: "Class image is required" })}
//             />
//             {errors.Image && (
//               <span className="text-red-500">{errors.Image.message}</span>
//             )}
//           </div>
//         </div>
//         <div className="flex flex-wrap -mx-4">
//           <div className="w-1/2 px-4 mb-4">
//             <label className="block mb-2 text-lg font-bold">
//               Class Enrolled:
//             </label>
//             <input
//               type="number"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               {...register("classEnrolled")}
//             />
//           </div>
//           <div className="w-1/2 px-4 mb-4">
//             <label className="block mb-2 text-lg font-bold">
//               Instructor Name:
//             </label>
//             <input
//               type="text"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               {...register("instructorName")}
//               defaultValue={name}
//               readOnly
//             />
//           </div>
//         </div>

//         <div className="flex flex-wrap -mx-4">
//           <div className="w-1/2 px-4 mb-4">
//             <label className="block mb-2 text-lg font-bold">
//               Total Classes Taken:
//             </label>
//             <input
//               type="number"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               {...register("totalClassesTaken")}
//             />
//           </div>
//           <div className="w-1/2 px-4 mb-4">
//             <label className="block mb-2 text-lg font-bold">Price:</label>
//             <input
//               type="number"
//               step="0.01"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               {...register("price")}
//             />
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2 text-lg font-bold">
//             Instructor Image:
//           </label>
//           <input
//             type="text"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             {...register("instructorImage")}
//             defaultValue={image}
//           />
//         </div>

//         <div className="flex flex-wrap -mx-4 items-center">
//           <div className="w-1/2 px-4 mb-4">
//             <label className="block mb-2 text-lg font-bold">
//               Available Seats:
//             </label>
//             <input
//               type="number"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               {...register("availableSeats")}
//             />
//           </div>
//           <div className="w-1/2 px-4 mb-4">
//             <label className="block mb-2 text-lg font-bold">
//               Instructor Email:
//             </label>
//             <input
//               type="email"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               {...register("email")}
//               defaultValue={email}
//               readOnly
//             />
//           </div>
//           <div className="w-1/2 px-4 mb-4 hidden">
//             <label className="block mb-2 text-lg font-bold">status</label>
//             <input
//               type="text"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               {...register("pending")}
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-8 mb-8"
//         >
//           Add Class
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddClass;
