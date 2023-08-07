import React from "react";

const AcademicQualification = ({ student }) => {
  return (
    <>
      <div className="my-4 grid grid-cols-12 gap-4">
        <div className="col-span-3 sub-heading mt-0">
          Academic Qualification
        </div>
        <div className="col-span-9">
          <div className="view-label">Grade 10th or Equivalent</div>
          <div className="grid grid-cols-4 gap-4">
            <div className="w-full">
              <p className="heading">Board: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Name of Institution: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Primary Medium of Instruction:</p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Course of Study: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">State of Study: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
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
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Degree: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Degree title: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
          </div>
          <div className="view-label mt-4">+2 OR EQUIVALENT</div>
          <div className="grid grid-cols-4 gap-4">
            <div className="w-full">
              <p className="heading">Board: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Name of Institution: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Primary Medium of Instruction:</p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Course of Study: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">State of Study: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
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
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Degree: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Degree title: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
          </div>
          <div className="view-label mt-4">BACHELOR OR EQUIVALENT:</div>
          <div className="grid grid-cols-4 gap-4">
            <div className="w-full">
              <p className="heading">Board: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Name of Institution: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Primary Medium of Instruction:</p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Course of Study: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">State of Study: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
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
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Degree: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
            <div className="w-full">
              <p className="heading">Degree title: </p>
              <p className="detail">{student?.name || "Student Name"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademicQualification;
