import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import FourOhFour from "./Components/FourOhFour/FourOhFour.jsx";
import Login from "./Components/Login/Login.jsx";
import AuthProvider from "./Components/Provider/AuthProvider.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
import Instructors from "./Components/Instructors/Instructors.jsx";
import Classes from "./Components/Classes/Classes.jsx";
import Dashboard from "./Components/Layout/Dashboard.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyCart from "./Components/Layout/MyCart/MyCart.jsx";
import AllUsers from "./Components/Layout/AllUsers/AllUsers.jsx";
import AdminRoute from "./Components/Private/AdminRoute.jsx";
import PrivateRoute from "./Components/Private/PrivateRoute.jsx";
import AddClass from "./Components/Layout/AddClass/AddClass.jsx";
import MyClass from "./Components/Layout/MyClass/MyClass.jsx";
import UpdateClass from "./Components/Instructors/UpdateClass.jsx";
import InstructorRoute from "./Components/Private/InstructorRoute.jsx";
import Payment from "./Components/Layout/Payment/Payment.jsx";
import PaymentHistory from "./Components/Layout/Payment/PaymentHistory.jsx";
import AllClasses from "./Components/Classes/Allclasses.jsx";
import MyEnrolledClass from "./Components/Layout/MyEnrolledClass/MyEnrolledClass.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },

      {
        path: "/dashboards/myclasses/update/:id",
        element: <UpdateClass></UpdateClass>,
        loader: ({ params }) =>
          fetch(`https://y-tigermursa.vercel.app/classes/${params.id}`),
      },
      {
        path: "/classes",
        element: <Classes />,
      },
    ],
  },
  {
    path: "/*",
    element: <FourOhFour></FourOhFour>,
  },
  {
    path: "/dashboards",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboards/mycart",
        element: <MyCart></MyCart>,
      },
      {
        path: "/dashboards/mycart/student/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboards/phistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "/dashboards/enrolled",
        element: <MyEnrolledClass></MyEnrolledClass>,
      },
      {
        path: "/dashboards/addclass",
        element: <AddClass></AddClass>,
      },
      {
        path: "/dashboards/myclasses",
        element: <MyClass></MyClass>,
      },
      {
        path: "/dashboards/users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboards/allclass",
        element: (
          <AdminRoute>
            <AllClasses></AllClasses>
          </AdminRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-screen-xl mx-auto">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
