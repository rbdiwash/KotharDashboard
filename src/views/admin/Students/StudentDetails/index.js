import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import InsuranceModal from "../../Insurance/InsuranceModal";
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
import GeneralInfo from "./GeneralInfo";
import DocumentAndAddress from "./DocumentAndAddress";
import AcademicQualification from "./AcademicQualification";
import WorkExperience from "./WorkExperience";
import Test from "./Test";
import DeleteModal from "components/Modals/DeleteModal";

const StudentDetails = ({ color = "light" }) => {
  const student = {};
  const [openOnshore, setOpenOnshore] = useState(false);
  const [openInsuranceForm, setOpenInsuranceForm] = useState(false);
  const [openRPLform, setOpenRPLform] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);

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

  const handleDelete = () => {};
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
                    <Tooltip
                      title={"Visa Status: " + getStatus()?.message}
                      arrow
                    >
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
                    {/* <Button
                      variant="contained"
                      startIcon={<FaPlusCircle />}
                      onClick={() => setOpenInsuranceForm(!openInsuranceForm)}
                    >
                      Add Insurance Details
                    </Button> */}
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
                        <p
                          className="flex items-center p-1 pr-3"
                          onClick={() => setDeleteModal(true)}
                        >
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
                <GeneralInfo />
                <hr />
                <DocumentAndAddress />
                <hr />
                <AcademicQualification />
                <hr />
                <WorkExperience />
                <hr />
                <Test />
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
      {deleteModal && (
        <DeleteModal
          {...{
            open: deleteModal,
            handleCancel: () => setDeleteModal(false),
            handleDelete,
            item: "Student Information",
          }}
        />
      )}
    </>
  );
};
export default StudentDetails;
