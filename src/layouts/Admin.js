import {
  Outlet
} from "react-router-dom";

// components

import FooterAdmin from "components/Footers/FooterAdmin.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

// views


export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-100">
        <AdminNavbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        {/* <div className="px-4 md:px-10 mx-auto w-full"> */}
        <Outlet />
        <FooterAdmin />
        {/* </div> */}
      </div>
    </>
  );
}
