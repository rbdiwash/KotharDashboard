import React from "react";
import { Popover } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <a
        className="text-slate-500 block"
        href="#pablo"
        onClick={handleClick}
        aria-describedby={id}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("assets/img/user.png")}
            />
          </span>
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
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
            }
          >
            Divash Ranabhat
          </a>
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
            }
          >
            Profile
          </a>
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
            }
          >
            Settings
          </a>
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
