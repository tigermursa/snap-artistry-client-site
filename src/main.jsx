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
import Dashboard from "./Components/Dashboard/Dashboard.jsx";

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
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/dashboards",
        element: <Dashboard></Dashboard>,
      },
    ],
  },
  {
    path: "/*",
    element: <FourOhFour></FourOhFour>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
