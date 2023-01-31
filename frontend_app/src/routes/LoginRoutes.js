import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import { Outlet } from "react-router";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import Auth from "layouts/Auth";
import Forgot from "views/auth/Forgot";

// render - login

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: <Auth />,
  children: [
    {
      path: "",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "forgot",
      element: <Forgot />,
    },
  ],
};

export default LoginRoutes;
    // "tailwindcss": "2.0.4"
