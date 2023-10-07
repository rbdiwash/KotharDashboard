import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Autocomplete, TextField } from "@mui/material";
import InputField from "components/Input/InputField";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API_URL } from "const/constants";
import axios from "axios";
import { insurance_companies } from "const/constants";
import { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function InsuranceModal({
  openInsuranceForm,
  setOpenInsuranceForm,
  studentDetails,
}) {
  const handleClose = () => {
    setOpenInsuranceForm(false);
  };
  const [data, setData] = React.useState({
    caseOfficer: null,
    cost: null,
    date: new Date().toISOString(),
    endDate: new Date().toISOString(),
    firstName: null,
    id: studentDetails?.id || 1,
    insuranceCompany: null,
    lastName: null,
    paymentType: null,
    startingDate: new Date().toISOString(),
    type: null,
    visa: null,
    childrens: 0,
    child: [],
  });
  const [childName, setChildName] = useState([]);
  console.log("🚀  childName:", childName);
  const { mutate } = useMutation(postData, {
    onSuccess(suc) {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      setOpenInsuranceForm(false);
    },
    onError(err) {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });
  async function postData(payload) {
    if (data?.id) {
      await axios.put(`${API_URL}/course/update/${payload?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/course/register`, payload);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      ...data,
      firstName: data?.name,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const arrayForChildrens = () => {
    const arr = [];
    for (let i = 0; i < data?.childrens; i++) {
      arr.push(i + 1);
    }
    return arr;
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        open={openInsuranceForm}
        maxWidth="xl"
      >
        <form action="" onSubmit={handleSubmit}>
          <BootstrapDialogTitle onClose={handleClose}>
            Insurance Details
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-end items-end min-w-[700px] px-4">
              <div className="relative w-full mb-0">
                <InputField
                  label="Full Name"
                  placeholder="Full Name"
                  name="name"
                  required
                  type="text"
                  value={data?.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative w-full mb-0">
                <InputField
                  label="Address"
                  placeholder="Address"
                  name="address"
                  required
                  type="text"
                  value={data?.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative w-full mb-0">
                <InputField
                  label="Phone Number"
                  placeholder="Phone Number"
                  name="phone_number"
                  required
                  type="text"
                  value={data?.phone_number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative w-full mb-0">
                <label className="input-label">
                  Select Insurance Company *
                </label>
                <Autocomplete
                  onChange={(e, value) => {
                    setData((prevState) => ({
                      ...prevState,
                      insuranceCompany: value,
                    }));
                  }}
                  required
                  value={data?.visa}
                  options={insurance_companies?.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  disablePortal
                  renderInput={(params) => (
                    <TextField {...params} label="Select Insurance Company" />
                  )}
                  ListboxProps={{
                    style: {
                      maxHeight: "180px",
                    },
                  }}
                />
              </div>
              <div className="relative w-full mb-0">
                <InputField
                  type="date"
                  placeholder="Start Date"
                  name="startingDate"
                  label="Start Date"
                  required
                  value={data?.startingDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative w-full mb-0">
                <InputField
                  label="End Date"
                  placeholder="End Date"
                  name="endDate"
                  required
                  type="date"
                  value={data?.endDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative w-full mb-0">
                <InputField
                  type="text"
                  placeholder="Payment Type"
                  name="paymentType"
                  label="Payment Type"
                  required
                  value={data?.paymentType}
                  onChange={handleInputChange}
                />
              </div>{" "}
              <div className="relative w-full mb-0">
                <InputField
                  type="text"
                  placeholder="Cost"
                  name="cost"
                  label="Cost"
                  required
                  value={data?.cost}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative w-full mb-0">
                <label className="input-label">Select Insurance Type *</label>
                <Autocomplete
                  onChange={(e, value) => {
                    setData((prevState) => ({
                      ...prevState,
                      type: value,
                    }));
                  }}
                  required
                  freeSolo
                  value={data?.type}
                  options={[
                    { label: "OSHC", value: "OSHC" },
                    { label: "OVHC", value: "OVHC" },
                  ]}
                  disablePortal
                  renderInput={(params) => (
                    <TextField {...params} label="Select Insurance Type" />
                  )}
                  ListboxProps={{
                    style: {
                      maxHeight: "180px",
                    },
                  }}
                />
              </div>
              <div className="relative w-full mb-0">
                <InputField
                  type="text"
                  placeholder="Case Officer"
                  name="caseOfficer"
                  label="Case Officer"
                  required
                  value={data?.caseOfficer}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative w-full mb-0">
                <label className="input-label">
                  Select Insurance Cover Type *
                </label>
                <Autocomplete
                  onChange={(e, value) => {
                    setData((prevState) => ({
                      ...prevState,
                      cover_type: value,
                    }));
                  }}
                  required
                  freeSolo
                  value={data?.cover_type}
                  options={insurance_cover_type}
                  disablePortal
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Insurance Cover Type"
                    />
                  )}
                  ListboxProps={{
                    style: {
                      maxHeight: "180px",
                    },
                  }}
                />
              </div>
              {(data?.cover_type?.value === "couple" ||
                data?.cover_type?.value === "family") && (
                <>
                  <div className="relative w-full mb-0">
                    <InputField
                      type="text"
                      placeholder="Spouse Name"
                      name="spouse_name"
                      label="Spouse Name"
                      required={data?.cover_type?.value === "couple"}
                      value={data?.spouse_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-0">
                    <InputField
                      type="text"
                      placeholder="Spouse Address"
                      name="spouse_address"
                      label="Spouse Address"
                      required={data?.cover_type?.value === "couple"}
                      value={data?.spouse_address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-0">
                    <InputField
                      type="text"
                      placeholder="Spouse Phone Number"
                      name="spouse_phone_number"
                      label="Spouse Phone Number"
                      required={data?.cover_type?.value === "couple"}
                      value={data?.spouse_phone_number}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              {(data?.cover_type?.value === "family" ||
                data?.cover_type?.value === "single_parent") && (
                <>
                  <div className="relative w-full mb-0">
                    <InputField
                      type="number"
                      placeholder="Number of Childrens"
                      name="childrens"
                      label="Number of Childrens"
                      required={data?.cover_type?.value === "couple"}
                      value={data?.childrens}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              {console.log(childName)}
              {arrayForChildrens()?.length > 0 &&
                arrayForChildrens()?.map((item) => (
                  <div className="relative w-full mb-0" key={item}>
                    <InputField
                      type="text"
                      placeholder={`Children Name ${item}`}
                      name={`child${item}`}
                      label={`Children Name ${item}`}
                      required={data?.cover_type?.value === "couple"}
                      value={childName[item] || ""}
                      onBlur={(e) => {
                        setChildName((prev) => [...childName, e.target.value]);
                      }}
                    />
                  </div>
                ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" autoFocus onClick={handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}

const insurance_cover_type = [
  { label: "Single", value: "single" },
  { label: "Couple", value: "couple" },
  { label: "Family", value: "family" },
  { label: "Single Parent", value: "single_parent" },
];
