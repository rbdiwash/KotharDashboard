import { Autocomplete, TextField } from "@mui/material";
import useKothar from "context/useKothar";
import React from "react";

const ClientDropdown = ({ data, setData }) => {
  const [{ clientList }, {}] = useKothar();
  console.log(data?.name, data?.id);
  return (
    <div className="relative w-full mb-3">
      <label className="input-label">Select Client *</label>
      <Autocomplete
        onChange={(e, value) => {
          setData((prevState) => ({
            ...prevState,
            clientId: value?.id,
            name: value?.name,
            address: value?.address,
            dob: value?.dob,
            gender: value?.gender,
            email: value?.email,
            number: value?.number,
            passportNumber: value?.passportNumber,
            visa_expiry: value?.visa_expiry,
            visa_status: value?.visa_status,
            passportExpiry: value?.passportExpiry,
            dateOfIssue: value?.dateOfIssue,
          }));
        }}
        required
        value={{ name: data?.name, id: data?.id }}
        options={clientList || []}
        getOptionLabel={(option) => option?.name || ""}
        getOptionValue={(option) => option?.id}
        isOptionEqualToValue={(options, value) => options.name === value.name}
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
