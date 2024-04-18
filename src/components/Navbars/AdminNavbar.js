import React from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      {/* Navbar */}
      <nav className="w-full z-10 bg-sky-600 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-0 px-4">
          {/* Brand */}
          <a
            className="text-white text-xl uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Kothar Dashboard
          </a>
          {/* Form */}
          {/* <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300  bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form> */}
          {/* User */}
          <ul className="flex-col md:flex-row md:gap-4 list-none items-center hidden md:flex">
            <CircleNotificationsIcon
              className="w-12 h-12 text-white cursor-pointer"
              onClick={handleClick}
              aria-describedby={id}
            />
            <UserDropdown />

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
                  "max-w-[400px] bg-white text-base z-50 float-left list-none text-left rounded shadow-lg min-w-48"
                }
              >
                <ul className="">
                  <li className="flex items-start border-b px-4 py-2">
                    <span>
                      Divash has sent a new message. This is the first
                      notification.
                    </span>
                    <MoreVertIcon />
                  </li>
                  <li className="flex items-start border-b px-4 py-2">
                    <span>
                      Divash has sent a new message. This is the first
                      notification.
                    </span>
                    <MoreVertIcon />
                  </li>
                  <li className="flex items-start border-b px-4 py-2">
                    <span>
                      Divash has sent a new message. This is the first
                      notification.
                    </span>
                    <MoreVertIcon />
                  </li>
                </ul>
              </div>
            </Popover>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
