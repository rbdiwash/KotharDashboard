import { Button, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const StudentDetails = ({ color = "light" }) => {
  const tableHeadClass = color === "light" ? "light-bg" : "dark-bg";
  const navigate = useNavigate();
  const student = {};

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
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex justify-between">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-slate-700" : "text-white")
                  }
                >
                  Students Details
                </h3>
                <Button
                  variant="contained"
                  startIcon={<FaPlusCircle />}
                  component={Link}
                  to="/admin/student/add"
                >
                  Add Student
                </Button>
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
                  <div className="view-label mt-4">Nationality Information</div>
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
                        Is the applicant living or studying in any other country
                        ?
                      </p>
                      <p className="detail">
                        {student?.name || "Student Name"}
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="heading">
                        {" "}
                        Does the student have any refusal from any other country
                        ?
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
                      <p className="heading">Primary Medium of Instruction: </p>
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
                        {student?.tenth?.score || "-"}{" "}
                        {student?.tenth?.gradingSystem}
                        out of {student?.tenth?.outOf}{" "}
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
                      <p className="heading">Primary Medium of Instruction: </p>
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
                        {student?.tenth?.score || "-"}{" "}
                        {student?.tenth?.gradingSystem}
                        out of {student?.tenth?.outOf}{" "}
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
                  <div className="view-label mt-4">BACHELOR OR EQUIVALENT:</div>
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
                      <p className="heading">Primary Medium of Instruction: </p>
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
                        {student?.tenth?.score || "-"}{" "}
                        {student?.tenth?.gradingSystem}
                        out of {student?.tenth?.outOf}{" "}
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
              </div>{" "}
              <hr />
              <div className="my-4 grid grid-cols-12 gap-4">
                <div className="col-span-3 sub-heading mt-0">
                  Work Experience
                </div>
                <div className="col-span-9">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="w-full">
                      <p className="heading">Name of Organization: </p>
                      <p className="detail">
                        {student?.name || "Student Name"}
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="heading">From: </p>
                      <p className="detail">
                        {student?.name || "Student Name"}
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="heading">To: </p>
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
                        {student?.tenth?.score || "-"}{" "}
                        {student?.tenth?.gradingSystem}
                        out of {student?.tenth?.outOf}{" "}
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
                      <p className="heading">Primary Medium of Instruction: </p>
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
                        {student?.tenth?.score || "-"}{" "}
                        {student?.tenth?.gradingSystem}
                        out of {student?.tenth?.outOf}{" "}
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
                  <div className="view-label mt-4">BACHELOR OR EQUIVALENT:</div>
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
                      <p className="heading">Primary Medium of Instruction: </p>
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
                        {student?.tenth?.score || "-"}{" "}
                        {student?.tenth?.gradingSystem}
                        out of {student?.tenth?.outOf}{" "}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
  <table class="table table-bordered">
    <tr>
      <th className="w-1/3">Name</th>
      <td width="2%">:</td>
      <td>125</td>
    </tr>
    <tr>
      <th className="w-1/3">Email Address </th>
      <td width="2%">:</td>
      <td>2020</td>
    </tr>
    <tr>
      <th className="w-1/3">Mobile Number</th>
      <td width="2%">:</td>
      <td>Male</td>
    </tr>
    <tr>
      <th className="w-1/3">Gender</th>
      <td width="2%">:</td>
      <td>Group</td>
    </tr>
    <tr>
      <th className="w-1/3">Date of Birth</th>
      <td width="2%">:</td>
      <td>B+</td>
    </tr>
    <tr>
      <th className="w-1/3">Marital Status</th>
      <td width="2%">:</td>
      <td>B+</td>
    </tr>
    <tr>
      <th className="w-1/3">Emergency Contact Name</th>
      <td width="2%">:</td>
      <td>B+</td>
    </tr>
    <tr>
      <th className="w-1/3">Emergency Email</th>
      <td width="2%">:</td>
      <td>B+</td>
    </tr>
    <tr>
      <th className="w-1/3">Emergency Contact Number</th>
      <td width="2%">:</td>
      <td>B+</td>
    </tr>
    <tr>
      <th className="w-1/3">Relation With Applicant</th>
      <td width="2%">:</td>
      <td>B+</td>
    </tr>
  </table>;