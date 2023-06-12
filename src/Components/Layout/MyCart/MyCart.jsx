// import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyCart = () => {
  const [cart, refetch] = useCart();
  //  using reduce to show total price
  const total = cart.reduce((sum, item) => item.price + sum, 0).toFixed(2);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://y-tigermursa.vercel.app/cart/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="w-full">
      {/* <Helmet>
                <title>Bistro Boss | My Cart</title>
            </Helmet> */}
      <div className="uppercase font-semibold h-[50px] flex justify-evenly items-center mb-10">
        <h3 className="text-3xl">Total Items : {cart.length}</h3>
        <h3 className="text-3xl">Total Price : ${total}</h3>
        <Link to="student/payment">
          <button className="btn bg-green-600 text-zinc-50 btn-md">PAY</button>
        </Link>
      </div>
      <div className="overflow-x-auto w-full ">
        <table className="table w-full">
         
          <thead className="text-xl text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask-squircle mask w-12 h-12">
                      <img
                        src={item.classImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td className="text-white">{item.className}</td>
                <td className="text-white">${item.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
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

export default MyCart;
