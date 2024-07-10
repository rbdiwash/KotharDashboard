import React from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Popover, Tooltip, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import useKothar from "context/useKothar";
import { IoRefreshCircle } from "react-icons/io5";
import { Refresh } from "@mui/icons-material";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [
    { notificationsList, notificationClicked },
    { setNotificationsList, getNotificationsData, setNotificationClicked },
  ] = useKothar();
  const unreadMessages = notificationsList.filter(
    (notification) => notification.read === false
  )?.length;
  const navigate = useNavigate();
  const location = useLocation();
  const [refresh, setRefresh] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNotification = (item) => {
    item?.module && setNotificationClicked({ state: true, id: item.clientId });
    handleClose();
    setActiveItem(item?.id);

    !item?.read && handleMarkAsRead("single", item);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [anchorE2, setAnchorE2] = React.useState(null);
  const openEach = Boolean(anchorE2);
  const id_2 = openEach ? "simple-popover_2" : undefined;

  const handlePopoverOpen = (event, item) => {
    setAnchorE2(event.currentTarget);
    setActiveItem(item?.id);
  };

  const handlePopoverClose = () => {
    setAnchorE2(null);
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
    getNotificationsData();
  };

  const handleMarkAsRead = (type, item) => {
    let itemArray = [];
    itemArray =
      type === "single"
        ? [activeItem || item?.id]
        : (itemArray = notificationsList?.map((item) => item?.id));
    const payload = { notificationIds: [...itemArray] };
    axios
      .put("/notification/mark-as-read", payload)
      .then((response) => {
        toast.success(response?.data?.message);
        getNotificationsData();
        type === "single" && setAnchorE2(null);
        type !== "single" && setAnchorEl(null);
      })
      .catch((err) => console.log(err));
  };

  const unreadMessage = notificationsList?.filter((message) => !message?.read);

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

          <ul className="flex-col md:flex-row md:gap-4 list-none items-center hidden md:flex ">
            <div className="relative">
              <CircleNotificationsIcon
                className="w-12 h-12 text-white cursor-pointer"
                onClick={handleClick}
                aria-describedby={id}
              />
              {unreadMessages > 0 && (
                <span className="bg-red-400 rounded-full h-6 w-6 text-center text-white absolute -top-1 right-0 ">
                  {unreadMessages}
                </span>
              )}
            </div>
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
                  "max-w-[400px] bg-white text-base z-50 float-left list-none text-left rounded shadow-lg min-w-[350px] max-h-[400px] overflow-y-auto relative"
                }
              >
                <div className="text-white font-bold bg-orange-400 px-4 py-4 flex items-center justify-between sticky top-0">
                  <span className="">
                    <NotificationsActiveIcon /> Notifications
                  </span>
                  <span className=" text-sm cursor-pointer flex gap-2 items-center">
                    <Tooltip
                      title="Refresh for new Notifications"
                      onClick={handleRefresh}
                    >
                      <Refresh
                        sx={{
                          transform: refresh
                            ? `rotate(360deg)`
                            : `rotate(0deg)`,
                          transition: "transform 0.5s ease 0s",
                        }}
                      />
                    </Tooltip>
                    <div
                      onClick={() =>
                        unreadMessage?.length > 0 && handleMarkAsRead("all")
                      }
                      className={""}
                    >
                      Mark all as read
                    </div>
                  </span>
                </div>

                <ul className="">
                  {notificationsList?.length > 0 ? (
                    notificationsList?.reverse()?.map((item) => (
                      <li
                        className={
                          "flex justify-between border-b border-black px-4 py-4 items-center " +
                          (!item?.read && "bg-gray-200 border-white border-b-2")
                        }
                        key={item?.id}
                      >
                        <Link
                          className="cursor-pointer"
                          to={{
                            pathname: `${item?.module ?? location.pathname}`,
                          }}
                          state={{ fromNotification: item }}
                          onClick={() => handleClickNotification(item)}
                        >
                          <p>{item?.content}</p>
                          <p className="text-gray-400 text-sm">
                            {new Date(
                              item?.date || new Date()
                            )?.toLocaleString()}
                          </p>
                        </Link>
                        {!item?.read && (
                          <MoreVertIcon
                            onClick={(e) => handlePopoverOpen(e, item)}
                            aria-describedby={id_2}
                          />
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start justify-between border-b px-4 py-4">
                      <span>No Notifications Available</span>
                    </li>
                  )}
                </ul>
              </div>
            </Popover>
            <Popover
              id={id_2}
              open={openEach}
              onClose={handlePopoverClose}
              anchorEl={anchorE2}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Typography
                sx={{ p: 1, px: 2, cursor: "pointer" }}
                onClick={() => handleMarkAsRead("single")}
              >
                Mark as Read.
              </Typography>
            </Popover>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
