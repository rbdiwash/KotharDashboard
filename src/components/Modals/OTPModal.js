import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import OtpInput from "react-otp-input";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OTPModal({ open, handleDelete, otp, setOtp, setOpen }) {
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
            inputStyle={"p-4 text-black"}
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
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
