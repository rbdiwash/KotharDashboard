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

const GeneralInfo = ({ generalInfo, setGeneralInfo }) => {
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
      <ClientDropdown data={generalInfo} setData={setGeneralInfo} />
      <div className="relative w-full mb-3">
        <InputField
          fullWidth
          type="email"
          placeholder="Email Address"
          name="email"
          label="Email Address"
          required
          value={generalInfo?.email}
          disabled
        />
      </div>
      <div className="relative w-full mb-3">
        <InputField
          fullWidth
          label="Mobile Number"
          placeholder="Mobile Number"
          name="number"
          required
          type="number"
          value={generalInfo?.number}
          disabled
        />
      </div>
      <div className="relative w-full mb-3">
        <FormControl>
          <FormLabel className="text-slate-600 uppercase text-xs font-bold mb-2">
            Gender
          </FormLabel>
          <RadioGroup row required disabled value={generalInfo?.gender}>
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
          fullWidth
          type="date"
          placeholder="Date of Birth"
          name="dob"
          label="Date of Birth"
          required
          value={generalInfo?.dob}
          disabled
        />
      </div>
      <div className="relative w-full mb-3">
        <Autocomplete
          disablePortal
          size="small"
          required
          options={[
            { label: "Single", value: "single" },
            { label: "Married", value: "married" },
            { label: "Divorced", value: "divorced" },
          ]}
          renderInput={(params) => (
            <TextField {...params} label="Marital Status" />
          )}
          onChange={(e, value) => {
            setGeneralInfo((prevState) => ({
              ...prevState,
              maritalStatus: value,
            }));
          }}
          value={generalInfo?.maritalStatus}
        />
      </div>
      <div className="relative w-full mb-3">
        <InputField
          fullWidth
          size="small"
          required
          type="text"
          placeholder="Emergency Contact Name"
          name="emergency.name"
          label="Emergency Contact Name"
          value={generalInfo?.emergency?.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <InputField
          fullWidth
          size="small"
          required
          type="email"
          placeholder="Emergency Email"
          name="emergency.email"
          label="Emergency Email"
          value={generalInfo?.emergency?.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <InputField
          fullWidth
          size="small"
          required
          type="number"
          placeholder="Emergency Contact Number"
          name="emergency.contact"
          label="Emergency Contact Number"
          value={generalInfo?.emergency?.contact}
          onChange={handleInputChange}
        />
      </div>
      <div className="relative w-full mb-3">
        <InputField
          fullWidth
          size="small"
          required
          type="text"
          placeholder="Relation With Applicant"
          name="emergency.relation"
          label="Relation With Applicant"
          value={generalInfo?.emergency?.relation}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default GeneralInfo;
