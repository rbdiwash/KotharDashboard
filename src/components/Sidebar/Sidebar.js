/*eslint-disable*/
import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo.png";

import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const location = useLocation();
  const userDetail = JSON.parse(localStorage.getItem("userDetail"));
  const options = [
    {
      label: "Dashboard",
      value: "dashboard",
      icon: "fas fa-tv",
      role: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
    {
      label: "Client",
      value: "client",
      icon: "fas fa-user",
      role: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
    {
      label: "University",
      value: "university",
      icon: "fas fa-school",
      role: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
    {
      label: "course",
      value: "course",
      icon: "fas fa-briefcase",
      role: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
    {
      label: "RPL Certificate",
      value: "rpl-certificate",
      icon: "fas fa-briefcase",
      role: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
    {
      label: "Student",
      value: "student",
      icon: "fas fa-graduation-cap",
      role: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
    {
      label: "Visa",
      value: "visa",
      icon: "fas fa-x-ray",
      role: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
    {
      label: "Insurance",
      value: "insurance",
      icon: "fas fa-x-ray",
      role: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
    {
      label: "Skill Assessment",
      value: "skill-assessment",
      icon: "fas fa-x-ray",
      role: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
    {
      label: "consultancy",
      value: "consultancy",
      icon: "fas fa-briefcase",
      role: ["SUPER_ADMIN"],
    },
    {
      label: "Invoice",
      value: "invoice",
      icon: "fas fa-file-invoice-dollar",
      role: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
    {
      label: "User",
      value: "user",
      icon: "fas fa-user",
      role: ["SUPER_ADMIN"],
    },
    {
      label: "Account",
      value: "account",
      icon: "fas fa-file-invoice-dollar",
      role: ["SUPER_ADMIN"],
    },
    {
      label: "Profit/Loss",
      value: "profit-loss",
      icon: "fas fa-dollar-sign",
      role: ["SUPER_ADMIN"],
    },
  ];

  const authOptions = [
    {
      label: "Login",
      value: "",
      icon: "fas fa-sign-in-alt",
    },
    { label: "Register", value: "register", icon: "fas fa-clipboard-list" },
  ];

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          <Link
            className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            <img src={logo} className="h-16" />
          </Link>
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-0 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Kothar Dashboard
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid  border-slate-500 placeholder-slate-300 text-slate-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>
            <hr className="mb-4 md:min-w-full" />
            {/* <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin Panel
            </h6> */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {options
                .filter((option) => option.role.includes(userDetail?.type))
                .map((item) => (
                  <li className="items-center" key={item?.value}>
                    <Link
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (location.pathname.includes(`/admin/${item?.value}`)
                          ? "text-sky-500 hover:text-sky-600"
                          : "text-slate-700 hover:text-slate-500")
                      }
                      to={`/admin/${item?.value}`}
                    >
                      <i
                        className={
                          `${item?.icon} mr-2 text-sm ` +
                          (window.location.href.indexOf(
                            `/admin/${item?.value}`
                          ) !== -1
                            ? "opacity-75"
                            : "text-slate-300")
                        }
                      ></i>
                      {item?.label}
                    </Link>
                  </li>
                ))}
            </ul>
            <hr className="my-4 md:min-w-full" />
            {/* <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Auth Layout Pages
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              {authOptions.map((item) => (
                <li className="items-center" key={item?.value}>
                  <a
                    className="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold block"
                    href={`/${item?.value}`}
                  >
                    <i
                      className={`${item?.icon} text-slate-400 mr-2 text-sm`}
                    ></i>
                    {item?.label}
                  </a>
                </li>
              ))}
            </ul> */}
            {/* <hr className="my-4 md:min-w-full" />
            <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              No Layout Pages
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold block"
                  to="/landing"
                >
                  <i className="fas fa-newspaper text-slate-400 mr-2 text-sm"></i>
                  Landing Page
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold block"
                  to="/profile"
                >
                  <i className="fas fa-user-circle text-slate-400 mr-2 text-sm"></i>
                  Profile Page
                </Link>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
}
