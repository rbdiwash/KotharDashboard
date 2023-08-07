import { Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "const/constants";
import { tr } from "date-fns/locale";
import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Invoice = ({ color = "dark" }) => {
  const tableHeadClass = color === "light" ? "light-bg" : "dark-bg";
  const navigate = useNavigate();

  const getData = async () => {
    const res = await axios.get(`${API_URL}/invoice/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data;
  };
  const { data, error, isError, isLoading } = useQuery(["invoice"], getData);

  const imageName = (text) => {
    const splittedText = text?.split(" ");
    return splittedText
      ?.map((word) => word.charAt(0))
      .join("")
      .slice(0, 3);
  };

  const { isLoading: loadingVerify, mutate } = useMutation(postData, {
    onSuccess() {
      toast.success("Email sent successfully, check your email.");
    },
    onError() {
      toast.error("Error");
    },
  });
  async function postData(payload) {
    await axios.post(`${API_URL}/email/send-varification-code`, payload);
  }

  const handleVerifyEmail = (e, id) => {
    e.preventDefault();
    mutate({ userId: id });
  };

  return (
    <div className="flex flex-wrap mt-4  dashBody">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
            (color === "light" ? "bg-white" : "bg-sky-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex justify-between">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-slate-700" : "text-white")
                  }
                >
                  Invoices
                </h3>
                <Button
                  variant="outlined"
                  startIcon={<FaPlusCircle />}
                  component={Link}
                  sx={{ color: "white" }}
                  to="/admin/invoice/add"
                >
                  Add Invoice
                </Button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className={"table-head " + tableHeadClass}>Title</th>
                  <th className={"table-head " + tableHeadClass}>Invoice to</th>
                  <th className={"table-head " + tableHeadClass}>
                    Account Number
                  </th>
                  <th className={"table-head " + tableHeadClass}>
                    Account Name
                  </th>
                  <th className={"table-head " + tableHeadClass}>
                    Bank Details
                  </th>
                  <th className={"table-head " + tableHeadClass}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.length > 0 ? (
                  data?.data?.map((item, index) => (
                    <tr key={item?.id || index}>
                      <th className="table-data text-left flex items-center">
                        {item?.name && imageName(item?.name || "Anand Pandey")}
                        <span
                          className={
                            "ml-3 font-bold " +
                            +(color === "light"
                              ? "text-slate-600"
                              : "text-white")
                          }
                        >
                          {item?.name || "-"}
                        </span>
                      </th>
                      <td className="table-data">
                        <div className="flex items-center gap-2">
                          {item?.username}
                        </div>
                      </td>
                      <td className="table-data">{item?.email}</td>
                      <td className="table-data">
                        <div className="flex">{item?.mobileNumber}</div>
                      </td>

                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.emailVerified || "No"}
                        </div>
                      </td>

                      <td className="table-data text-right">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="contained"
                            onClick={(e) => handleVerifyEmail(e, item?.id)}
                            endIcon={
                              loadingVerify && <CircularProgress size={10} />
                            }
                          >
                            Verify Email
                          </Button>
                          <Tooltip title="Delete University" arrow>
                            <IconButton>
                              <AiFillDelete className="text-white cursor-pointer" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr key={1}>
                    <td colSpan={6}>
                      <div className="text-lg text-center my-10">
                        No Results Found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
