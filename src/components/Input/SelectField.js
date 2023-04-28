import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

const SelectField = ({
  defaultValue,
  label,
  required = false,
  name,
  options = [],
  value,
  ...props
}) => {
  return (
    <div>
      <label
        className="block uppercase text-slate-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <FormControl fullWidth size="small">
        <Select name={name} {...props} required={required}>
          {defaultValue && (
            <MenuItem value={""} selected disabled>
              {defaultValue || "Select Consultancy"}
            </MenuItem>
          )}
          {options?.map((item) => (
            <MenuItem value={item?.id}>{item?.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectField;
