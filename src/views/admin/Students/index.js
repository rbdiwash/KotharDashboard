import { Button, IconButton, Tooltip } from "@mui/material";
import DiscussionModal from "components/Modals/DiscussionModal";
import SearchField from "components/SearchField";
import useKothar from "context/useKothar";
import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { FaPlusCircle, FaRocketchat } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Students = ({ color = "light" }) => {
  const tableHeadClass = color === "light" ? "light-bg" : "dark-bg";
  const [{ studentList }, { refetchStudent }] = useKothar();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [openDiscussion, setOpenDiscussion] = useState(false);
  const handleDiscussion = () => {
    setOpenDiscussion(!openDiscussion);
  };
  return (
    <div className="flex flex-wrap mt-4 dashBody">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
            (color === "light" ? "bg-white" : "bg-sky-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center justify-between">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-slate-700" : "text-white")
                }
              >
                Students
              </h3>
              <SearchField
                {...{ type: "Student", searchText, setSearchText }}
              />
              <div className="flex items-center gap-4">
                <FaRocketchat
                  className="text-blue-500 text-3xl cursor-pointer"
                  onClick={handleDiscussion}
                />{" "}
                <Button
                  variant="contained"
                  startIcon={<FaPlusCircle />}
                  component={Link}
                  to="/admin/student/add"
                >
                  Add Student
                </Button>{" "}
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className={"table-head " + tableHeadClass}>Name</th>
                  <th className={"table-head " + tableHeadClass}>Email</th>
                  <th className={"table-head " + tableHeadClass}>
                    Applied University
                  </th>
                  <th className={"table-head " + tableHeadClass}>Country</th>
                  <th className={"table-head " + tableHeadClass}>Program</th>
                  <th className={"table-head " + tableHeadClass}>Intake</th>
                  <th className={"table-head " + tableHeadClass}>
                    Case Officer
                  </th>
                  <th className={"table-head " + tableHeadClass}>Reference</th>
                  <th className={"table-head " + tableHeadClass}>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentList?.map((item, index) => (
                  <tr key={item?.id || index}>
                    <th className="table-data text-left flex items-center">
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light" ? "text-slate-600" : "text-white")
                        }
                      >
                        {item?.name || "-"}
                      </span>
                    </th>
                    <td className="table-data"> {item?.email || "-"}</td>
                    <td className="table-data"> {item?.name || "-"}</td>
                    <td className="table-data">
                      <div className="flex">
                        {" "}
                        {item?.name || "-"} {item?.name || "-"}
                      </div>
                    </td>
                    <td className="table-data">
                      <div className="flex items-center gap-2">
                        <img
                          src={require("assets/img/country/aus.png")}
                          alt="..."
                          className="w-10 h-10 rounded-full border-2 border-slate-50 shadow"
                        ></img>
                        {item?.name || "-"}
                      </div>
                    </td>

                    <td className="table-data">
                      <div className="flex items-center">
                        {" "}
                        {item?.name || "-"}
                      </div>
                    </td>
                    <td className="table-data">
                      <div className="flex items-center">
                        {" "}
                        {item?.caseOfficer || "-"}
                      </div>
                    </td>
                    <td className="table-data">
                      <div className="flex items-center">
                        {" "}
                        {item?.reference || "-"}
                      </div>
                    </td>
                    <td className="table-data text-right">
                      <div className="flex items-center">
                        <Tooltip title="View Student Details" arrow>
                          <Link to="/admin/student/view">
                            <IconButton>
                              <AiFillEye className="text-sky-600 cursor-pointer" />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        <Tooltip title="Edit Student Details" arrow>
                          <IconButton
                            onClick={() => navigate("/admin/student/add")}
                          >
                            <AiFillEdit className="text-sky-600 cursor-pointer" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Student Info" arrow>
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
      </div>{" "}
      {openDiscussion && (
        <DiscussionModal open={openDiscussion} setOpen={setOpenDiscussion} />
      )}
    </div>
  );
};

export default Students;
