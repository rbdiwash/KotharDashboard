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
    emergency: {
      name: "",
      contact: null,
      email: "",
      relation: "",
    },
  });
  console.log("🚀  data:", data);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name?.split("."));
    if (name?.split(".")?.length > 1) {
      let key = name?.split(".")[0];
      let nestedKey = name?.split(".")[1];
      setData((prevState) => ({
        ...prevState,
        [key]: { ...prevState?.[key], [nestedKey]: value },
      }));
    } else {
      console.log("🚀  name:", name);

      setData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <div className="grid grid-cols-3 gap-8 mt-6 items-end">
      <div className="relative w-full mb-3">
        <TextField
          fullWidth
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
        <TextField
          fullWidth
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
        <TextField
          fullWidth
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
      </div>{" "}
      <div className="relative w-full mb-3">
        <InputField
          fullWidth
          type="date"
          placeholder="Date of Birth"
          name="dob"
          label="Date of Birth"
          required
          value={data?.dob}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <Autocomplete
          disablePortal
          required
          size="medium"
          id="combo-box-demo"
          options={[
            { label: "Single", value: "single" },
            { label: "Married", value: "married" },
            { label: "Divorced", value: "divorced" },
          ]}
          renderInput={(params) => (
            <TextField {...params} label="Marital Status" />
          )}
        />
      </div>
      <div className="relative w-full mb-3">
        <TextField
          fullWidth
          required
          type="text"
          placeholder="Emergency Contact Name"
          name="emergency.name"
          label="Emergency Contact Name"
          value={data?.emergency?.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <TextField
          fullWidth
          required
          type="email"
          placeholder="Emergency Email"
          name="emergency.email"
          label="Emergency Email"
          value={data?.emergency?.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <TextField
          fullWidth
          required
          type="number"
          placeholder="Emergency Contact Number"
          name="emergency.contact"
          label="Emergency Contact Number"
          value={data?.emergency.contact}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <TextField
          fullWidth
          required
          type="text"
          placeholder="Relation With Applicant"
          name="emergency.relation"
          label="Relation With Applicant"
          value={data?.emergency?.relation}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default GeneralInfo;
