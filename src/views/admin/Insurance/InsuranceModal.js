import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import ClientDropdown from "components/Dropdowns/ClientDropdown";
import InputField from "components/Input/InputField";
import {
  API_URL,
  insurance_companies,
  insurance_cover_type,
} from "const/constants";
import useKothar from "context/useKothar";
import PropTypes from "prop-types";
import * as React from "react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function InsuranceModal({
  openInsuranceForm,
  setOpenInsuranceForm,
  studentDetails,
}) {
  const handleClose = () => {
    setOpenInsuranceForm(false);
  };
  const [childName, setChildName] = useState([]);
  const [{}, { refetchInsuranceList }] = useKothar();

  const [data, setData] = React.useState({
    caseOfficer: "",
    cost: "",
    date: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    firstName: "",
    id: studentDetails?.id || 1,
    insuranceCompany: null,
    lastName: "",
    paymentType: "",
    startingDate: new Date().toISOString().split("T")[0],
    type: "",
    visa: "BUPA",
    childrens: 0,
    child: childName,
  });
  const { mutate } = useMutation(postData, {
    onSuccess(suc) {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      setOpenInsuranceForm(false);
      refetchInsuranceList();
    },
    onError(err) {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });
  async function postData(payload) {
    if (data?.id) {
      await axios.put(
        `${API_URL}/student/insurance/update/${payload?.id}`,
        payload
      );
    } else {
      await axios.post(`${API_URL}/student/insurance/register`, payload);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      ...data,
      firstName: data?.name,
      coverType: data?.coverType?.value,
      type: data?.type?.value,
      insuranceCompany: data?.insuranceCompany?.value,
      child: childName,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
    if (name === "childrens") {
      const arr = [];
      for (let i = 0; i < data?.childrens; i++) {
        arr.push(i + 1);
        childName.push(i + 1);
      }
    }
  };

  const arrayForChildrens = useMemo(() => {
    const arr = [];
    for (let i = 0; i < data?.childrens; i++) {
      arr.push({ index: i + 1, name: "" });
    }
    return arr;
  }, [data?.childrens]);

  const handleChildInputChange = (value, name, i) => {
    const foundChild = childName.find((arg, index) => i === index);
    setChildName((prevState) => [
      ...prevState.slice(0, i),
      value,
      ...prevState.slice(i + 1, childName.length),
    ]);
  };

  console.log(childName);
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
              <ClientDropdown {...{ data, setData }} />
              <div className="relative w-full mb-3">
                <InputField
                  label="Address"
                  placeholder="Address"
                  name="address"
                  required
                  type="text"
                  value={data?.address}
                  disabled
                />
              </div>
              <div className="relative w-full mb-3">
                <InputField
                  label="Phone Number"
                  placeholder="Phone Number"
                  name="number"
                  required
                  type="text"
                  value={data?.number}
                  disabled
                />
              </div>
              <div className="relative w-full mb-3">
                <label className="input-label">
                  Select Insurance Company *
                </label>
                <Autocomplete
                  size="small"
                  onChange={(e, value) => {
                    setData((prevState) => ({
                      ...prevState,
                      insuranceCompany: value,
                    }));
                  }}
                  required
                  value={data?.insuranceCompany}
                  options={insurance_companies}
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
              <div className="relative w-full mb-3">
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
              <div className="relative w-full mb-3">
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
              <div className="relative w-full mb-3">
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
              <div className="relative w-full mb-3">
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
              <div className="relative w-full mb-3">
                <label className="input-label">Select Insurance Type *</label>
                <Autocomplete
                  size="small"
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
              <div className="relative w-full mb-3">
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
              <div className="relative w-full mb-3">
                <label className="input-label">
                  Select Insurance Cover Type *
                </label>
                <Autocomplete
                  size="small"
                  onChange={(e, value) => {
                    setData((prevState) => ({
                      ...prevState,
                      coverType: value,
                    }));
                  }}
                  required
                  freeSolo
                  value={data?.coverType}
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
              {(data?.coverType?.value === "couple" ||
                data?.coverType?.value === "family") && (
                <>
                  <div className="relative w-full mb-3">
                    <InputField
                      type="text"
                      placeholder="Spouse Name"
                      name="spouseName"
                      label="Spouse Name"
                      required={data?.coverType?.value === "couple"}
                      value={data?.spouseName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      type="text"
                      placeholder="Spouse Address"
                      name="spouseAddress"
                      label="Spouse Address"
                      required={data?.coverType?.value === "couple"}
                      value={data?.spouseAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-0">
                    <InputField
                      type="text"
                      placeholder="Spouse Phone Number"
                      name="spousePhoneNumber"
                      label="Spouse Phone Number"
                      required={data?.coverType?.value === "couple"}
                      value={data?.spousePhoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              {(data?.coverType?.value === "family" ||
                data?.coverType?.value === "single_parent") && (
                <>
                  <div className="relative w-full mb-0">
                    <InputField
                      type="text"
                      placeholder="Number of Childrens"
                      name="childrens"
                      label="Number of Childrens"
                      required={data?.coverType?.value === "couple"}
                      value={data?.childrens}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              {arrayForChildrens?.length > 0 &&
                arrayForChildrens?.map((item, i) => (
                  <div className="relative w-full mb-0" key={i}>
                    <InputField
                      type="text"
                      placeholder={`Children Name ${item?.index}`}
                      name={`child${item?.index}`}
                      label={`Children Name ${item?.index}`}
                      required={data?.coverType?.value === "couple"}
                      value={childName[item]}
                      onChange={(e) =>
                        handleChildInputChange(
                          e.target.value,
                          `child${item?.index}`,
                          i
                        )
                      }
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
