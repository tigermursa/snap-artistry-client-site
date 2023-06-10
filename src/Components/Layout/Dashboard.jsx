import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaShoppingCart,
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaUtensils,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSmallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setDrawerOpen(!isSmallScreen);
  }, [isSmallScreen]);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // const isAdmin = false; // TODO: Load data from the server to have dynamic isAdmin based on Data
  const [isAdmin] = useAdmin();

  return (
    <div className={`drawer ${isDrawerOpen ? "drawer-open" : ""}`}>
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet />
        {isSmallScreen && (
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        )}
      </div>
      <div className="drawer-side bg-[#D1A054]">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80">
          {isAdmin ? (
            <>
              <li>
                <NavLink className="text-black" to="/dashboard/home">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink className="text-black" to="/dashboard/addItem">
                  <FaUtensils /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink className="text-black" to="/dashboard/manageitems">
                  <FaWallet /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink className="text-black" to="/dashboard/history">
                  <FaBook /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink className="text-black" to="/dashboards/users">
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className="text-black" to="/dashboard/home">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink className="text-black" to="/dashboard/reservations">
                  <FaCalendarAlt /> Reservations
                </NavLink>
              </li>
              <li>
                <NavLink className="text-black" to="/dashboard/history">
                  <FaWallet /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboards/mycart">
                  <FaShoppingCart /> My Cart
                  <span className="badge inline badge-secondary">
                    +{cart?.length || 0}
                  </span>
                </NavLink>
              </li>
            </>
          )}

          <div className="divider" />
          <li>
            <NavLink className="text-black" to="/">
              <FaHome /> Home
            </NavLink>{" "}
          </li>
          <li>
            <NavLink className="text-black" to="/menu">
              Our Menu
            </NavLink>
          </li>
          <li>
            <NavLink className="text-black" to="/order/salad">
              Order Food
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
