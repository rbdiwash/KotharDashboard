import { Button, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const University = ({ color = "light" }) => {
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
                  Universities
                </h3>
                <Button
                  variant="contained"
                  startIcon={<FaPlusCircle />}
                  component={Link}
                  to="/admin/university/add"
                >
                  Add University
                </Button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className={"table-head " + tableHeadClass}>Name</th>
                  <th className={"table-head " + tableHeadClass}>ABN Number</th>
                  <th className={"table-head " + tableHeadClass}>Email</th>
                  <th className={"table-head " + tableHeadClass}>
                    Contact Person
                  </th>
                  <th className={"table-head " + tableHeadClass}>Country</th>
                  <th className={"table-head " + tableHeadClass}>State</th>
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
                      ></img>{" "}
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light" ? "text-slate-600" : "text-white")
                        }
                      >
                        University of Southern Queensland
                      </span>
                    </th>
                    <td className="table-data">12345678790</td>
                    <td className="table-data">uosq@college.au</td>
                    <td className="table-data">
                      <div className="flex">Anand Pandey</div>
                    </td>
                    <td className="table-data">
                      <div className="flex items-center gap-2">
                        <img
                          src={require("assets/img/country/aus.png")}
                          alt="..."
                          className="w-10 h-10 rounded-full border-2 border-slate-50 shadow"
                        ></img>
                        Australia
                      </div>
                    </td>
                    <td className="table-data">
                      <div className="flex items-center">Sydney</div>
                    </td>

                    <td className="table-data text-right">
                      <div className="flex items-center">
                        <Tooltip title="View" arrow>
                          <IconButton>
                            <AiFillEye className="text-sky-600 cursor-pointer" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit University" arrow>
                          <IconButton
                            onClick={() => navigate("/admin/university/add")}
                          >
                            <AiFillEdit className="text-sky-600 cursor-pointer" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete University" arrow>
                          <IconButton>
                            <AiFillDelete className="text-red-600 cursor-pointer" />
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

export default University;
