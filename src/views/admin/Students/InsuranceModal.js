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
  });
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
              <div className="relative w-full mb-3">
                <InputField
                  label="Student Full Name"
                  placeholder="Student Full Name"
                  name="name"
                  required
                  type="text"
                  value={data?.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative w-full mb-3">
                <InputField
                  label="Insurance Company"
                  placeholder="Insurance Company"
                  name="insuranceCompany"
                  required
                  type="text"
                  value={data?.insuranceCompany}
                  onChange={handleInputChange}
                />
              </div>{" "}
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
                <InputField
                  type="text"
                  placeholder="Type"
                  name="type"
                  label="Type"
                  required
                  value={data?.type}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative w-full mb-3">
                <label className="input-label">Select Visa Status *</label>
                <Autocomplete
                  onChange={(e, value) => {
                    setData((prevState) => ({
                      ...prevState,
                      visa: value,
                    }));
                  }}
                  required
                  value={data?.visa}
                  options={[
                    { label: "Pending", value: "pending" },
                    { label: "Approved", value: "approved" },
                  ]}
                  disablePortal
                  renderInput={(params) => (
                    <TextField {...params} label="Select Visa Status" />
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
