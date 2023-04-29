import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";

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
        </div>
      </div>
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
        </div>
      </div>
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
            placeholder="Date of Issue"
            name="passport.issueDate"
            label="Date of Issue"
            required
            value={data?.passport?.issueDate}
            onChange={handleInputChange}
          />
        </div>
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
            placeholder="Country"
            name="passport.country"
            label="Country"
            required
            value={data?.passport?.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Place of Birth"
            placeholder="Place of Birth"
            name="passport.placeOfBirth"
            required
            type="text"
            value={data?.passport?.placeOfBirth}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="sub-heading">Nationality:</div>
      <hr />
      <div className="grid grid-cols-2 gap-8 mt-6 items-start">
        <div>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Is the applicant citizen of more than one country ?
            </FormLabel>
            <RadioGroup
              row
              name="moreThanOneCitizen"
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {data?.moreThanOneCitizen === "yes" && (
            <TextField
              fullWidth
              label="Name of the Country"
              placeholder="Name of the Country"
              name="secondCountryName"
              required
              type="text"
              value={data?.secondCountryName}
              onChange={handleInputChange}
            />
          )}
        </div>{" "}
        <div>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Is the applicant living or studying in any other country ?
            </FormLabel>
            <RadioGroup
              row
              name="livingInAnotherCountry"
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {data?.livingInAnotherCountry === "yes" && (
            <TextField
              fullWidth
              label="Name of the Country"
              placeholder="Name of the Country"
              name="secondLivingCountryName"
              required
              type="text"
              value={data?.secondLivingCountryName}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Does the student have any refusal from any other country ?
            </FormLabel>
            <RadioGroup
              row
              name="refusedFromAnyCountry"
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {data?.refusedFromAnyCountry === "yes" && (
            <TextField
              fullWidth
              label="Name of the Country"
              placeholder="Mention the name of the Country"
              name="refusedCountryName"
              required
              type="text"
              value={data?.refusedCountryName}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Does the student have any serious medical condition ?
            </FormLabel>
            <RadioGroup
              row
              name="seriousMedicalCondition"
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {data?.seriousMedicalCondition === "yes" && (
            <TextField
              fullWidth
              label="Name of the Medical Condition"
              placeholder="Mention the name of the Condition"
              name="medicalCause"
              required
              type="text"
              value={data?.medicalCause}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Has the applicant ever been convicted of a criminal offense ?
            </FormLabel>
            <RadioGroup row name="criminalOffence" onChange={handleInputChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {data?.criminalOffence === "yes" && (
            <TextField
              fullWidth
              label="Cause of Criminal Offense"
              placeholder="Mention the Cause of Criminal Offense"
              name="criminalOffence"
              required
              type="text"
              value={data?.criminalOffence}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Has the applicant applied into immigration into any other country?
            </FormLabel>
            <RadioGroup
              row
              name="immigrationToOtherCountry"
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {data?.immigrationToOtherCountry === "yes" && (
            <TextField
              fullWidth
              label="Name of the Country"
              placeholder="Mention the Name of the Country"
              name="immigratedCountry"
              required
              type="text"
              value={data?.immigratedCountry}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DocumentsAndAddress;
