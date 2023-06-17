import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import InsuranceModal from "../InsuranceModal";
import OnShoreDetailsModal from "../OnShoreDetailModal";
import RPLModal from "../RPLModal";
import Comments from "./Comments";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const StudentDetails = ({ color = "light" }) => {
  const student = {};
  const [openOnshore, setOpenOnshore] = useState(false);
  const [openInsuranceForm, setOpenInsuranceForm] = useState(false);
  const [openRPLform, setOpenRPLform] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const getStatus = () => {
    let text = "bg-yellow";
    let message = "Unknown";

    if (student?.visa === "Accepted") {
      text = "bg-green-500";
      message = "Accepted";
    } else if (student?.visa === "Rejected") {
      text = "bg-red-500";
      message = "Rejected";
    } else {
      text = "bg-yellow-500";
      message = "Pending";
    }

    return { text, message };
  };
  return (
    <>
      <div className="flex flex-wrap mt-4 dashBody">
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
                  <div className="flex justify-start gap-4 items-center">
                    <IoArrowBack
                      className="text-xl cursor-pointer"
                      onClick={() => navigate(-1)}
                    />
                    <h3
                      className={
                        "font-semibold text-lg " +
                        (color === "light" ? "text-slate-700" : "text-white")
                      }
                    >
                      Students Details
                    </h3>
                    <Tooltip title={"Visa Status: " + getStatus()?.message} arrow>
                      <div className="flex items-center">
                        <span
                          className={
                            "rounded-full w-3 h-3 " + getStatus()?.text
                          }
                        ></span>
                      </div>
                    </Tooltip>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant="contained"
                      startIcon={<FaPlusCircle />}
                      onClick={() => setOpenRPLform(!openRPLform)}
                    >
                      Add RPL Details
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<FaPlusCircle />}
                      onClick={() => setOpenInsuranceForm(!openInsuranceForm)}
                    >
                      Add Insurance Details
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<FaPlusCircle />}
                      onClick={() => setOpenOnshore(!openOnshore)}
                    >
                      Add Onshore Details
                    </Button>
                    <IconButton aria-describedby={id} onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <div className="flex flex-col divide-y-2 cursor-pointer">
                        <p className="flex items-center p-1 pr-3">
                          <IconButton>
                            <EditIcon sx={{ color: "blue" }} />
                          </IconButton>
                          Edit Student Details
                        </p>
                        <p className="flex items-center p-1 pr-3">
                          <IconButton>
                            <DeleteIcon sx={{ color: "red" }} />
                          </IconButton>
                          Delete Student Info
                        </p>
                      </div>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="container student-profile text-left">
              <div className="px-8">
                <div className="my-4 grid grid-cols-12 gap-4">
                  <div className="col-span-3 sub-heading mt-0">
                    General Information
                  </div>
                  <div className="col-span-9">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="w-full">
                        <p className="heading">Name: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Email Address: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Mobile Number: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Gender: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Date of Birth: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                    </div>
                    <div className="view-label mt-4">
                      Emergency Contact Information:
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="w-full">
                        <p className="heading">Emergency Contact Name: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Emergency Email: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Emergency Contact Number: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Relation With Applicant: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="my-4 grid grid-cols-12 gap-4">
                  <div className="col-span-3 sub-heading mt-0">
                    Documents and Address
                  </div>
                  <div className="col-span-9">
                    <div className="view-label">Permanent Address</div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="w-full">
                        <p className="heading">Country: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">State/Province: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">City: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">ZIP Code: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                    </div>
                    <div className="view-label mt-4">Temporary Address</div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="w-full">
                        <p className="heading">Country: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">State/Province: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">City: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">ZIP Code: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                    </div>
                    <div className="view-label mt-4">Passport Information</div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="w-full">
                        <p className="heading">Passport Number: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Country Issued: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Place of Birth: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Date of Issue: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Date of Expiry: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                    </div>
                    <div className="view-label mt-4">
                      Nationality Information
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full">
                        <p className="heading">
                          Is the applicant citizen of more than one country ?
                        </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">
                          Is the applicant living or studying in any other
                          country ?
                        </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">
                          Does the student have any refusal from any other
                          country ?
                        </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">
                          Does the student have any serious medical condition ?
                        </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">
                          Has the applicant ever been convicted of a criminal
                          offense ?
                        </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">
                          Has the applicant applied into immigration into any
                          other country?
                        </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="my-4 grid grid-cols-12 gap-4">
                  <div className="col-span-3 sub-heading mt-0">
                    Academic Qualification
                  </div>
                  <div className="col-span-9">
                    <div className="view-label">Grade 10th or Equivalent</div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="w-full">
                        <p className="heading">Board: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Name of Institution: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">
                          Primary Medium of Instruction:
                        </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Course of Study: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">State of Study: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Score : </p>
                        <p className="detail">
                          {student?.tenth?.score || "-"}
                          {student?.tenth?.gradingSystem}
                          out of {student?.tenth?.outOf}
                          {student?.tenth?.gradingSystem}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Passout year: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Degree: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Degree title: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                    </div>
                    <div className="view-label mt-4">+2 OR EQUIVALENT</div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="w-full">
                        <p className="heading">Board: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Name of Institution: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">
                          Primary Medium of Instruction:
                        </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Course of Study: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">State of Study: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Score : </p>
                        <p className="detail">
                          {student?.tenth?.score || "-"}
                          {student?.tenth?.gradingSystem}
                          out of {student?.tenth?.outOf}
                          {student?.tenth?.gradingSystem}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Passout year: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Degree: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Degree title: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                    </div>
                    <div className="view-label mt-4">
                      BACHELOR OR EQUIVALENT:
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="w-full">
                        <p className="heading">Board: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Name of Institution: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">
                          Primary Medium of Instruction:
                        </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Course of Study: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">State of Study: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Score : </p>
                        <p className="detail">
                          {student?.tenth?.score || "-"}
                          {student?.tenth?.gradingSystem}
                          out of {student?.tenth?.outOf}
                          {student?.tenth?.gradingSystem}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Passout year: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Degree: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="heading">Degree title: </p>
                        <p className="detail">
                          {student?.name || "Student Name"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="my-4 grid grid-cols-12 gap-4">
                  <div className="col-span-3 sub-heading mt-0">
                    Work Experience
                  </div>
                  <div className="col-span-9">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table class="w-full text-sm text-left text-gray-500 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                          <tr>
                            <th scope="col" class="px-6 py-5 text-base">
                              Name of Organization
                            </th>
                            <th scope="col" class="px-6 py-5 text-base">
                              From
                            </th>
                            <th scope="col" class="px-6 py-5 text-base">
                              To
                            </th>
                            <th scope="col" class="px-6 py-5 text-base">
                              Document Uploaded
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white border-b ">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              Apple MacBook Pro 17"
                            </th>
                            <td class="px-6 py-4">Silver</td>
                            <td class="px-6 py-4">Laptop</td>
                            <td class="px-6 py-4">$2999</td>
                          </tr>
                          <tr class="border-b bg-gray-50  ">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              Microsoft Surface Pro
                            </th>
                            <td class="px-6 py-4">White</td>
                            <td class="px-6 py-4">Laptop PC</td>
                            <td class="px-6 py-4">$1999</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="my-4 grid grid-cols-12 gap-4">
                  <div className="col-span-3 sub-heading mt-0">Test</div>
                  <div className="col-span-9">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table class="w-full text-sm text-left text-gray-500 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                          <tr>
                            <th scope="col" class="px-6 py-5 text-base">
                              Test Type
                            </th>
                            <th scope="col" class="px-6 py-5 text-base">
                              Overall Score
                            </th>
                            <th scope="col" class="px-6 py-5 text-base">
                              Date of Examination
                            </th>
                            <th scope="col" class="px-6 py-5 text-base">
                              Unique ID
                            </th>
                            <th scope="col" class="px-6 py-5 text-base">
                              Documents Uploaded
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white border-b ">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              Apple MacBook Pro 17"
                            </th>
                            <td class="px-6 py-4">Silver</td>
                            <td class="px-6 py-4">Laptop</td>
                            <td class="px-6 py-4">$2999</td>
                          </tr>
                          <tr class="border-b bg-gray-50  ">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              Microsoft Surface Pro
                            </th>
                            <td class="px-6 py-4">White</td>
                            <td class="px-6 py-4">Laptop PC</td>
                            <td class="px-6 py-4">$1999</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <hr />
                <Comments {...{ student }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {openOnshore && (
        <OnShoreDetailsModal {...{ openOnshore, setOpenOnshore }} />
      )}
      {openInsuranceForm && (
        <InsuranceModal {...{ openInsuranceForm, setOpenInsuranceForm }} />
      )}
      {openRPLform && <RPLModal {...{ openRPLform, setOpenRPLform }} />}
    </>
  );
};
export default StudentDetails;
