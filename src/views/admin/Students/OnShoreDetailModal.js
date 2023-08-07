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
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
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

export default function OnShoreDetailsModal({
  openOnshore,
  setOpenOnshore,
  studentDetails,
}) {
  const handleClose = () => {
    setOpenOnshore(false);
  };
  const [data, setData] = React.useState({
    firstName: null,
    lastName: null,
    email: null,
    mobile: null,
    address: null,
    caseOfficer: null,
    usiNumber: null,
    dob: new Date()?.toISOString(),
    visaStatus: null,
    visaExpiry: new Date()?.toISOString(),
    date: new Date()?.toISOString(),
    placement: null,
    qualification: null,
    postalDate: new Date()?.toISOString(),
    hardCopy: null,
    reference: null,
    sno: 0,
    status: null,
  });
  const { mutate } = useMutation(postData, {
    onSuccess(suc) {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      setOpenOnshore(false);
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
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <BootstrapDialog onClose={handleClose} open={openOnshore} maxWidth="xl">
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Onshore Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-3 justify-end items-end min-w-[700px] px-4">
            <div className="relative w-full mb-1">
              <InputField
                label="Student Full Name"
                placeholder="Student Full Name"
                name="name"
                required
                disabled
                type="text"
                value={studentDetails?.name}
              />
            </div>
            <div className="relative w-full mb-1">
              <InputField
                label="Email"
                placeholder="Email"
                name="email"
                required
                disabled
                type="text"
                value={studentDetails?.email}
              />
            </div>
            <div className="relative w-full mb-1">
              <InputField
                type="text"
                placeholder="Mobile Number"
                name="mobile"
                label="Mobile Number"
                required
                disabled
                value={studentDetails?.mobile}
              />
            </div>
            <div className="relative w-full mb-1">
              <InputField
                type="text"
                placeholder="Address"
                name="address"
                label="Address"
                required
                disabled
                value={studentDetails?.address}
              />
            </div>
            <div className="relative w-full mb-1">
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
            <div className="relative w-full mb-1">
              <InputField
                type="text"
                placeholder="USI Number"
                name="usiNumber"
                label="USI Number"
                required
                value={data?.usiNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative w-full mb-1">
              <InputField
                type="text"
                placeholder="Qualification"
                name="qualification"
                label="Qualification"
                required
                value={data?.qualification}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative w-full mb-1">
              <InputField
                type="text"
                placeholder="Example: Internship"
                name="placement"
                label="Placement"
                required
                value={data?.placement}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative w-full mb-1">
              <InputField
                type="text"
                placeholder="Visa Status"
                name="visaStatus"
                label="Visa Status"
                required
                value={studentDetails?.visaStatus}
                disabled
              />
            </div>
            <div className="relative w-full mb-1">
              <InputField
                type="text"
                placeholder="Visa Expiry"
                name="visaExpiry"
                label="Visa Expiry"
                required
                value={studentDetails?.visaExpiry}
                disabled
              />
            </div>

            <div className="relative w-full mb-1">
              <InputField
                type="date"
                placeholder="Postal Date"
                name="postalDate"
                label="Postal Date"
                required
                value={data?.startingDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="relative w-full mb-1">
              <InputField
                type="text"
                placeholder="Reference"
                name="reference"
                label="Reference"
                required
                value={data?.reference}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative w-full mb-1">
              <InputField
                type="text"
                placeholder="Status"
                name="status"
                label="Status"
                required
                value={data?.status}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative w-full mb-1">
              <FormControl>
                <FormLabel className="text-slate-600 uppercase text-xs font-bold mb-2">
                  Hard Copy
                </FormLabel>
                <RadioGroup
                  row
                  required
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />

                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
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
      </BootstrapDialog>
    </div>
  );
}
