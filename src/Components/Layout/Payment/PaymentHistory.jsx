import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const PaymentHistory = () => {
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
    <div className="text-start  p-5 text-black ">
      {payments.map((payment) => (
        <div
          key={payment.transactionId}
          className="card border p-5 bg-yellow-500 mt-5"
        >
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold mb-5">
              Date: {payment.date}
            </div>
            <div className=" font-semibold mb-5 ">Time: {payment.time}</div>
          </div>

          <div className="font-semibold">
            Transaction ID: {payment.transactionId}
          </div>
          <div>Email: {payment.email}</div>

          <div>Quantity: {payment.quantity}</div>
          <div>
            <p>Classes: ({payment.classNames.length})</p>
            <ol>
              {payment.classNames.map((className, index) => (
                <li key={className}>
                  {index + 1}. {className}
                </li>
              ))}
            </ol>
          </div>
          <div className=" text-green-700 font-bold text-2xl mt-5">
            Payment: ${payment.price}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentHistory;
