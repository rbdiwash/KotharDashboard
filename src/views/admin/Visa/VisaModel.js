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

export default function VisaModal({
  openVisaForm,
  setOpenVisaForm,
  studentDetails,
}) {
  const handleClose = () => {
    setOpenVisaForm(false);
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
  const { mutate } = useMutation(postData, {
    onSuccess(suc) {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      setOpenVisaForm(false);
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
      cover_type: data?.cover_type?.value,
      type: data?.type?.value,
      insuranceCompany: data?.insuranceCompany?.value,
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
      <BootstrapDialog onClose={handleClose} open={openVisaForm} maxWidth="xl">
        <form action="" onSubmit={handleSubmit}>
          <BootstrapDialogTitle onClose={handleClose}>
            Visa Details
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

const handleChildInputChange = () => {};

const insurance_cover_type = [
  { label: "Single", value: "single" },
  { label: "Couple", value: "couple" },
  { label: "Family", value: "family" },
  { label: "Single Parent", value: "single_parent" },
];
