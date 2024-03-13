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
import { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DiscussionModal({ open, setOpen, studentList, type }) {
  const [studentId, setStudentId] = useState(null);
  const [commentsList, setCommentsList] = useState([]);
  const [text, setText] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation(postData, {
    onSuccess() {
      toast.success("Comment added Successfully");
    },
    onError() {
      toast.error("Error Submitting Comment");
    },
  });

  async function postData(payload) {
    await axios.post(`${API_URL}/disucssion/${studentId}/`, payload);
  }
  const submitPost = (e) => {
    e.preventDefault();
    mutate({ text, type });
  };

  const fetchDiscussions = async (id) => {
    await axios
      .get(`${API_URL}/disucssion/${studentId}/?type=${type}`)
      .then((res) => setCommentsList(res?.data?.data))
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        open={open}
        maxWidth={"md"}
        fullWidth
      >
        <form class="m flex flex-col w-full" onSubmit={submitPost}>
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
                options={studentList || []}
                sx={{ width: 500, mx: "auto" }}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Search using Name" />
                )}
                size="small"
                onChange={(e, value) => {
                  console.log(value);
                  fetchDiscussions(value?.clientId);
                  setStudentId(value?.clientId);
                }}
              />
              <div className="flex flex-col justify-between h-full">
                <div className="max-h-[400px] overflow-y-auto">
                  {commentsList?.length > 0 ? (
                    commentsList?.map((arg) => (
                      <article
                        class="p-6 mb-6 text-base bg-white rounded-lg border-b"
                        key={JSON.stringify(arg)}
                      >
                        <footer class="flex justify-between items-center mb-2">
                          <div class="flex items-center">
                            <p class="inline-flex items-center mr-3 text-sm text-gray-900 ">
                              <img
                                class="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                alt="Post"
                              />
                              {arg?.postedBy || "-"}
                            </p>
                            <p class="text-sm text-gray-600 ">
                              <time
                                pubdate
                                datetime="2022-02-08"
                                title="February 8th, 2022"
                              >
                                {arg?.date}
                              </time>
                            </p>
                          </div>
                        </footer>
                        <p class="text-gray-500 ">{arg?.text}</p>
                      </article>
                    ))
                  ) : (
                    <article class="p-6 mb-6 text-base bg-white text-center py-12">
                      No Conversations found
                    </article>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="py-2 flex flex-col">
            <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 w-full">
              <label for="comment" class="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="2"
                class="px-0 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none w-full"
                placeholder="Write a comment..."
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>

            <Button variant="contained" type="submit" className="ml-auto">
              Post comment
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </React.Fragment>
  );
}
