import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import InputField from "components/Input/InputField";
import SelectField from "components/Input/SelectField";
import React, { useState } from "react";

const OtherInfo = () => {
  const [data, setData] = useState({
    board: "",
    address: null,
    email: null,
    website: null,
    owner: null,
    panNumber: null,
    primaryContactNumber: null,
    secondaryContactNumber: null,
    testName: null,
    image: null,
  });
  console.log("🚀  data:", data);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSelectChange = (e, value) => {
    console.log(e);
    const { name } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <div className="sub-heading">Select Test:</div>
      <hr />
      <div className="grid grid-cols-3 gap-8 mt-6">
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={handleSelectChange}
            required
            disablePortal
            value={data?.testName}
            name="testName"
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
            value={data?.score}
            onChange={handleInputChange}
          />
        </div>
        {data?.testName === "ielts" ||
          data?.testName === "pte" ||
          (data?.testName === "waiver" && (
            <>
              <div className="grid grid-cols-4 gap-8 mt-6">
                {" "}
                <div className="relative w-full mb-3">
                  <TextField
                    fullWidth
                    label="Speaking"
                    placeholder="Speaking"
                    name="uniqueId"
                    required
                    type="text"
                    value={data?.uniqueId}
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
                    value={data?.uniqueId}
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
                    value={data?.uniqueId}
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
                    value={data?.uniqueId}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </>
          ))}
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Unique ID"
            placeholder="Unique ID"
            name="uniqueId"
            required
            type="text"
            value={data?.uniqueId}
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
            value={data?.doe}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default OtherInfo;
