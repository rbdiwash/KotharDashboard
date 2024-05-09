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
import AddConsultancy from "views/admin/Consultancy/AddConsultancy";
import StudentDetails from "views/admin/Students/StudentDetails";
import Course from "views/admin/Course";
import AddCourse from "views/admin/Course/AddCourse";
import AddInvoice from "views/admin/Invoice/AddInvoice";
import Invoice from "views/admin/Invoice";
import RPLCertificate from "views/admin/RPL_Certificate";
import AddRPLCertificate from "views/admin/RPL_Certificate/AddRPL";
import Insurance from "views/admin/Insurance";
import Visa from "views/admin/Visa";
import SkillAssessment from "views/admin/SkillAssessment";
import AddVisaDetails from "views/admin/Visa/AddVisa";
import AddSkillAssessment from "views/admin/SkillAssessment/AddSkillAssessment";
import Accounts from "views/admin/Accounts";
import AddAccounts from "views/admin/Accounts/AddAccounts";
import Clients from "views/admin/Clients";
import AddClient from "views/admin/Clients/AddClient";
import ArchivedClients from "views/admin/Clients/ArchivedClient";
import ProfitLoss from "views/admin/ProfitLoss";

// render - dashboard
const Admin = Loadable(lazy(() => import("layouts/Admin")));
const Dashboard = Loadable(lazy(() => import("views/admin/Dashboard")));
const Tables = Loadable(lazy(() => import("views/admin/Tables")));
const Settings = Loadable(lazy(() => import("views/admin/Settings")));
const Maps = Loadable(lazy(() => import("views/admin/Maps")));

const AdminRoutes = {
  path: "/admin",
  element: <Admin />,
  children: [
    {
      path: "",
      element: <Dashboard />,
    },

    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "client",
      element: <Clients />,
    },
    {
      path: "client/archived",
      element: <ArchivedClients />,
    },
    { path: "client/add", element: <AddClient /> },

    {
      path: "account",
      element: <Accounts />,
    },
    {
      path: "profit-loss",
      element: <ProfitLoss />,
    },
    { path: "account/add", element: <AddAccounts /> },
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
    { path: "student/edit/:id", element: <AddStudent /> },

    { path: "student/view", element: <StudentDetails /> },

    {
      path: "consultancy",
      element: <Consultancy />,
    },

    {
      path: "consultancy/add",
      element: <AddConsultancy />,
    },
    {
      path: "consultancy/edit/:id",
      element: <AddConsultancy />,
    },

    {
      path: "insurance",
      element: <Insurance />,
    },
    {
      path: "visa",
      element: <Visa />,
    },
    {
      path: "visa/add",
      element: <AddVisaDetails />,
    },
    {
      path: "skill-assessment",
      element: <SkillAssessment />,
    },
    {
      path: "skill-assessment/add",
      element: <AddSkillAssessment />,
    },

    {
      path: "rpl-certificate",
      element: <RPLCertificate />,
    },
    {
      path: "rpl-certificate/add",
      element: <AddRPLCertificate />,
    },
    {
      path: "rpl-certificate/edit/:id",
      element: <AddRPLCertificate />,
    },
    {
      path: "course",
      element: <Course />,
    },
    {
      path: "course/add",
      element: <AddCourse />,
    },
    {
      path: "course/edit/:id",
      element: <AddCourse />,
    },
    {
      path: "user",
      element: <Users />,
    },
    {
      path: "invoice",
      element: <Invoice />,
    },
    {
      path: "invoice/add",
      element: <AddInvoice />,
    },
    {
      path: "user/add",
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
