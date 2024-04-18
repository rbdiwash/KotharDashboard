import React from "react";
import { Popover } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { FaUserAlt } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const [{ token }, { setToken }] = useKothar();
  const fetchToken = () => {
    fetch(`${API_URL}/auth/register`, {
      method: "POST",

      body: JSON.stringify({
        firstName: "Divash",
        lastName: "Ranabhat",
        email: `test@gmail.com`,
        password: "123456789",
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())

      .then((json) => setToken(json?.token));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <a
        className="text-slate-500 block"
        href="#"
        onClick={handleClick}
        aria-describedby={id}
      >
        <div className="items-center flex">
          <AccountCircleIcon className="w-12 h-12 rounded-full text-2xl bg-sky-600 text-white" />
        </div>
      </a>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div
          className={
            "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
          }
        >
          <Link
            to="/"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
            }
          >
            Divash Ranabhat
          </Link>
          <Link
            to="/"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
            }
          >
            Profile
          </Link>
          <Link
            to="/forgot"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
            }
          >
            Reset Password
          </Link>
          <button
            className={
              "text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-slate-700 text-left"
            }
            onClick={fetchToken}
          >
            Fetch Token
          </button>
          <div className="h-0 my-2 border border-solid border-slate-100" />
          <p
            onClick={logOut}
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700 cursor-pointer"
            }
          >
            Log out
          </p>
        </div>
      </Popover>
    </>
  );
};

export default UserDropdown;
