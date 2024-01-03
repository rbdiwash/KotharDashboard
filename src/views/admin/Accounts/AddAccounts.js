import {
  Autocomplete,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import InputField from "components/Input/InputField";
import DeleteModal from "components/Modals/DeleteModal";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";

const AddAccounts = ({ color = "light" }) => {
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [installments, setInstallments] = useState([{ index: 1 }]);
  const [{ courseList }, { refetchCourseList }] = useKothar();

  const deleteData = () => {
    axios
      .delete(`${API_URL}/organization/delete/${openConfirmationModal?.id}`)
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message || "Data Deleted Successfully");
        setOpenConfirmationModal({ state: false, id: null });
        refetchCourseList();
      })
      .catch((err) => {
        toast.error("Error Deleting Data");
      });
  };

  const options = [
    { title: "RPL", value: "rpl" },
    { title: "Admission", value: "admission" },
    { title: "Professional Year", value: "py" },
    { title: "Visa", value: "visa" },
    { title: "Insurance", value: "insurance" },
  ];

  const addInstallments = () => {
    setInstallments((prev) => [...prev, { index: prev.length + 1 }]);
  };

  const handleDeleteInstallment = (index) => {
    setInstallments((prev) => [...prev.filter((item, i) => i !== index)]);
  };

  return (
    <div className="flex flex-wrap mt-4 dashBody">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded min-h-[70vh] " +
            (color === "light" ? "bg-white" : "bg-sky-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center justify-between">
              <form className="flex items-between justify-center gap-2 w-full  rounded mr-3">
                <Autocomplete
                  disablePortal
                  options={options}
                  sx={{ width: 300 }}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Type" />
                  )}
                />
                <Autocomplete
                  disablePortal
                  options={options}
                  sx={{ width: 500 }}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Search using Name" />
                  )}
                />

                <Button variant="contained">Search </Button>
              </form>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <div className="px-4">
              <div className="container mx-auto px-2 py-1">
                <div className="flex flex-col space-y-5">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-10">
                      Account Details
                    </h1>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2">
                      <h2 className="text-2xl font-semibold mb-5">
                        Divash Ranabhat
                      </h2>
                      <p className="mb-2">Blake Street, Kogarah</p>
                      <p className="mb-2">NSW, Australia</p>
                      <p className="mb-2">+0430082553</p>
                    </div>
                    <div className="max-w-7xl mx-auto  lg:px-8">
                      <div className="bg-white overflow-hidden">
                        <div className="px-2 pb-2">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Bill To
                          </h3>
                        </div>
                        <div className="border-gray-200">
                          <dl>
                            <div className="px-2 py-1 sm:grid sm:grid-cols-3 sm:gap-4 ">
                              <dt className="text-sm font-medium text-gray-500">
                                Total Due
                              </dt>
                              <dd className="mt-0 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                $12,110.55
                              </dd>
                            </div>

                            <div className="px-2 py-1 sm:grid sm:grid-cols-3 sm:gap-4 ">
                              <dt className="text-sm font-medium text-gray-500">
                                Country
                              </dt>
                              <dd className="mt-0 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                Australia
                              </dd>
                            </div>
                            <div className=" px-2 py-1 sm:grid sm:grid-cols-3 sm:gap-4 ">
                              <dt className="text-sm font-medium text-gray-500">
                                Type
                              </dt>
                              <dd className="mt-0 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                RPL Certificate
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 className="text-lg text-gray-600 font-semibold">
                    Payment Installlments
                  </h1>
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">SN</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">Payment Method</th>
                        <th className="border px-4 py-2">Remarks</th>
                        <th className="border px-4 py-2">Commission Claimed</th>
                        <th className="border px-4 py-2">Attachment</th>
                        <th className="border px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {installments?.map((item, i) => (
                        <tr key={item?.index}>
                          <td className="border text-center px-4 py-2">
                            {i + 1}
                          </td>
                          <td className="border text-center px-4 py-2">
                            <InputField type="date" name="date" />
                          </td>
                          <td className="border text-center px-4 py-2">
                            <InputField
                              type="number"
                              name="amount"
                              placeholder="Amount"
                            />
                          </td>
                          <td className="border text-center  px-4 py-2">
                            <InputField
                              type="text"
                              name="method"
                              placeholder="Payment Method"
                            />
                          </td>
                          <td className="border text-center px-4 py-2">
                            <InputField
                              type="text"
                              name="remarks"
                              placeholder="Enter Remarks"
                              size="small"
                            />
                          </td>
                          <td className="border text-center px-4 py-2">
                            <div className="flex items-center gap-4">
                              <Autocomplete
                                onChange={(e, value) => {
                                  setInstallments([]);
                                }}
                                size="small"
                                required
                                options={[
                                  {
                                    label: "Yes",
                                    value: "yes",
                                  },
                                  { label: "No", value: "no" },
                                ]}
                                disablePortal
                                renderInput={(params) => (
                                  <TextField {...params} label="Yes/No" />
                                )}
                                ListboxProps={{
                                  style: {
                                    maxHeight: "180px",
                                  },
                                }}
                              />
                              <InputField
                                type="text"
                                name="comission"
                                placeholder="Enter Comission"
                              />
                            </div>
                          </td>
                          <td className="border text-center px-4 py-2">
                            <InputField
                              type="file"
                              name="remarks"
                              placeholder="Upload Attachments"
                            />
                          </td>
                          <td className="border text-center px-4 py-2">
                            <div className="flex items-center">
                              <Tooltip title="Edit Course" arrow>
                                <IconButton
                                  onClick={() =>
                                    navigate("/admin/course/add", {})
                                  }
                                >
                                  <AiFillEdit className="text-sky-600 cursor-pointer" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Course" arrow>
                                <IconButton
                                  onClick={() => handleDeleteInstallment(i)}
                                >
                                  <AiFillDelete className="text-red-600 cursor-pointer" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td
                          colSpan={"20"}
                          className="border text-left px-4 py-2"
                        >
                          <Button
                            variant="contained"
                            startIcon={<FaPlusCircle />}
                            onClick={addInstallments}
                          >
                            Add More Installments
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="grid grid-cols-1  gap-5 mt-10">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl font-semibold mb-5">
                        Payment Details:
                      </h2>
                      <div className="flex gap-2 items-center ">
                        Amount:
                        <InputField
                          type="number"
                          name="discount"
                          placeholder="Discount Amount"
                          className="w-[200px] p-1"
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        Discount:
                        <InputField
                          type="number"
                          name="discount"
                          placeholder="Discount Amount"
                          className="w-[200px] p-1"
                        />
                      </div>
                      <div className=" flex items-center gap-2">
                        Due Date:
                        <InputField
                          type="file"
                          name="total_amount"
                          placeholder="Total Amount"
                          className="w-[200px]"
                        />
                      </div>{" "}
                      <div className=" flex items-center gap-2">
                        Total Amount:
                        <InputField
                          type="number"
                          name="total_amount"
                          placeholder="Total Amount"
                          className="w-[200px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openConfirmationModal.state && (
        <DeleteModal
          open={openConfirmationModal.state}
          item="Course"
          handleCancel={() =>
            setOpenConfirmationModal({ state: false, id: null })
          }
          handleDelete={() => deleteData()}
        />
      )}
    </div>
  );
};

export default AddAccounts;
