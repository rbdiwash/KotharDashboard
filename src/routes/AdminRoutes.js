import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import University from "views/admin/University";
import AddUni from "views/admin/University/AddUni";
import Users from "views/admin/Users";
import Students from "views/admin/Students";
import AddStudent from "views/admin/Students/AddStudent";
import AddUsers from "views/admin/Users/AddUsers";
import Consultancy from "views/admin/Consultancy";
import ViewConsultancy from "views/admin/Consultancy/ViewConsultancy";
import AddConsultancy from "views/admin/Consultancy/AddConsultancy";

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
      path: "university",
      element: <University />,
    },
    { path: "university/add", element: <AddUni /> },
    { path: "university/edit/:id", element: <AddUni /> },
    {
      path: "student",
      element: <Students />,
    },
    { path: "student/add", element: <AddStudent /> },

    {
      path: "consultancy",
      element: <Consultancy />,
    },
    {
      path: "consultancy/add",
      element: <AddConsultancy />,
    },
    {
      path: "consultancy/view/:id",
      element: <ViewConsultancy />,
    },
    {
      path: "users",
      element: <Users />,
    },
    {
      path: "users/add",
      element: <AddUsers />,
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
//  name: null,
//     address: null,
//     email: null,
//     website: null,
//     owner: null,
//     abn: null,
//     panNumber: null,
//     primaryContactNumber: null,
//     secondaryContactNumber: null,
//     logo: null,
//     iamge: null,