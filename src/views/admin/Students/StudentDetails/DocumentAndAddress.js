import React from "react";

const DocumentAndAddress = ({ student }) => {
  return (
    <>
      <div className="my-4 grid grid-cols-12 gap-4">
        <div className="col-span-3 sub-heading mt-0">Documents and Address</div>
        <div className="col-span-9">
          <div className="view-label">Permanent Address</div>
          <div className="grid grid-cols-4 gap-4">
            <div className="w-full">
              <p className="heading">Country: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">State/Province: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">City: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">ZIP Code: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
          </div>
          <div className="view-label mt-4">Temporary Address</div>
          <div className="grid grid-cols-4 gap-4">
            <div className="w-full">
              <p className="heading">Country: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">State/Province: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">City: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">ZIP Code: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
          </div>
          <div className="view-label mt-4">Passport Information</div>
          <div className="grid grid-cols-4 gap-4">
            <div className="w-full">
              <p className="heading">Passport Number: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Country Issued: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Place of Birth: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Date of Issue: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Date of Expiry: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
          </div>
          <div className="view-label mt-4">Nationality Information</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <p className="heading">
                Is the applicant citizen of more than one country ?
              </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">
                Is the applicant living or studying in any other country ?
              </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">
                Does the student have any refusal from any other country ?
              </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">
                Does the student have any serious medical condition ?
              </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">
                Has the applicant ever been convicted of a criminal offense ?
              </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">
                Has the applicant applied into immigration into any other
                country?
              </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentAndAddress;
