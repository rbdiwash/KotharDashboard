import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import ClientDropdown from "components/Dropdowns/ClientDropdown";
import InputField from "components/Input/InputField";
import { states } from "const/constants";
import { months } from "const/constants";
import useKothar from "context/useKothar";

const UniversityInfo = ({ generalInfo, setGeneralInfo }) => {
  const [{ uniData, courseData }, {}] = useKothar();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name?.split(".")?.length > 1) {
      let key = name?.split(".")[0];
      let nestedKey = name?.split(".")[1];
      setGeneralInfo((prevState) => ({
        ...prevState,
        [key]: { ...prevState?.[key], [nestedKey]: value },
      }));
    } else {
      setGeneralInfo((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <div className="grid grid-cols-3 gap-8 mt-6 items-end">
      <div className="relative w-full mb-3">
        <label className="input-label">Select Course *</label>
        <Autocomplete
          onChange={(e, value) => {
            setGeneralInfo((prevState) => ({
              ...prevState,
              course: value,
            }));
          }}
          required
          value={generalInfo?.course}
          options={courseData || []}
          getOptionLabel={(option) => option?.name || ""}
          getOptionValue={(option) => option?.id}
          isOptionEqualToValue={(options, value) => options.id === value.id}
          disablePortal
          renderInput={(params) => (
            <TextField {...params} label="Select Course" />
          )}
          ListboxProps={{
            style: {
              maxHeight: "180px",
            },
          }}
          size="small"
        />
      </div>
      <div className="relative w-full mb-3">
        <label className="input-label">Select University *</label>
        <Autocomplete
          onChange={(e, value) => {
            setGeneralInfo((prevState) => ({
              ...prevState,
              university: value,
            }));
          }}
          required
          value={generalInfo?.university}
          options={uniData || []}
          getOptionLabel={(option) => option?.name || ""}
          getOptionValue={(option) => option?.id}
          isOptionEqualToValue={(options, value) => options.id === value.id}
          disablePortal
          renderInput={(params) => (
            <TextField {...params} label="Select University" />
          )}
          ListboxProps={{
            style: {
              maxHeight: "180px",
            },
          }}
          size="small"
        />
      </div>
      <div className="relative w-full mb-3">
        <label className="input-label">Select State *</label>
        <Autocomplete
          onChange={(e, value) => {
            setGeneralInfo((prevState) => ({
              ...prevState,
              state: value,
            }));
          }}
          required
          multiple
          value={generalInfo?.state}
          placeholder="Select State"
          options={states || []}
          isOptionEqualToValue={(options, value) =>
            options.value === value.value
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select State"
              type="search"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
          ListboxProps={{
            style: {
              maxHeight: "180px",
            },
          }}
          size="small"
        />
      </div>
      <div className="relative w-full mb-3">
        <label className="input-label">Select Intake *</label>
        <Autocomplete
          onChange={(e, value) => {
            setGeneralInfo((prevState) => ({
              ...prevState,
              intake: value,
            }));
          }}
          required
          multiple
          value={generalInfo?.intake}
          placeholder="Select Intake"
          options={months}
          disablePortal
          renderInput={(params) => (
            <TextField {...params} label="Select Intake" />
          )}
          ListboxProps={{
            style: {
              maxHeight: "180px",
            },
          }}
          size="small"
        />
      </div>
      <div className="relative w-full mb-3">
        <InputField
          type="text"
          placeholder="Fees (per semester) in AUD"
          name="fee"
          label="Fees (per semester)"
          required
          value={generalInfo?.fee}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <InputField
          fullWidth
          label="Case Officer"
          placeholder="Case Officer"
          name="caseOfficer"
          required
          type="text"
          value={generalInfo?.caseOfficer}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <InputField
          fullWidth
          label="Reference"
          placeholder="Reference"
          name="reference"
          required
          type="text"
          value={generalInfo?.reference}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default UniversityInfo;
