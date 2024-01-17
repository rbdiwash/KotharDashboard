import { Autocomplete, TextField } from "@mui/material";
import useKothar from "context/useKothar";
import React from "react";

const ClientDropdown = ({ data, setData }) => {
  const [{ clientList }, {}] = useKothar();

  return (
    <div className="relative w-full mb-3">
      <label className="input-label">Select Client *</label>
      <Autocomplete
        onChange={(e, value) => {
          setData((prevState) => ({
            ...prevState,
            value,
          }));
        }}
        required
        value={data?.client}
        options={clientList || []}
        getOptionLabel={(option) => option?.name || ""}
        getOptionValue={(option) => option?.id}
        isOptionEqualToValue={(options, value) => options.id === value.id}
        disablePortal
        size="small"
        renderInput={(params) => (
          <TextField {...params} label="Select Client" />
        )}
        ListboxProps={{
          style: {
            maxHeight: "180px",
          },
        }}
      />
    </div>
  );
};

export default ClientDropdown;
