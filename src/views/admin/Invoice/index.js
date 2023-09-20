import {
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "const/constants";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiFillPrinter,
} from "react-icons/ai";
import { useState } from "react";

const Invoice = ({ color = "dark" }) => {
  const tableHeadClass = color === "light" ? "light-bg" : "dark-bg";
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [openInvoice, setOpenInvoice] = useState(false);

  const getData = async () => {
    const res = await axios.get(`${API_URL}/api/invoice/list`, {
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

  const handleDownloadInvoice = (item) => {
    const payload = item;

    axios
      .post(`${API_URL}/api/invoice/invoice/download`, payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
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
                  <th className={"table-head  " + tableHeadClass}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.length > 0 ? (
                  data?.data?.map((item, index) => (
                    <tr key={item?.id || index}>
                      <th className="table-data text-left flex h-full">
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
                          {item?.invoiceTo}
                        </div>
                      </td>
                      <td className="table-data">
                        {item?.paymentInfo?.accountNumber}
                      </td>
                      <td className="table-data">
                        <div className="flex">
                          {item?.paymentInfo?.accountName}
                        </div>
                      </td>

                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.paymentInfo?.bankDetails || "-"}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center gap-4">
                          <Tooltip title="View Invoice" arrow>
                            <IconButton onClick={() => setOpenInvoice(true)}>
                              <AiFillEye className="text-white cursor-pointer" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Print Invoice" arrow>
                            <IconButton onClick={() => window.print()}>
                              <AiFillPrinter className="text-white" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download Invoice" arrow>
                            <IconButton
                              onClick={() => handleDownloadInvoice(item)}
                            >
                              <SaveAltIcon className="text-white" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Invoice" arrow>
                            <IconButton
                              onClick={() =>
                                navigate("/admin/invoice/add", {
                                  state: { item },
                                })
                              }
                            >
                              <AiFillEdit className="text-white cursor-pointer" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Invoice" arrow>
                            <IconButton
                              onClick={() =>
                                setOpenConfirmationModal({
                                  state: true,
                                  id: item?.id,
                                })
                              }
                            >
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
      {openInvoice && (
        <Dialog
          open={openInvoice}
          keepMounted
          fullWidth
          maxWidt="xl"
          onClose={() => setOpenInvoice(false)}
        >
          <div class="bg-white border rounded-lg shadow-lg px-6 pb-8 w-full">
            <h1 class="font-bold text-2xl my-4 text-center text-blue-600">
              Kothar Educational Service
            </h1>
            <hr class="mb-2" />
            <div class="flex justify-between mb-6">
              <h1 class="text-lg font-bold">Invoice</h1>
              <div class="text-gray-700">
                <div>Date: 01/05/2023</div>
                <div>Invoice #: INV12345</div>
              </div>
            </div>
            <div class="mb-8">
              <h2 class="text-lg font-bold mb-4">Bill To:</h2>
              <div class="text-gray-700 mb-2">John Doe</div>
              <div class="text-gray-700 mb-2">123 Main St.</div>
              <div class="text-gray-700 mb-2">Anytown, USA 12345</div>
              <div class="text-gray-700">johndoe@example.com</div>
            </div>
            <table class="w-full mb-8">
              <thead>
                <tr>
                  <th class="text-left font-bold text-gray-700">Description</th>
                  <th class="text-right font-bold text-gray-700">Price</th>
                  <th class="text-right font-bold text-gray-700">Quantity</th>
                  <th class="text-right font-bold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-left text-gray-700">Product 1</td>
                  <td class="text-right text-gray-700">$100.00</td>
                  <td class="text-right text-gray-700">$100.00</td>
                  <td class="text-right text-gray-700">$100.00</td>
                </tr>
                <tr>
                  <td class="text-left text-gray-700">Product 2</td>
                  <td class="text-right text-gray-700">$50.00</td>
                  <td class="text-right text-gray-700">$50.00</td>
                  <td class="text-right text-gray-700">$50.00</td>
                </tr>
                <tr>
                  <td class="text-left text-gray-700">Product 3</td>
                  <td class="text-right text-gray-700">$75.00</td>
                  <td class="text-right text-gray-700">$75.00</td>
                  <td class="text-right text-gray-700">$75.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="text-left font-bold text-gray-700">Total</td>
                  <td class="text-right font-bold text-gray-700">$225.00</td>
                  <td class="text-right font-bold text-gray-700">$225.00</td>
                  <td class="text-right font-bold text-gray-700">$225.00</td>
                </tr>
              </tfoot>
            </table>
            <div class="text-gray-700 mb-2">Thank you for your business!</div>
            <div class="text-gray-700 text-sm">
              Please remit payment within 30 days.
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Invoice;