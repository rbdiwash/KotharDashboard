import { Autocomplete, TextField } from "@mui/material";

const AcademicInfo = ({ academicInfo, setAcademicInfo }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name?.split(".")?.length > 1) {
      let key = name?.split(".")[0];
      let nestedKey = name?.split(".")[1];
      setAcademicInfo((prevState) => ({
        ...prevState,
        [key]: { ...prevState?.[key], [nestedKey]: value },
      }));
    } else {
      setAcademicInfo((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <>
      <div className="sub-heading">Grade 10th or Equivalent:</div>
      <hr />
      <div className="grid grid-cols-3 gap-8 mt-6">
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={(e, value) => {
              setAcademicInfo((prevState) => ({
                ...prevState,
                tenth: { ...prevState.tenth, board: value },
              }));
            }}
            required
            value={academicInfo?.tenth?.board}
            name="tenth.board"
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
            name="tenth.nameOfSchool"
            required
            type="text"
            value={academicInfo?.tenth?.nameOfSchool}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Primary medium of Instruction"
            placeholder="Primary medium of Instruction"
            name="tenth.primaryMediumOfInstruction"
            required
            type="text"
            value={academicInfo?.tenth?.primaryMediumOfInstruction}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Country of Study"
            placeholder="Country of Study"
            name="tenth.countryOfStudy"
            required
            type="text"
            value={academicInfo?.tenth?.countryOfStudy}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="State of study"
            placeholder="State of study"
            name="tenth.stateOfStudy"
            required
            type="text"
            value={academicInfo?.tenth?.stateOfStudy}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={(e, value) => {
              setAcademicInfo((prevState) => ({
                ...prevState,
                tenth: { ...prevState.tenth, gradingSystem: value },
              }));
            }}
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
            name="tenth.score"
            required
            type="text"
            value={academicInfo?.tenth?.score}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Your Score Out Of"
            name="tenth.scoreOutOf"
            label="Out Of"
            required
            value={academicInfo?.tenth?.scoreOutOf}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            label="Passout year"
            placeholder="Passout year"
            name="tenth.passsOutYear"
            required
            type="number"
            value={academicInfo?.tenth?.passsOutYear}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Degree"
            name="tenth.degree"
            label="Degree"
            required
            value={academicInfo?.tenth?.degree}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <TextField
            fullWidth
            type="text"
            placeholder="Degree title"
            name="tenth.degreeTitle"
            label="Degree title"
            required
            value={academicInfo?.tenth?.degreeTitle}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="sub-heading">+2 or Equivalent:</div>
      <hr />
      <div className="grid grid-cols-3 gap-8 mt-6">
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={(e, value) => {
              setAcademicInfo((prevState) => ({
                ...prevState,
                higher: { ...prevState.higher, board: value },
              }));
            }}
            required
            value={academicInfo?.higher?.board}
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
            value={academicInfo?.higher?.number}
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
            value={academicInfo?.higher?.primaryMediumOfInstruction}
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
            value={academicInfo?.higher?.countryOfStudy}
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
            value={academicInfo?.higher?.stateOfStudy}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={(e, value) => {
              setAcademicInfo((prevState) => ({
                ...prevState,
                higher: { ...prevState.higher, gradingSystem: value },
              }));
            }}
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
            value={academicInfo?.higher?.tenthScore}
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
            value={academicInfo?.higher?.email}
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
            value={academicInfo?.higher?.passsOutYear}
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
            value={academicInfo?.higher?.degree}
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
            value={academicInfo?.higher?.degreeTitle}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="sub-heading">Bachelor or Equivalent:</div>
      <hr />
      <div className="grid grid-cols-3 gap-8 mt-6">
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={(e, value) => {
              setAcademicInfo((prevState) => ({
                ...prevState,
                higher: { ...prevState.bachelor, board: value },
              }));
            }}
            value={academicInfo?.bachelor?.board}
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
            value={academicInfo?.bachelor?.number}
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
            value={academicInfo?.bachelor?.primaryMediumOfInstruction}
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
            value={academicInfo?.bachelor?.countryOfStudy}
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
            value={academicInfo?.bachelor?.stateOfStudy}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <Autocomplete
            onChange={(e, value) => {
              setAcademicInfo((prevState) => ({
                ...prevState,
                bachelor: { ...prevState.bachelor, gradingSystem: value },
              }));
            }}
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
            value={academicInfo?.bachelor?.tenthScore}
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
            value={academicInfo?.bachelor?.email}
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
            value={academicInfo?.bachelor?.passsOutYear}
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
            value={academicInfo?.bachelor?.degree}
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
            value={academicInfo?.bachelor?.degreeTitle}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default AcademicInfo;

{
  /* {academicInfo?.identificationType && (
          <>
            <div className="relative w-full mb-3">
              <InputField
                label={
                  academicInfo?.identificationType === "citizenship"
                    ? "Citizenship Number"
                    : academicInfo?.identificationType === "passport"
                    ? "Passport Number"
                    : "Licence Number"
                }
                placeholder={
                  academicInfo?.identificationType === "citizenship"
                    ? "Citizenship Number"
                    : academicInfo?.identificationType === "passport"
                    ? "Passport Number"
                    : "Licence Number"
                }
                name={
                  academicInfo?.identificationType === "passport"
                    ? "passportNumber"
                    : "identificationNumber"
                }
                required
                type="text"
                value={academicInfo?.identificationNumber}
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
                value={academicInfo?.nationality}
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
//        value={academicInfo?.identificationType}
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
//    {academicInfo?.identificationType && (
//      <>
//        <div className="relative w-full mb-3">
//          <InputField
//            label={
//              academicInfo?.identificationType === "citizenship"
//                ? "Citizenship Number"
//                : academicInfo?.identificationType === "passport"
//                ? "Passport Number"
//                : "Licence Number"
//            }
//            placeholder={
//              academicInfo?.identificationType === "citizenship"
//                ? "Citizenship Number"
//                : academicInfo?.identificationType === "passport"
//                ? "Passport Number"
//                : "Licence Number"
//            }
//            name={
//              academicInfo?.identificationType === "passport"
//                ? "passportNumber"
//                : "identificationNumber"
//            }
//            required
//            type="text"
//            value={academicInfo?.identificationNumber}
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
//            value={academicInfo?.nationality}
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
//        value={academicInfo?.number}
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
//        value={academicInfo?.email}
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
//        value={academicInfo?.age}
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
//        value={academicInfo?.panNumber}
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
//        value={academicInfo?.primaryContactNumber}
//        onChange={handleInputChange}
//      />
//    </div>
//    <div className="relative w-full mb-3">
//      <InputField
//        type="number"
//        placeholder="Secondary Contact Number"
//        name="secondaryContactNumber"
//        label="Secondary Contact Number"
//        value={academicInfo?.secondaryContactNumber}
//        onChange={handleInputChange}
//      />
//    </div>
//    <div className="relative w-full mb-3">
//      <InputField
//        label="Upload your Image"
//        name="logo"
//        // required
//        type="file"
//        value={academicInfo?.image}
//        onChange={handleInputChange}
//      />
//    </div>
//  </div>;
