import { lazy } from "react";

// project import
import Loadable from "components/Loadable";

// render - dashboard
const Admin = Loadable(lazy(() => import("layouts/Admin")));
const Dashboard = Loadable(lazy(() => import("views/admin/Dashboard")));
const Tables = Loadable(lazy(() => import("views/admin/Tables")));
const Settings = Loadable(lazy(() => import("views/admin/Settings")));
const Maps = Loadable(lazy(() => import("views/admin/Maps")));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
  path: "/admin",
  element: <Admin />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "maps",
      element: <Maps />,
    },

    {
      path: "settings",
      element: <Settings />,
    },
    {
      path: "tables",
      element: <Tables />,
    },
  ],
};

export default AdminRoutes;
