import React from "react";

const GeneralInfo = ({ student }) => {
  return (
    <>
      <div className="my-4 grid grid-cols-12 gap-4">
        <div className="col-span-3 sub-heading mt-0">General Information</div>
        <div className="col-span-9">
          <div className="grid grid-cols-4 gap-4">
            <div className="w-full">
              <p className="heading">Name: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Email Address: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Mobile Number: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Gender: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Date of Birth: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
          </div>
          <div className="view-label mt-4">Emergency Contact Information:</div>
          <div className="grid grid-cols-4 gap-4">
            <div className="w-full">
              <p className="heading">Emergency Contact Name: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Emergency Email: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Emergency Contact Number: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Relation With Applicant: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;
