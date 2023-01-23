import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import { Outlet } from "react-router";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import Auth from "layouts/Auth";

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
  ],
};

export default LoginRoutes;
