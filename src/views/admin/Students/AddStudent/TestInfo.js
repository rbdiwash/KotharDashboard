import { Autocomplete, TextField } from "@mui/material";
import InputField from "components/Input/InputField";
import { useState } from "react";

const TestInfo = (testInfo, setTestInfo) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestInfo((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSelectChange = (e, value) => {
    const { id } = e.target;
    setTestInfo((prevState) => ({ ...prevState, [id]: value }));
  };

  return (
    <div className="min-h-[300px]">
      <div className="sub-heading">Select Test:</div>
      <hr />
      <div className="grid grid-cols-4 gap-8 items-end mt-6 ">
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={(e, value) => {
              setTestInfo((prevState) => ({
                ...prevState,
                testName: value,
              }));
            }}
            required
            freeSolo
            disablePortal
            value={testInfo?.testName}
            id="testName"
            placeholder="Test Type"
            label="Test Type"
            options={[
              { label: "IELTS", value: "ielts" },
              { label: "PTE", value: "pte" },
              { label: "TOEFL", value: "toefl" },
              { label: "OET", value: "oet" },
              { label: "Duo Lingo", value: "duoLingo" },
              { label: "IELTS Waiver", value: "waiver" },
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Select Test Type" />
            )}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Overall Score"
            placeholder="Overall Score"
            name="score"
            required
            type="text"
            value={testInfo?.score}
            onChange={handleInputChange}
          />
        </div>

        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Unique ID"
            placeholder="Unique ID"
            name="uniqueId"
            required
            type="text"
            value={testInfo?.uniqueId}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            label="Date of Examination"
            placeholder="Date of Examination"
            name="doe"
            required
            type="date"
            value={testInfo?.doe}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {(testInfo?.testName?.value === "ielts" ||
        testInfo?.testName?.value === "pte" ||
        testInfo?.testName?.value === "waiver") && (
        <>
          <div className="grid grid-cols-4 gap-8 mt-6">
            <div className="relative w-full mb-3">
              <TextField
                fullWidth
                label="Speaking Score"
                placeholder="Speaking Score"
                name="speaking"
                required
                type="text"
                value={testInfo?.speaking}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative w-full mb-3">
              <TextField
                fullWidth
                label="Listening Score"
                placeholder="Listening Score"
                name="listening"
                required
                type="text"
                value={testInfo?.listening}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative w-full mb-3">
              <TextField
                fullWidth
                label="Reading Score"
                placeholder="Reading Score"
                name="reading"
                required
                type="text"
                value={testInfo?.reading}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative w-full mb-3">
              <TextField
                fullWidth
                label="Writing Score"
                placeholder="Writing Score"
                name="writing"
                required
                type="text"
                value={testInfo?.writing}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </>
      )}{" "}
      <div className="sub-heading">Select Test:</div>
      <hr />
      <div className="grid grid-cols-4 gap-8 items-end mt-6 ">
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={(e, value) => {
              setTestInfo((prevState) => ({
                ...prevState,
                testName2: value,
              }));
            }}
            required
            freeSolo
            disablePortal
            value={testInfo?.testName2}
            id="testName2"
            placeholder="Test Type"
            label="Test Type"
            options={[
              { label: "GRE", value: "gre" },
              { label: "GTE", value: "gte" },
              { label: "GMAT", value: "gmat" },
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Select Test Type" />
            )}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Overall Score"
            placeholder="Overall Score"
            name="score2"
            required
            type="text"
            value={testInfo?.score2}
            onChange={handleInputChange}
          />
        </div>

        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Unique ID"
            placeholder="Unique ID"
            name="uniqueId2"
            required
            type="text"
            value={testInfo?.uniqueId2}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            label="Date of Examination"
            placeholder="Date of Examination"
            name="doe2"
            required
            type="date"
            value={testInfo?.doe2}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TestInfo;
