import { Autocomplete, TextField } from "@mui/material";
import InputField from "components/Input/InputField";
import UploadFile from "components/Input/UploadFile";
import { useState } from "react";

const TestInfo = ({ testInfo, setTestInfo }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="min-h-[300px]">
      <div className="sub-heading">Select Test:</div>
      <div className="grid grid-cols-4 gap-8 items-end mt-2 ">
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={(e, value) => {
              setTestInfo((prevState) => ({
                ...prevState,
                testName1: value,
              }));
            }}
            required
            value={testInfo?.testName1}
            label="Test Type"
            options={[
              { label: "IELTS", value: "ielts" },
              { label: "PTE", value: "pte" },
              { label: "TOEFL", value: "toefl" },
              { label: "OET", value: "oet" },
              { label: "Duo Lingo", value: "duoLingo" },
              { label: "IELTS Waiver", value: "waiver" },
            ]}
            isOptionEqualToValue={(options, value) =>
              options.value === value.value
            }
            disablePortal
            renderInput={(params) => (
              <TextField {...params} label="Select Test Type" />
            )}
            size="small"
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            size="small"
            label="Overall Score"
            placeholder="Overall Score"
            name="score1"
            required
            type="text"
            value={testInfo?.score1}
            onChange={handleInputChange}
          />
        </div>

        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            size="small"
            label="Unique ID"
            placeholder="Unique ID"
            name="uniqueId1"
            required
            type="text"
            value={testInfo?.uniqueId1}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            label="Date of Examination"
            placeholder="Date of Examination"
            name="doe1"
            required
            type="date"
            value={testInfo?.doe1}
            onChange={handleInputChange}
          />
        </div>
        <UploadFile
          {...{
            data: testInfo,
            setData: setTestInfo,
            label: "Documents",
            imageKey: "document1",
          }}
        />
      </div>
      {(testInfo?.testName1?.value === "ielts" ||
        testInfo?.testName1?.value === "pte" ||
        testInfo?.testName1?.value === "waiver") && (
        <>
          <div className="grid grid-cols-4 gap-8 mt-2">
            <div className="relative w-full mb-3">
              <InputField
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
              <InputField
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
              <InputField
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
              <InputField
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
      )}

      <div className="sub-heading">Select Test:</div>
      <div className="grid grid-cols-4 gap-8 items-end mt-2 ">
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={(e, value) => {
              setTestInfo((prevState) => ({
                ...prevState,
                testName2: value,
              }));
            }}
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
            isOptionEqualToValue={(options, value) =>
              options.value === value.value
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Test Type" />
            )}
            size="small"
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            size="small"
            label="Overall Score"
            placeholder="Overall Score"
            name="score2"
            type="text"
            value={testInfo?.score2}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            size="small"
            label="Unique ID"
            placeholder="Unique ID"
            name="uniqueId2"
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
            type="date"
            value={testInfo?.doe2}
            onChange={handleInputChange}
          />
        </div>{" "}
        <UploadFile
          {...{
            data: testInfo,
            setData: setTestInfo,
            label: "Documents",
            imageKey: "document2",
          }}
        />
      </div>
    </div>
  );
};

export default TestInfo;
