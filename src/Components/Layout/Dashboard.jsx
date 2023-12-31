import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaRegFileVideo,
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaRegEdit,
  FaBook,
  FaUsers,
  FaCheck,
} from "react-icons/fa";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";

import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";
import Spinner from "../Private/Spiner";

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

  const [isAdmin, isAdminLoading] = useAdmin();
  const [isInstructor, isInstructorLoading] = useInstructor();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin && !isInstructor) {
      navigate("/dashboards/mycart");
    } else if (isAdmin && !isInstructor) {
      navigate("/dashboards/users");
    } else if (!isAdmin && isInstructor) {
      navigate("/dashboards/myclasses");
    }
  }, [isAdmin, isInstructor, navigate]);

  if (isAdminLoading || isInstructorLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Spinner></Spinner>
        </div>
      </div>
    );
  }
  return (
    <>
      <NavigationBar />
      <div className={`drawer ${isDrawerOpen ? "drawer-open" : ""}`}>
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={toggleDrawer}
        />
        <div className="drawer-content flex flex-col items-center mt-10">
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

        <div className="drawer-side bg-purple-950 mb-10">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80">
            {isAdmin && (
              <>
                <li>
                  <div className="text-white text-2xl font-semibold">
                    <FaHome />
                    Admin Home
                  </div>
                </li>
                <li>
                  <NavLink className="text-white" to="/dashboards/allclass">
                    <FaRegEdit /> Manage Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-white" to="/dashboards/users">
                    <FaUsers /> All Users
                  </NavLink>
                </li>
                <li className="">
                  <NavLink className="text-white " to="/dashboards/mycart">
                    <FaRegFileVideo /> My selected classes
                    <span className="badge inline badge-secondary">
                      +{cart?.length || 0}
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {isInstructor && (
              <>
                <li>
                  <div className="text-white text-2xl font-semibold">
                    <FaHome />
                    Instructor Home
                  </div>
                </li>
                <li>
                  <NavLink className="text-white" to="/dashboards/addclass">
                    <FaCalendarAlt /> Add a Class
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-white" to="/dashboards/myclasses">
                    <FaWallet /> My Classes
                  </NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboards/mycart">
                    <FaRegFileVideo className="text-lg text-white" /> My
                    Selected Classes
                    <span className="badge inline badge-secondary ">
                      +{cart?.length || 0}
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {!isAdmin && !isInstructor && (
              <>
                <li>
                  <div className="text-white text-2xl font-semibold">
                    <FaHome /> User Home
                  </div>
                </li>
                <li>
                  <NavLink to="/dashboards/mycart">
                    <FaRegFileVideo className="text-lg" /> My Selected Classes
                    <span className="badge inline badge-secondary">
                      +{cart?.length || 0}
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink className="text-white" to="/dashboard/enrolled">
                    <FaCalendarAlt /> My Enrolled Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-white" to="/dashboards/phistory">
                    <FaWallet /> Payment History
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-white" to="/dashboards/enrolled">
                    <FaCheck /> My Enrolled Classes
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider" />
            <li>
              <NavLink className="text-white" to="/">
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink className="text-white" to="/instructors">
                Instructors
              </NavLink>
            </li>
            <li>
              <NavLink className="text-white" to="/classes">
                Classes
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
