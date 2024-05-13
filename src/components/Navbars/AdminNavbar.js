import React from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationsList, setNotificationsList] = React.useState([]);
  const [refresh, setRefresh] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getNotificationsData = () => {
    axios
      .get("/notification")
      .then((response) => {
        setNotificationsList(response?.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (open) {
      getNotificationsData();
    }
  }, [open]);
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
                  "max-w-[400px] bg-white text-base z-50 float-left list-none text-left rounded shadow-lg min-w-[300px] max-h-[500px] overflow-y-auto"
                }
              >
                <div className="bg-gray-200 px-4 py-3 flex items-center justify-between">
                  <span>Notifications</span>
                  <span className="text-blue-400 text-sm">Mark all as read</span>
              </div>
              
                <ul className="">
                  {notificationsList?.map((item) => (
                    <li
                      className="flex items-start justify-between border-b px-4 py-4"
                      key={item?.id}
                    >
                      <span>{item?.content}</span>
                      <MoreVertIcon />
                    </li>
                  ))}
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
