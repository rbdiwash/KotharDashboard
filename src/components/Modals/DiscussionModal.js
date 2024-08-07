import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const buttonRef = useRef(null);
  const [{ token }, {}] = useKothar();

  const [{ notificationClicked }, { setNotificationClicked }] = useKothar();
  const handleClose = () => {
    setOpen(false);
    setNotificationClicked({ state: false, id: null });
  };
  const userDetail = JSON.parse(localStorage.getItem("userDetail"));

  const { mutate } = useMutation(postData, {
    onSuccess() {
      fetchDiscussions(studentId);
      setText("");
    },
    onError() {
      toast.error("Error Submitting Comment");
    },
  });

  useEffect(() => {
    if (notificationClicked?.id) {
      fetchDiscussions(notificationClicked?.id);
      setStudentId(notificationClicked?.id);
    }
  }, [notificationClicked]);

  async function postData(payload) {
    await axios.post(`${API_URL}/discussion/${studentId}`, payload);
  }
  const submitPost = (e) => {
    e.preventDefault();
    mutate({ text, type });
  };

  const fetchDiscussions = async (id) => {
    await axios
      .get(`${API_URL}/discussion/${id}?type=${type}`)
      .then((res) => {
        setCommentsList(res?.data?.comments);
        buttonRef.current.scrollIntoView();
        // setNotificationClicked({ state: false, id: null });
      })
      .catch((err) => console.log(err));
  };

  const deleteIndividualComment = (commentId) => {
    axios({
      url: `${API_URL}/discussion/comment/${commentId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success("Data Deleted Successfully");
        fetchDiscussions(studentId);
      })
      .catch(() => {
        toast.error("Error Deleting Data");
      });
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        // onClose={handleClose}
        open={open}
        maxWidth={"md"}
        fullWidth
      >
        <form className="m flex flex-col w-full" onSubmit={submitPost}>
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
                renderInput={(params) => (
                  <TextField {...params} placeholder="Search using Name" />
                )}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
                }}
                size="small"
                onChange={(e, value) => {
                  fetchDiscussions(value?.clientId);
                  setStudentId(value?.clientId);
                }}
                value={
                  studentList?.find((student) => student?.id === studentId) ||
                  null
                }
              />
              <div className="flex flex-col justify-between h-full">
                <div className="max-h-[400px] overflow-y-auto" ref={buttonRef}>
                  {commentsList?.length > 0 ? (
                    commentsList?.map((arg) => (
                      <div id="chatbox" className="p-4" key={arg?.id}>
                        {userDetail?.email === arg?.commentedBy ? (
                          <div className="mb-2 text-right">
                            <p className="text-sm mb-2 text-gray-400">
                              {arg?.postedBy}{" "}
                              {new Date(arg?.date)?.toLocaleString()}
                            </p>
                            <div className="flex items-center justify-end gap-2 cursor-pointer">
                              {userDetail?.type === "SUPER_ADMIN" && (
                                <Tooltip title="Delete this comment">
                                  <DeleteIcon
                                    sx={{ color: "grey" }}
                                    onClick={() =>
                                      deleteIndividualComment(arg?.id)
                                    }
                                  />
                                </Tooltip>
                              )}
                              <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                                {arg?.text}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="mb-2">
                            <p className="text-sm mb-2 text-gray-400">
                              {arg?.commentedBy}{" "}
                              {new Date(arg?.date)?.toLocaleString()}
                            </p>
                            <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                              {arg?.text}
                            </p>
                          </div>
                        )}
                        <AlwaysScrollToBottom />
                      </div>
                    ))
                  ) : (
                    <article className="p-6 mb-6 text-base bg-white text-center py-12">
                      No Conversations found. You can start conversation any
                      time.
                    </article>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="py-2 flex flex-col">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 w-full">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="2"
                className="px-0 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none w-full"
                placeholder="Write a comment..."
                onChange={(e) => setText(e.target.value)}
                value={text}
              ></textarea>
            </div>

            <Button
              variant="contained"
              type="submit"
              className="ml-auto"
              disabled={!text}
            >
              Post comment
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </React.Fragment>
  );
}

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};
