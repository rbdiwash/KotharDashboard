import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import OtpInput from "react-otp-input";
import axios from "axios";
import { API_URL } from "const/constants";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OTPModal({ open, data, otp, setOtp, setOpen }) {
  const handleVerify = (e) => {
    e.preventDefault();

    const payload = {
      email: data?.email,
      otp: otp,
    };
    mutate(payload);
  };

  const postData = async (payload) => {
    await axios.post(`${API_URL}/email/otp/verify`, payload);
  };

  const { mutate, isLoading } = useMutation(postData, {
    onSuccess: async (res) => {
      toast.success(res?.data?.message || "Email Verified Successfully");
      setOpen(!open);
    },
    onError(err) {
      toast.error(err?.response?.data?.errorMessage ?? "Error");
      console.log(err);
    },
  });

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth={"lg"}
        onClose={() => setOpen(!open)}
      >
        <DialogTitle className="font-bold uppercase">Verify OTP !</DialogTitle>
        <hr />
        <DialogContent sx={{ px: 20, py: 16 }}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={"otpClass"}
          />
        </DialogContent>
        <hr />
        <DialogActions className="py-2">
          <Button
            onClick={() => setOpen(!open)}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button onClick={handleVerify} variant="contained" color="success">
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
