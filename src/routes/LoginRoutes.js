
// project import
import Auth from "layouts/Auth";
import EmailVerify from "views/auth/EmailVerify";
import Forgot from "views/auth/Forgot";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import ResetPassword from "views/auth/ResetPassword";

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
    {
      path: "reset/password/:token",
      element: <ResetPassword />,
    },
    {
      path: "email/verify/:code",
      element: <EmailVerify />,
    },
  ],
};

export default LoginRoutes;
// "tailwindcss": "2.0.4"
