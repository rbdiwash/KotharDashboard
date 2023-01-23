import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Routes,
  useRoutes,
} from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import { StrictMode } from "react";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import { ToastContainer, toast } from "react-toastify";
import { createRoot } from "react-dom/client";
import Dashboard from "views/admin/Dashboard";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <BrowserRouter>
  //   <ToastContainer />
  //   <Routes>
  //     {/* add routes with layouts */}
  //     <Route path="/admin" element={<Admin />}></Route>
  //     <Route path="/auth" element={<Auth />} />

  //     {/* add routes without layouts */}
  //     <Route path="/landing" exact element={<Landing />} />
  //     <Route path="/profile" exact element={<Profile />} />
  //     <Route path="/" exact element={<Index />} />
  //     {/* add redirect for first page */}
  //     {/* <Redirect from="*" to="/" /> */}
  //   </Routes>
  // </BrowserRouter>
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
