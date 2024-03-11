import { Delete } from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";
import InputField from "components/Input/InputField";
import pdf from "../../../../assets/img/pdf.png";
import UploadFile from "components/Input/UploadFile";

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
          <label className="input-label">Select Board *</label>

          <Autocomplete
            onChange={(e, value) => {
              setAcademicInfo((prevState) => ({
                ...prevState,
                tenth: { ...prevState.tenth, board: value },
              }));
            }}
            required
            value={academicInfo?.tenth?.board || null}
            name="tenth.board"
            options={[
              { label: "NEB", value: "neb" },
              { label: "HSEB", value: "hseb" },
            ]}
            isOptionEqualToValue={(options, value) =>
              options.value === value.value
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Board" />
            )}
            size="small"
          />
        </div>
        <div className="relative col-span-2 w-full mb-3">
          <InputField
            fullWidth
            size="small"
            label="Name of the Institution"
            placeholder="Name of the Institution"
            name="tenth.name"
            required
            type="text"
            value={academicInfo?.tenth?.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            size="small"
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
          <InputField
            fullWidth
            size="small"
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
          <InputField
            fullWidth
            size="small"
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
          <label className="input-label">Select Grading System *</label>

          <Autocomplete
            onChange={(e, value) => {
              setAcademicInfo((prevState) => ({
                ...prevState,
                tenth: { ...prevState.tenth, gradingSystem: value },
              }));
            }}
            isOptionEqualToValue={(options, value) =>
              options.value === value.value
            }
            value={academicInfo?.tenth?.gradingSystem || null}
            required
            disablePortal
            options={[
              { label: "GPA", value: "gpa" },
              { label: "Percentage", value: "percentage" },
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Grading System" />
            )}
            size="small"
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            size="small"
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
          <InputField
            fullWidth
            size="small"
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
          <InputField
            fullWidth
            size="small"
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
          <InputField
            fullWidth
            size="small"
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
          <InputField
            fullWidth
            size="small"
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
      <UploadFile
        {...{
          data: academicInfo,
          setData: setAcademicInfo,
          label: "All Academic Documents(multiple)",
          imageKey: "tenthDocuments",
          type: "multiple",
        }}
      />
      <div className="sub-heading">+2 or Equivalent:</div>
      <hr />
      <div className="grid grid-cols-3 gap-8 mt-6">
        <div className="relative w-full mb-3">
          <label className="input-label">Select Board *</label>

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
            isOptionEqualToValue={(options, value) =>
              options.value === value.value
            }
            options={[
              { label: "NEB", value: "neb" },
              { label: "HSEB", value: "hseb" },
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Select Board" />
            )}
            size="small"
          />
        </div>
        <div className="relative col-span-2 w-full mb-3">
          <InputField
            fullWidth
            size="small"
            label="Name of the Institution"
            placeholder="Name of the Institution"
            name="higher.name"
            required
            type="text"
            value={academicInfo?.higher?.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            size="small"
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
          <InputField
            fullWidth
            size="small"
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
          <InputField
            fullWidth
            size="small"
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
          <label className="input-label">Select Grading System *</label>

          <Autocomplete
            size="small"
            onChange={(e, value) => {
              setAcademicInfo((prevState) => ({
                ...prevState,
                higher: { ...prevState.higher, gradingSystem: value },
              }));
            }}
            required
            disablePortal
            options={[
              { label: "GPA", value: "gpa" },
              { label: "Percentage", value: "percentage" },
            ]}
            isOptionEqualToValue={(options, value) =>
              options.value === value.value
            }
            renderInput={(params) => (
              <TextField {...params} label="Grading System" />
            )}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            size="small"
            label="Score"
            placeholder="Score"
            name="higher.score"
            required
            type="text"
            value={academicInfo?.higher?.score}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            size="small"
            type="text"
            placeholder="Your Score Out Of"
            name="higher.scoreOutOf"
            label="Out Of"
            required
            value={academicInfo?.higher?.scoreOutOf}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            size="small"
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
          <InputField
            size="small"
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
          <InputField
            size="small"
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
      </div>{" "}
      <UploadFile
        {...{
          data: academicInfo,
          setData: setAcademicInfo,
          label: "All Academic Documents(multiple)",
          imageKey: "higherDocuments",
          type: "multiple",
        }}
      />
      <div className="sub-heading">Bachelor or Equivalent:</div>
      <hr />
      <div className="grid grid-cols-3 gap-8 mt-6">
        <div className="relative w-full mb-3">
          <label className="input-label">Select Board *</label>

          <Autocomplete
            size="small"
            onChange={(e, value) => {
              setAcademicInfo((prevState) => ({
                ...prevState,
                bachelor: { ...prevState.bachelor, board: value },
              }));
            }}
            isOptionEqualToValue={(options, value) =>
              options.value === value.value
            }
            value={academicInfo?.bachelor?.board}
            name="bachelor.board"
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
          <InputField
            fullWidth
            size="small"
            label="Name of the Institution"
            placeholder="Name of the Institution"
            name="bachelor.name"
            type="text"
            value={academicInfo?.bachelor?.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            size="small"
            label="Primary medium of Instruction"
            placeholder="Primary medium of Instruction"
            name="bachelor.primaryMediumOfInstruction"
            type="text"
            value={academicInfo?.bachelor?.primaryMediumOfInstruction}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            size="small"
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
          <InputField
            size="small"
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
          <label className="input-label">Select Grading System *</label>

          <Autocomplete
            size="small"
            onChange={(e, value) => {
              setAcademicInfo((prevState) => ({
                ...prevState,
                bachelor: {
                  ...prevState.bachelor,
                  gradingSystem: value,
                },
              }));
            }}
            disablePortal
            options={[
              { label: "GPA", value: "gpa" },
              { label: "Percentage", value: "percentage" },
            ]}
            isOptionEqualToValue={(options, value) =>
              options.value === value.value
            }
            renderInput={(params) => (
              <TextField {...params} label="Grading System" />
            )}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            size="small"
            label="Score"
            placeholder="Score"
            name="bachelor.score"
            type="text"
            value={academicInfo?.bachelor?.score}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            size="small"
            type="text"
            placeholder="Your Score Out Of"
            name="bachelor.scoreOutOf"
            label="Out Of"
            value={academicInfo?.bachelor?.scoreOutOf}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            size="small"
            label="Passout year"
            placeholder="Passout year"
            name="bachelor.passsOutYear"
            type="number"
            value={academicInfo?.bachelor?.passsOutYear}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            size="small"
            type="text"
            placeholder="Degree"
            name="bachelor.degree"
            label="Degree"
            value={academicInfo?.bachelor?.degree}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <InputField
            fullWidth
            type="text"
            size="small"
            placeholder="Degree title"
            name="bachelor.degreeTitle"
            label="Degree title"
            value={academicInfo?.bachelor?.degreeTitle}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <UploadFile
        {...{
          data: academicInfo,
          setData: setAcademicInfo,
          label: "All Academic Documents(multiple)",
          imageKey: "bachelorDocuments",
          type: "multiple",
        }}
      />
    </>
  );
};

export default AcademicInfo;
