import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const MyEnrolledClass = () => {
  const [payments, setPayments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `https://y-tigermursa.vercel.app/payments?email=${user.email}`
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    if (user) {
      fetchPayments();
    }
  }, [user]);

  return (
    <div className="text-start p-5 text-black w-full">
      <h1 className="text-3xl font-semibold mb-5">My Enrolled Classes</h1>
      <table className="table-auto w-full border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Class Names</th>
            <th className="border px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index} className="bg-slate-600">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                {payment.classNames.map((className, classNameIndex) => (
                  <p key={classNameIndex} className="text-xl">
                    {className}
                  </p>
                ))}
              </td>
              <td className="border px-4">
                {" "}
                <div className="flex items-center justify-between">
                  <div className=" font-semibold mb-5">
                    Date: {payment.date}
                  </div>
                  <div className=" font-semibold mb-5 mt-2 ">
                    Time: {payment.time}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyEnrolledClass;
