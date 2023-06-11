import { useQuery } from "@tanstack/react-query";
// import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaShieldAlt, FaUserLock } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:3000/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleMakeInstructor = (user) => {
    fetch(`http://localhost:3000/users/instructor/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an instructor now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleDelete = (user) => {
    fetch(`http://localhost:3000/users/${user._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to delete user",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "An error occurred",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="w-full">
      {/* <Helmet>
        <title>Bistro Boss | All users</title>
      </Helmet> */}
      <h3 className="text-3xl font-semibold my-4 text-white">
        Current Users: {users.length}
      </h3>
      <div className="overflow-x-auto ">
        <table className="table table-zebra w-full text-white ">
          {/* head */}
          <thead className="text-white text-lg">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Role 2</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <div>
                  <div className="">
                    <img
                      className=" rounded-full w-12 h-12 mt-3 object-cover"
                      src={user.image}
                    />
                  </div>
                </div>

                <td className="text-white">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <button className="btn hover:bg-green-700 bg-green-700 rounded-full  text-white">
                      <FaShieldAlt></FaShieldAlt>
                    </button>
                  ) : (
                    <button
                      title="Make admin"
                      onClick={() => handleMakeAdmin(user)}
                      className="btn hover:bg-green-700 bg-purple-900 rounded-full  text-white"
                    >
                      <FaShieldAlt></FaShieldAlt>
                    </button>
                  )}
                </td>
                <td>
                  {user.role === "instructor" ? (
                    <button className="btn hover:bg-green-700 bg-green-700 rounded-full  text-white">
                      <FaUserLock />
                    </button>
                  ) : (
                    <button
                      title="Make instructor"
                      onClick={() => handleMakeInstructor(user)}
                      className="btn hover:bg-green-700 bg-purple-900 rounded-full  text-white"
                    >
                      <FaUserLock />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    title="delete user"
                    onClick={() => handleDelete(user)}
                    className="btn  bg-purple-950 hover:bg-red-700  rounded-full text-white"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
