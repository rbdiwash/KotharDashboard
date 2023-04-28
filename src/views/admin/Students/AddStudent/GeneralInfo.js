import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import InputField from "components/Input/InputField";
import React, { useState } from "react";

const GeneralInfo = () => {
  const [data, setData] = useState({
    name: null,
    address: null,
    email: null,
    website: null,
    owner: null,
    panNumber: null,
    primaryContactNumber: null,
    secondaryContactNumber: null,
    logo: null,
    image: null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="grid grid-cols-3 gap-8 mt-6">
      <div className="relative w-full mb-3">
        <InputField
          label="Name"
          placeholder="Enter Full Name"
          name="name"
          required
          type="text"
          value={data?.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <InputField
          label="Mobile Number"
          placeholder="Mobile Number"
          name="number"
          required
          type="text"
          value={data?.number}
          onChange={handleInputChange}
        />
      </div>{" "}
      <div className="relative w-full mb-3">
        <InputField
          type="email"
          placeholder="Email Address"
          name="email"
          label="Email Address"
          required
          value={data?.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <InputField
          label="Age"
          placeholder="Age"
          name="age"
          required
          type="number"
          value={data?.age}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <FormControl>
          <FormLabel className="text-slate-600 uppercase text-xs font-bold mb-2">
            Gender
          </FormLabel>
          <RadioGroup
            row
            required
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />

            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="relative w-full mb-3">
        <InputField
          type="number"
          placeholder="PAN Number/ABN Number"
          name="panNumber"
          label="PAN Number/ABN Number"
          required
          value={data?.panNumber}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <InputField
          type="number"
          placeholder="Primary Contact Number"
          name="primaryContactNumber"
          label="Primary Contact Number"
          required
          value={data?.primaryContactNumber}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <InputField
          type="number"
          placeholder="Secondary Contact Number"
          name="secondaryContactNumber"
          label="Secondary Contact Number"
          value={data?.secondaryContactNumber}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <InputField
          label="Upload your Image"
          name="logo"
          // required
          type="file"
          value={data?.image}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default GeneralInfo;
