import {
  Autocomplete,
  Checkbox,
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

const DocumentsAndAddress = () => {
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

  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    setData((prevState) => ({ ...prevState, [name]: checked }));
  };
  return (
    <>
      <div className="sub-heading">Permanent Address:</div>
      <hr />
      <div className="grid grid-cols-3 gap-8 mt-6 items-end">
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Country"
            placeholder="Country"
            name="permanent.country"
            required
            type="text"
            value={data?.permanent?.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Issue Date"
            name="permanent.state"
            label="State/Province"
            required
            value={data?.permanent?.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="City"
            name="permanent.city"
            label="City"
            required
            value={data?.permanent?.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="ZIP Code"
            placeholder="ZIP Code"
            name="permanent.zip"
            required
            type="number"
            value={data?.number}
            onChange={handleInputChange}
          />
        </div>{" "}
      </div>{" "}
      <div className="sub-heading">Temporary Address:</div>
      <hr />
      <FormControlLabel
        control={<Checkbox name="sameAsPermanent" />}
        label="Same as Permanent Address"
        onChange={handleCheckBox}
      />
      <div className="grid grid-cols-3 gap-8 mt-2 items-end">
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Country"
            placeholder="Country"
            name="permanent.country"
            required
            type="text"
            value={data?.permanent?.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="State/Province"
            name="permanent.state"
            label="State/Province"
            required
            value={data?.permanent?.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="City"
            name="permanent.city"
            label="City"
            required
            value={data?.permanent?.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="ZIP Code"
            placeholder="ZIP Code"
            name="permanent.zip"
            required
            type="number"
            value={data?.number}
            onChange={handleInputChange}
          />
        </div>{" "}
      </div>{" "}
      <div className="sub-heading">Passport Information:</div>
      <hr />
      <div className="grid grid-cols-3 gap-8 mt-6 items-end">
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Passport Number"
            placeholder="Passport Number"
            name="passport.number"
            required
            type="text"
            value={data?.passport?.number}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Issue Date"
            name="passport.issueDate"
            label="Issue Date"
            required
            value={data?.passport?.issueDate}
            onChange={handleInputChange}
          />
        </div>{" "}
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Expiry Date"
            name="passport.expiryDate"
            label="Expiry Date"
            required
            value={data?.passport?.expiryDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="City"
            name="permanent.city"
            label="City"
            required
            value={data?.permanent?.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="ZIP Code"
            placeholder="ZIP Code"
            name="permanent.zip"
            required
            type="number"
            value={data?.number}
            onChange={handleInputChange}
          />
        </div>{" "}
      </div>
    </>
  );
};

export default DocumentsAndAddress;
