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
      path: "student",
      element: <Tables />,
    },
    {
      path: "university",
      element: <Tables />,
    },
    {
      path: "consultancy",
      element: <Tables />,
    },

    {
      path: "setting",
      element: <Settings />,
    },
    {
      path: "map",
      element: <Maps />,
    },
  ],
};

export default AdminRoutes;
