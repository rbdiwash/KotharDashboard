import * as React from "react";
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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DiscussionModal({
  open,
  setOpen,
  handleSubmit,
  handleCancel,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const options = [
    { title: "RPL", value: "rpl" },
    { title: "Admission", value: "admission" },
    { title: "Professional Year", value: "py" },
    { title: "Visa", value: "visa" },
    { title: "Insurance", value: "insurance" },
  ];
  const { mutate } = useMutation(postData, {
    onSuccess() {
      toast.success("Comment added Successfully");
    },
    onError() {
      toast.error("Error Submitting Comment");
    },
  });

  async function postData(payload) {
    await axios.post(`${API_URL}/visaApplications/:id/comments`, payload);
  }
  const submitPost = (e) => {
    e.preventDefault();
    mutate({ hello: "hi" });
  };
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Discussion Forum
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="min-h-[400px] flex flex-col h-full">
            <Autocomplete
              disablePortal
              options={options}
              sx={{ width: 500, mx: "auto" }}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} placeholder="Search using Name" />
              )}
              size="small"
            />
            <div className="flex flex-col justify-between h-full">
              <div className="max-h-[400px] overflow-y-auto">
                {[0, 1, 2, 3, 4]?.map((arg) => (
                  <article class="p-6 mb-6 text-base bg-white rounded-lg border-b">
                    <footer class="flex justify-between items-center mb-2">
                      <div class="flex items-center">
                        <p class="inline-flex items-center mr-3 text-sm text-gray-900 ">
                          <img
                            class="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            alt="Michael Gough"
                          />
                          Michael Gough
                        </p>
                        <p class="text-sm text-gray-600 ">
                          <time
                            pubdate
                            datetime="2022-02-08"
                            title="February 8th, 2022"
                          >
                            Feb. 8, 2022
                          </time>
                        </p>
                      </div>
                    </footer>
                    <p class="text-gray-500 ">
                      Very straight-to-point article. Really worth time reading.
                      Thank you! But tools are just the instruments for the UX
                      designers. The knowledge of the design tools are as
                      important as the creation of the design strategy.
                    </p>
                  </article>
                ))}{" "}
                <article class="p-6 mb-6 text-base bg-white text-center py-12">
                  No Conversations found
                </article>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions className="py-2 flex flex-col">
          <form class="m flex flex-col w-full" onSubmit={submitPost}>
            <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
              <label for="comment" class="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="2"
                class="px-0 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none w-full"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
          </form>

          <Button variant="contained" type="submit" className="ml-auto">
            Post comment
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
