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

const AcademicInfo = () => {
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
    <>
      <div className="sub-heading">Grade 10th or Equivalent:</div>
      <hr />
      <div className="grid grid-cols-3 gap-8 mt-6">
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={handleInputChange}
            required
            value={data?.tenth?.board}
            name="10th.board"
            placeholder="Name of Board"
            label="Name of Board"
            defaultValue="Name of Board"
            options={[
              { label: "NEB", value: "neb" },
              { label: "HSEB", value: "hseb" },
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Select Board" />
            )}
          />
        </div>
        <div className="relative col-span-2 w-full mb-3">
          <TextField
            fullWidth
            label="Name of the Institution"
            placeholder="Name of the Institution"
            name="10th.number"
            required
            type="text"
            value={data?.tenth?.number}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Primary medium of Instruction"
            placeholder="Primary medium of Instruction"
            name="10th.primaryMediumOfInstruction"
            required
            type="text"
            value={data?.tenth?.primaryMediumOfInstruction}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Country of Study"
            placeholder="Country of Study"
            name="10th.countryOfStudy"
            required
            type="text"
            value={data?.tenth?.countryOfStudy}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="State of study"
            placeholder="State of study"
            name="10th.stateOfStudy"
            required
            type="text"
            value={data?.tenth?.stateOfStudy}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <Autocomplete
            // onChange={handleInputChange}
            required
            disablePortal
            size="medium"
            id="combo-box-demo"
            options={[
              { label: "GPA", value: "gpa" },
              { label: "Percentage", value: "percentage" },
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Grading System" />
            )}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Score"
            placeholder="Score"
            name="10th.score"
            required
            type="text"
            value={data?.tenth?.score}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Your Score Out Of"
            name="10th.scoreOutOf"
            label="Out Of"
            required
            value={data?.tenth?.scoreOutOf}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Passout year"
            placeholder="Passout year"
            name="10th.passsOutYear"
            required
            type="number"
            value={data?.tenth?.passsOutYear}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Degree"
            name="10th.degree"
            label="Degree"
            required
            value={data?.tenth?.degree}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Degree title"
            name="10th.degreeTitle"
            label="Degree title"
            required
            value={data?.tenth?.degreeTitle}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="sub-heading">+2 or Equivalent:</div>
      <hr />
      <div className="grid grid-cols-3 gap-8 mt-6">
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={handleInputChange}
            required
            value={data?.higher?.board}
            name="higher.board"
            placeholder="Name of Board"
            label="Name of Board"
            defaultValue="Name of Board"
            options={[
              { label: "NEB", value: "neb" },
              { label: "HSEB", value: "hseb" },
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Select Board" />
            )}
          />
        </div>
        <div className="relative col-span-2 w-full mb-3">
          <TextField
            fullWidth
            label="Name of the Institution"
            placeholder="Name of the Institution"
            name="higher.number"
            required
            type="text"
            value={data?.higher?.number}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Primary medium of Instruction"
            placeholder="Primary medium of Instruction"
            name="higher.primaryMediumOfInstruction"
            required
            type="text"
            value={data?.higher?.primaryMediumOfInstruction}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Country of Study"
            placeholder="Country of Study"
            name="higher.countryOfStudy"
            required
            type="text"
            value={data?.higher?.countryOfStudy}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="State of study"
            placeholder="State of study"
            name="higher.stateOfStudy"
            required
            type="text"
            value={data?.higher?.stateOfStudy}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <Autocomplete
            // onChange={handleInputChange}
            required
            disablePortal
            size="medium"
            id="combo-box-demo"
            options={[
              { label: "GPA", value: "gpa" },
              { label: "Percentage", value: "percentage" },
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Grading System" />
            )}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Score"
            placeholder="Score"
            name="higher.tenthScore"
            required
            type="text"
            value={data?.higher?.tenthScore}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Your Score Out Of"
            name="higher.email"
            label="Out Of"
            required
            value={data?.higher?.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Passout year"
            placeholder="Passout year"
            name="higher.passsOutYear"
            required
            type="number"
            value={data?.higher?.passsOutYear}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Degree"
            name="higher.degree"
            label="Degree"
            required
            value={data?.higher?.degree}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Degree title"
            name="higher.degreeTitle"
            label="Degree title"
            required
            value={data?.higher?.degreeTitle}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="sub-heading">Bachelor or Equivalent:</div>
      <hr />
      <div className="grid grid-cols-3 gap-8 mt-6">
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={handleInputChange}
            value={data?.bachelor?.board}
            name="bachelor.board"
            placeholder="Name of Board"
            label="Name of Board"
            defaultValue="Name of Board"
            options={[
              { label: "NEB", value: "neb" },
              { label: "HSEB", value: "hseb" },
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Select Board" />
            )}
          />
        </div>
        <div className="relative col-span-2 w-full mb-3">
          <TextField
            fullWidth
            label="Name of the Institution"
            placeholder="Name of the Institution"
            name="bachelor.number"
            type="text"
            value={data?.bachelor?.number}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Primary medium of Instruction"
            placeholder="Primary medium of Instruction"
            name="bachelor.primaryMediumOfInstruction"
            type="text"
            value={data?.bachelor?.primaryMediumOfInstruction}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Country of Study"
            placeholder="Country of Study"
            name="bachelor.countryOfStudy"
            type="text"
            value={data?.bachelor?.countryOfStudy}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="State of study"
            placeholder="State of study"
            name="bachelor.stateOfStudy"
            type="text"
            value={data?.bachelor?.stateOfStudy}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <Autocomplete
            // onChange={handleInputChange}

            disablePortal
            size="medium"
            id="combo-box-demo"
            options={[
              { label: "GPA", value: "gpa" },
              { label: "Percentage", value: "percentage" },
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Grading System" />
            )}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Score"
            placeholder="Score"
            name="bachelor.tenthScore"
            type="text"
            value={data?.bachelor?.tenthScore}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Your Score Out Of"
            name="bachelor.email"
            label="Out Of"
            value={data?.bachelor?.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Passout year"
            placeholder="Passout year"
            name="bachelor.passsOutYear"
            type="number"
            value={data?.bachelor?.passsOutYear}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Degree"
            name="bachelor.degree"
            label="Degree"
            value={data?.bachelor?.degree}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Degree title"
            name="bachelor.degreeTitle"
            label="Degree title"
            value={data?.bachelor?.degreeTitle}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default AcademicInfo;

{
  /* {data?.identificationType && (
          <>
            <div className="relative w-full mb-3">
              <InputField
                label={
                  data?.identificationType === "citizenship"
                    ? "Citizenship Number"
                    : data?.identificationType === "passport"
                    ? "Passport Number"
                    : "Licence Number"
                }
                placeholder={
                  data?.identificationType === "citizenship"
                    ? "Citizenship Number"
                    : data?.identificationType === "passport"
                    ? "Passport Number"
                    : "Licence Number"
                }
                name={
                  data?.identificationType === "passport"
                    ? "passportNumber"
                    : "identificationNumber"
                }
                required
                type="text"
                value={data?.identificationNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative w-full mb-3">
              <InputField
                label="Nationality"
                placeholder="Nationality"
                name="nationality"
                required
                type="text"
                value={data?.nationality}
                onChange={handleInputChange}
              />
            </div>
          </>
        )} */
}
//  <div className="grid grid-cols-3 gap-8 mt-6">
//    <div className="relative w-full mb-3">
//      <SelectField
//        onChange={handleInputChange}
//        required
//        value={data?.identificationType}
//        name="identificationType"
//        placeholder="Select Document"
//        label="Select Document"
//        defaultValue="Select Document Type"
//        options={[
//          { name: "Citizenship", id: "citizenship" },
//          { name: "Passport", id: "passport" },
//          { name: "Licence", id: "licence" },
//        ]}
//      />
//    </div>
//    {data?.identificationType && (
//      <>
//        <div className="relative w-full mb-3">
//          <InputField
//            label={
//              data?.identificationType === "citizenship"
//                ? "Citizenship Number"
//                : data?.identificationType === "passport"
//                ? "Passport Number"
//                : "Licence Number"
//            }
//            placeholder={
//              data?.identificationType === "citizenship"
//                ? "Citizenship Number"
//                : data?.identificationType === "passport"
//                ? "Passport Number"
//                : "Licence Number"
//            }
//            name={
//              data?.identificationType === "passport"
//                ? "passportNumber"
//                : "identificationNumber"
//            }
//            required
//            type="text"
//            value={data?.identificationNumber}
//            onChange={handleInputChange}
//          />
//        </div>
//        <div className="relative w-full mb-3">
//          <InputField
//            label="Nationality"
//            placeholder="Nationality"
//            name="nationality"
//            required
//            type="text"
//            value={data?.nationality}
//            onChange={handleInputChange}
//          />
//        </div>
//      </>
//    )}
//    <div className="relative w-full mb-3">
//      <InputField
//        label="Mobile Number"
//        placeholder="Mobile Number"
//        name="number"
//        required
//        type="text"
//        value={data?.number}
//        onChange={handleInputChange}
//      />
//    </div>
//    <div className="relative w-full mb-3">
//      <InputField
//        type="email"
//        placeholder="Email Address"
//        name="email"
//        label="Email Address"
//        required
//        value={data?.email}
//        onChange={handleInputChange}
//      />
//    </div>
//    <div className="relative w-full mb-3">
//      <InputField
//        label="Age"
//        placeholder="Age"
//        name="age"
//        required
//        type="number"
//        value={data?.age}
//        onChange={handleInputChange}
//      />
//    </div>
//    <div className="relative w-full mb-3">
//      <FormControl>
//        <FormLabel className="text-slate-600 uppercase text-xs font-bold mb-2">
//          Gender
//        </FormLabel>
//        <RadioGroup
//          row
//          required
//          defaultValue="female"
//          name="radio-buttons-group"
//        >
//          <FormControlLabel value="male" control={<Radio />} label="Male" />

//          <FormControlLabel value="female" control={<Radio />} label="Female" />
//          <FormControlLabel value="other" control={<Radio />} label="Other" />
//        </RadioGroup>
//      </FormControl>
//    </div>
//    <div className="relative w-full mb-3">
//      <InputField
//        type="number"
//        placeholder="PAN Number/ABN Number"
//        name="panNumber"
//        label="PAN Number/ABN Number"
//        required
//        value={data?.panNumber}
//        onChange={handleInputChange}
//      />
//    </div>
//    <div className="relative w-full mb-3">
//      <InputField
//        type="number"
//        placeholder="Primary Contact Number"
//        name="primaryContactNumber"
//        label="Primary Contact Number"
//        required
//        value={data?.primaryContactNumber}
//        onChange={handleInputChange}
//      />
//    </div>
//    <div className="relative w-full mb-3">
//      <InputField
//        type="number"
//        placeholder="Secondary Contact Number"
//        name="secondaryContactNumber"
//        label="Secondary Contact Number"
//        value={data?.secondaryContactNumber}
//        onChange={handleInputChange}
//      />
//    </div>
//    <div className="relative w-full mb-3">
//      <InputField
//        label="Upload your Image"
//        name="logo"
//        // required
//        type="file"
//        value={data?.image}
//        onChange={handleInputChange}
//      />
//    </div>
//  </div>;
