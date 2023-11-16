import {
  Outlet
} from "react-router-dom";

// components

import FooterAdmin from "components/Footers/FooterAdmin.js";
import HeaderStats from "components/Headers/HeaderStats.js";
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
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <>
            <Outlet />
            {/* <Route path="dashboard" exact element={<Dashboard />} />
            <Route path="/maps" exact element={<Maps />} />
            <Route path="/settings" exact element={<Settings />} />
            <Route path="/tables" exact element={<Tables />} />
            <Route
              path="/"
              exact
              element={<Navigate to="/dashboard" replace />}
            /> */}
          </>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
