import { Button, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Users = ({ color = "dark" }) => {
  const tableHeadClass = color === "light" ? "light-bg" : "dark-bg";
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
            (color === "light" ? "bg-white" : "bg-sky-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex justify-between">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-slate-700" : "text-white")
                  }
                >
                  Users
                </h3>
                <Button
                  variant="outlined"
                  startIcon={<FaPlusCircle />}
                  component={Link}
                  sx={{ color: "white" }}
                  to="/admin/university/add"
                >
                  Add User
                </Button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className={"table-head " + tableHeadClass}>Name</th>
                  <th className={"table-head " + tableHeadClass}>Email</th>
                  <th className={"table-head " + tableHeadClass}>Contact</th>
                  <th className={"table-head " + tableHeadClass}>Country</th>
                  <th className={"table-head " + tableHeadClass}>Location</th>
                  <th className={"table-head " + tableHeadClass}>Action</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4].map((item, index) => (
                  <tr key={item?.id || index}>
                    <th className="table-data text-left flex items-center">
                      <img
                        src={require("assets/img/bootstrap.jpg")}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                      ></img>
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light" ? "text-slate-600" : "text-white")
                        }
                      >
                        Anand Pandey{" "}
                      </span>
                    </th>
                    <td className="table-data">uosq@college.au</td>
                    <td className="table-data">
                      <div className="flex">98123456789</div>
                    </td>
                    <td className="table-data">
                      <div className="flex items-center gap-2">Australia</div>
                    </td>
                    <td className="table-data">
                      <div className="flex items-center">Sydney</div>
                    </td>

                    <td className="table-data text-right">
                      <div className="flex items-center">
                        <Tooltip title="Delete University" arrow>
                          <IconButton>
                            <AiFillDelete className="text-white cursor-pointer" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
