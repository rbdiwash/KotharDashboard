import { Outlet, useNavigate } from "react-router-dom";

// components

import FooterAdmin from "components/Footers/FooterAdmin.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import useKothar from "context/useKothar";
import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect } from "react";

// views

export default function Admin() {
  const [{ wholeLoading }] = useKothar();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <>
        <Sidebar />
        <div className="relative md:ml-64 bg-slate-100">
          <AdminNavbar />
          {wholeLoading ? (
            <div className="flex items-center justify-center w-full h-[80vh]">
              <CircularProgress color="inherit" />
            </div>
          ) : (
            <Outlet />
          )}
          <FooterAdmin />
        </div>
      </>
    </>
  );
}
