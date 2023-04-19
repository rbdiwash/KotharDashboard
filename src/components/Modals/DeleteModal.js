import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteModal({
  open,
  item,
  handleCancel,
  handleDelete,
}) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancel}
      >
        <DialogTitle className="font-bold uppercase">
          Delete {item || "item"} ?
        </DialogTitle>
        <hr />
        <DialogContent>
          <DialogContentText className="text-lg py-3">
            Are you sure want to delete the selected {item || "item"}. Once you
            delete, it can't be retrieved back.
          </DialogContentText>
        </DialogContent>
        <hr />
        <DialogActions className="py-2">
          <Button onClick={handleCancel} variant="outlined" color="error">
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
