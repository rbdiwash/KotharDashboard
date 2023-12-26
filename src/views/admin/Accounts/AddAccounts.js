import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import DeleteModal from "components/Modals/DeleteModal";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddAccounts = ({ color = "light" }) => {
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});

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
            <div class="px-4">
              <div class="container mx-auto px-2 py-2">
                <div class="flex flex-col space-y-5">
                  <div class="text-center">
                    <h1 class="text-4xl font-bold mb-10">Account Details</h1>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div class="md:col-span-2">
                      <h2 class="text-2xl font-semibold mb-5">
                        Divash Ranabhat
                      </h2>
                      <p class="mb-2">Blake Street, Kogarah</p>
                      <p class="mb-2">NSW, Australia</p>
                      <p class="mb-2">+0430082553</p>
                    </div>
                    <div class="max-w-7xl mx-auto  lg:px-8">
                      <div class="bg-white overflow-hidden">
                        <div class="px-2 pb-2">
                          <h3 class="text-lg leading-6 font-medium text-gray-900">
                            Bill To
                          </h3>
                        </div>
                        <div class="border-gray-200">
                          <dl>
                            <div class="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 ">
                              <dt class="text-sm font-medium text-gray-500">
                                Total Due
                              </dt>
                              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                $12,110.55
                              </dd>
                            </div>
                            <div class=" px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 ">
                              <dt class="text-sm font-medium text-gray-500">
                                Bank name
                              </dt>
                              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                American Bank
                              </dd>
                            </div>
                            <div class="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 ">
                              <dt class="text-sm font-medium text-gray-500">
                                Country
                              </dt>
                              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                Australia
                              </dd>
                            </div>
                            <div class=" px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 ">
                              <dt class="text-sm font-medium text-gray-500">
                                Type
                              </dt>
                              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
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
                  <table class="table-auto w-full">
                    <thead>
                      <tr>
                        <th class="border px-4 py-2">SN</th>
                        <th class="border px-4 py-2">Date</th>
                        <th class="border px-4 py-2">Amount</th>
                        <th class="border px-4 py-2">Payment Method</th>
                        <th class="border px-4 py-2">Remarks</th>
                        <th class="border px-4 py-2">Attachment</th>
                        <th class="border px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="border text-center px-4 py-2">1</td>
                        <td class="border text-center px-4 py-2">
                          App Customization
                        </td>
                        <td class="border text-center px-4 py-2">
                          Edward Crowle y
                        </td>
                        <td class="border text-center  px-4 py-2">
                          2023-07-26
                        </td>
                        <td class="border text-center px-4 py-2">$12,110.55</td>
                        <td class="border text-center px-4 py-2">$12,110.55</td>
                        <td classs="border text-center px-4 py-2">
                          $12,110.55
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
                    <div class="md:col-span-2">
                      <h2 class="text-xl font-semibold mb-5">Note:</h2>
                      <p class="mb-2">Cost: $24.00</p>
                      <p class="mb-2">Discount: 0% 0% 0%</p>
                    </div>
                    <div>
                      <h2 class="text-xl font-semibold mb-5">
                        Payment Details:
                      </h2>
                      <p class="mb-2">Invoice #: 740125</p>
                      <p class="mb-2">Due Date: 2023-08-24</p>
                      <p class="mb-2">Total Amount: $12,110.55</p>
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
