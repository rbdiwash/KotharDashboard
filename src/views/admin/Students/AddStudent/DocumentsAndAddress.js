import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import InputField from "components/Input/InputField";
import { useState } from "react";

const DocumentsAndAddress = ({ addressInfo, setAddressInfo }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name?.split(".")?.length > 1) {
      let key = name?.split(".")[0];
      let nestedKey = name?.split(".")[1];
      setAddressInfo((prevState) => ({
        ...prevState,
        [key]: { ...prevState?.[key], [nestedKey]: value },
      }));
    } else {
      setAddressInfo((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSameAsTemp = (e) => {
    if (e.target.checked) {
      setAddressInfo((prevState) => ({
        ...prevState,
        temp: {
          country: prevState?.permanent?.country,
          state: prevState?.permanent?.state,
          city: prevState?.permanent?.city,
          zip: prevState?.permanent?.zip,
        },
      }));
    } else {
      setAddressInfo((prevState) => ({
        ...prevState,
        temp: {
          country: null,
          state: null,
          city: null,
          zip: null,
        },
      }));
    }
  };

  return (
    <>
      <div className="sub-heading">Permanent Address:</div>

      <div className="grid grid-cols-3 gap-8 mt-2 items-end">
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Country"
            placeholder="Country"
            name="permanent.country"
            required
            type="text"
            value={addressInfo?.permanent?.country}
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
            value={addressInfo?.permanent?.state}
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
            value={addressInfo?.permanent?.city}
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
            value={addressInfo?.number}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="sub-heading">Temporary Address:</div>

      <FormControlLabel
        control={<Checkbox name="sameAsPermanent" />}
        label="Same as Permanent Address"
        onChange={handleSameAsTemp}
      />
      <div className="grid grid-cols-3 gap-8 mt-2 items-end">
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Country"
            placeholder="Country"
            name="temp.country"
            required
            type="text"
            value={addressInfo?.temp?.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="State/Province"
            name="temp.state"
            label="State/Province"
            required
            value={addressInfo?.temp?.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="City"
            name="temp.city"
            label="City"
            required
            value={addressInfo?.temp?.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="ZIP Code"
            placeholder="ZIP Code"
            name="temp.zip"
            required
            type="number"
            value={addressInfo?.temp?.zip}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="sub-heading">Passport Information:</div>

      <div className="grid grid-cols-3 gap-8 mt-6 items-end">
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Passport Number"
            placeholder="Passport Number"
            name="passport.number"
            required
            type="text"
            value={addressInfo?.passport?.number}
            onChange={handleInputChange}
          />
        </div>{" "}
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Country"
            name="passport.country"
            label="Country"
            required
            value={addressInfo?.passport?.country}
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
            value={addressInfo?.passport?.placeOfBirth}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            type="date"
            placeholder="Date of Issue"
            name="passport.issueDate"
            label="Date of Issue"
            required
            value={addressInfo?.passport?.issueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            type="date"
            placeholder="Expiry Date"
            name="passport.expiryDate"
            label="Expiry Date"
            required
            value={addressInfo?.passport?.expiryDate}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="sub-heading">Nationality:</div>

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
              value={addressInfo?.moreThanOneCitizen}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {addressInfo?.moreThanOneCitizen === "yes" && (
            <TextField
              fullWidth
              label="Name of the Country"
              placeholder="Name of the Country"
              name="secondCountryName"
              required
              type="text"
              value={addressInfo?.secondCountryName}
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
              value={addressInfo?.livingInAnotherCountry}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {addressInfo?.livingInAnotherCountry === "yes" && (
            <TextField
              fullWidth
              label="Name of the Country"
              placeholder="Name of the Country"
              name="secondLivingCountryName"
              required
              type="text"
              value={addressInfo?.secondLivingCountryName}
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
              value={addressInfo?.refusedFromAnyCountry}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {addressInfo?.refusedFromAnyCountry === "yes" && (
            <TextField
              fullWidth
              label="Name of the Country"
              placeholder="Mention the name of the Country"
              name="refusedCountryName"
              required
              type="text"
              value={addressInfo?.refusedCountryName}
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
              value={addressInfo?.seriousMedicalCondition}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {addressInfo?.seriousMedicalCondition === "yes" && (
            <TextField
              fullWidth
              label="Name of the Medical Condition"
              placeholder="Mention the name of the Condition"
              name="medicalCause"
              required
              type="text"
              value={addressInfo?.medicalCause}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Has the applicant ever been convicted of a criminal offense ?
            </FormLabel>
            <RadioGroup
              row
              name="criminalOffence"
              onChange={handleInputChange}
              value={addressInfo?.criminalOffence}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {addressInfo?.criminalOffence === "yes" && (
            <TextField
              fullWidth
              label="Cause of Criminal Offense"
              placeholder="Mention the Cause of Criminal Offense"
              name="causeOfCriminalOffence"
              required
              type="text"
              value={addressInfo?.causeOfCriminalOffence}
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
              value={addressInfo?.immigrationToOtherCountry}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {addressInfo?.immigrationToOtherCountry === "yes" && (
            <TextField
              fullWidth
              label="Name of the Country"
              placeholder="Mention the Name of the Country"
              name="immigratedCountry"
              required
              type="text"
              value={addressInfo?.immigratedCountry}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DocumentsAndAddress;
