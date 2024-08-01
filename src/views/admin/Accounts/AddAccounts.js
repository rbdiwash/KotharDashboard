import { KeyboardArrowDown, Visibility } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import InputField from "components/Input/InputField";
import UploadFile from "components/Input/UploadFile";
import DeleteModal from "components/Modals/DeleteModal";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EyeDrawer from "./EyeModal";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import EyeModal from "./EyeModal";

const AddAccounts = ({ color = "light" }) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [accountDetails, setAccountDetails] = useState([
    {
      id: crypto.randomUUID(),
      module: { label: "RPL", value: "RPL" },
      agreedAmount: null,
      cost: null,
    },
  ]);

  const [studentDetails, setStudentDetails] = useState([{ index: 1 }]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [data, setData] = useState({
    studentCost: null,
    costForKothar: null,
    caseOfficer: null,
    isClaimed: "No",
    commission: null,
    reminderDate: null,
    amountPaidByStudent: null,
  });
  const [{ refetchAccountList }] = useKothar();
  const [openEyeModal, setOpenEyeModal] = useState({ state: false, id: null });
  const { state } = useLocation();
  const navigate = useNavigate();
  const options = [
    { label: "RPL", value: "RPL" },
    { label: "Admission", value: "Admission" },
    { label: "Visa", value: "Visa" },
    { label: "Insurance", value: "Insurance" },
    {
      label: "Skill Assessment",
      value: "Skill Assessment",
    },
  ];

  useEffect(() => {
    if (state) {
      setData({ ...state?.item });
      setSelectedStudent({
        clientId: state?.item?.clientId,
        name: `${state?.item?.clientName}`,
        address: state?.item?.clientData?.address,
        number: state?.item?.clientData?.number,
      });
      // setAccountDetails([
      //   ...state?.item?.accountDetails?.map((item) => ({
      //     ...item,
      //     date: item?.date?.split("T")[0],
      //   })),
      // ]);
    }
  }, [state]);

  const deleteData = () => {
    axios
      .delete(`${API_URL}/organization/delete/${openConfirmationModal?.id}`)
      .then((res) => {
        toast.success(res?.data?.message || "Data Deleted Successfully");
        setOpenConfirmationModal({ state: false, id: null });
        refetchAccountList();
      })
      .catch((err) => {
        toast.error("Error Deleting Data");
      });
  };

  const handleInputChange = (e, row) => {
    const { name, value } = e.target;
    const foundRow = accountDetails.find(
      (item, i) => item?.id === row?.original?.id
    );
    setAccountDetails((prevState) => [
      ...prevState?.slice(0, row?.index),
      { ...foundRow, [name]: value },
      ...prevState?.slice(row?.index + 1, accountDetails.length),
    ]);
  };

  const addStudentDetails = () => {
    setStudentDetails((prev) => [...prev, { index: prev.length + 1 }]);
  };

  const handleDeleteStudentDetails = (index) => {
    setStudentDetails((prev) => [...prev.filter((item, i) => i !== index)]);
  };

  const handleAutoCompleteChange = (value, row) => {
    const rowIndex = accountDetails.find(
      (arg) => arg?.id === row?.original?.id
    );
    setAccountDetails((arg) => [
      ...arg.slice(0, row?.index),
      { ...rowIndex, module: value },
      ...arg.slice(row?.index + 1, accountDetails?.length),
    ]);
  };

  const addaccountDetails = () => {
    setAccountDetails((prev) => [
      ...prev,
      { id: crypto.randomUUID(), module: null, agreedAmount: null, cost: null },
    ]);
  };

  const handleDeleteInstallment = (index) => {
    setAccountDetails((prev) => [...prev.filter((item, i) => i !== index)]);
  };

  const { mutate } = useMutation(postData, {
    onSuccess() {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      navigate("/admin/account");
      refetchAccountList();
    },
    onError() {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });

  async function postData(payload) {
    if (data?.id) {
      await axios.put(`${API_URL}/accounts/${payload?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/accounts`, payload);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      ...data,
      accountDetails: accountDetails?.map((item) => ({
        ...item,
        document: "",
      })),
      clientId: Number(selectedStudent?.clientId),
      amount: accountDetails.reduce((a, b) => a + (Number(b.amount) || 0), 0),
    });
  };

  const handleOpenEyeModal = () => {
    setOpenEyeModal({ state: !openEyeModal?.state, id: 1 });
  };
  const item = 1;

  const columns = useMemo(
    () => [
      {
        header: "Module",
        size: 150,
        Cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2 text-left py-2 z-[999]">
              {row?.original?.module?.value === "Admission" && (
                <Visibility
                  className="cursor-pointer"
                  onClick={handleOpenEyeModal}
                />
              )}

              <Autocomplete
                size="small"
                options={options}
                sx={{ width: 200 }}
                onChange={(e, value) => {
                  handleAutoCompleteChange(value, row);
                }}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Type" />
                )}
                value={row?.original?.module || null}
                isOptionEqualToValue={(options, value) =>
                  options?.value === value?.value
                }
              />
            </div>
          );
        },
      },

      {
        accessorKey: "agreedAmount", //normal accessorKey
        header: "Agreed",
        size: 50,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <div>
              <InputField
                type="number"
                name="agreedAmount"
                placeholder="Agreed Amount"
                onChange={(e) => handleInputChange(e, row)}
                value={row?.original?.agreedAmount}
                className="min-w-[100px]"
              />
            </div>
          );
        },
      },

      {
        accessorKey: "cost" || 0,
        header: "Cost",
        size: 50,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="cost"
              placeholder="Kothar Cost"
              onChange={(e) => handleInputChange(e, row)}
              value={row?.original?.cost}
              className="min-w-[100px]"
            />
          );
        },
      },

      {
        accessorKey: "paidAmount", //normal accessorKey
        header: "Paid",
        size: 150,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="paidAmount"
              placeholder="Paid Amount"
              size="small"
              onChange={(e) => handleInputChange(e, row)}
              value={row?.original?.paidAmount}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "dueAmount", //normal accessorKey
        header: "Due",
        size: 50,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="dueAmount"
              placeholder="Due Amount"
              size="small"
              onChange={(e) => handleInputChange(e, row)}
              value={row?.original?.dueAmount}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "referral",
        header: "Referral",
        size: 100,
        Cell: ({ row }) => {
          return (
            <InputField
              type="text"
              name="referral"
              placeholder="Referral"
              size="small"
              onChange={(e) => handleInputChange(e, row)}
              value={row?.original?.referral}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "profitLoss",
        header: "Profit Loss",
        size: 150,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="profitLoss"
              placeholder="Profit/Loss"
              size="small"
              onChange={(e) => handleInputChange(e, row)}
              value={row?.original?.profitLoss}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 150,
        Cell: ({ row }) => {
          return (
            <>
              <div className="flex items-center">
                <Tooltip title="Delete Course" arrow>
                  <IconButton
                    onClick={() => handleDeleteInstallment(row?.index)}
                  >
                    <AiFillDelete className="text-red-600 cursor-pointer" />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          );
        },
      },
    ],
    [accountDetails]
  );

  const subColumns = useMemo(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        size: 150,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <InputField
              type="date"
              name="date"
              placeholder="Date"
              size="small"
              onChange={(e) => handleInputChange(e, row)}
              value={item?.date}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "term",
        header: "Term",
        size: 50,
        Cell: ({ row, renderedCellValue }) => {
          return row?.index + 1;
        },
      },
      {
        accessorKey: "perSemCost", //normal accessorKey
        header: "Per Sem Fee",
        size: 50,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <div>
              <InputField
                type="number"
                name="perSemFee"
                placeholder="Per Sem Fee"
                onChange={(e) => handleInputChange(e, row?.name)}
                value={item?.perSemFee}
                className="min-w-[100px]"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "perSemCost", //normal accessorKey
        header: "Per Sem Cost",
        size: 50,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <div>
              <InputField
                type="number"
                name="perSemCost"
                placeholder="Per Sem Cost"
                onChange={(e) => handleInputChange(e, row?.name)}
                value={item?.perSemCost}
                className="min-w-[100px]"
              />
            </div>
          );
        },
      },

      {
        accessorKey: "materialFee" || 0,
        header: "Material Fee",
        size: 50,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="materialFee"
              placeholder="Material Fee"
              onChange={(e) => handleInputChange(e, row?.materialFee)}
              value={item?.materialFee}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "paid", //normal accessorKey
        header: "Paid",
        size: 150,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="paidAmount"
              placeholder="Paid Amount"
              size="small"
              onChange={(e) => handleInputChange(e, row)}
              value={item?.paidAmount}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "due", //normal accessorKey
        header: "Due",
        size: 50,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="dueAmount"
              placeholder="Due Amount"
              size="small"
              onChange={(e) => handleInputChange(e, row)}
              value={item?.dueAmount}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "referral",
        header: "Referral",
        size: 100,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <InputField
              type="text"
              name="referral"
              placeholder="Referral"
              size="small"
              onChange={(e) => handleInputChange(e, row)}
              value={item?.referral}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "profitLoss",
        header: "Profit Loss",
        size: 150,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <InputField
              type="number"
              name="profitLoss"
              placeholder="Profit/Loss"
              size="small"
              onChange={(e) => handleInputChange(e, row)}
              value={item?.profitLoss}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "Action",
        header: "Action",
        size: 150,
        Cell: ({ row, renderedCellValue }) => {
          const item = row.original;
          return (
            <>
              <div className="flex items-center">
                <Tooltip title="Delete Course" arrow>
                  <IconButton
                    onClick={() => handleDeleteStudentDetails(row?.index)}
                  >
                    <AiFillDelete className="text-red-600 cursor-pointer" />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          );
        },
      },
    ],
    []
  );

  const secondTable = useMaterialReactTable({
    columns: subColumns,
    data: studentDetails,
    enablePagination: false,
    initialState: {
      density: "compact",
    },
    enableColumnPinning: true,
    muiTableContainerProps: {
      sx: { height: "300px", maxHeight: "800px", borderWidth: "0px" },
    },
    // enableExpandAll: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        startIcon={<FaPlusCircle />}
        onClick={addStudentDetails}
      >
        Add More Entries
      </Button>
    ),
  });

  const table = useMaterialReactTable({
    columns,
    data: accountDetails,
    enablePagination: false,
    enableRowNumbers: true,
    initialState: {
      density: "compact",
      enableGlobalFilter: true,
      showGlobalFilter: true,
    },
    muiTableContainerProps: {
      sx: { minHeight: "400px", maxHeight: "50vh" },
    },
    renderDetailPanel: ({ row }) => (
      <>
        {row?.original?.module?.value === "Admission" && (
          <MaterialReactTable table={secondTable} />
        )}
      </>
    ),
  });

  const totalAmountAfterDiscount = () => {
    let totalAmount = 0;
    let priceAfterDiscount = 0;
    accountDetails?.forEach((item) => {
      totalAmount = totalAmount + Number(item?.amount);
    });
    priceAfterDiscount =
      totalAmount - (Number(data?.discount) / 100) * totalAmount;
    return Number(priceAfterDiscount.toFixed(3)) || 0;
  };

  return (
    <div className="flex flex-wrap mt-4 dashBody">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded min-h-[70vh]  " +
            (color === "light" ? "bg-white" : "bg-sky-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-b">
            <div className="flex items-center justify-between">
              <IoArrowBack
                className="text-xl cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <h1 className="text-2xl uppercase font-bold mb-2 flex-1 text-center">
                Account Details
              </h1>
            </div>
          </div>
          <div className="block w-full overflow-x-auto mt-2">
            <div className="px-4">
              <div className="container mx-auto px-2 py-1">
                <div className="flex flex-col space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-5">
                    <div className="lg:px-2">
                      <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold mb-2">
                          Client: {selectedStudent?.name}
                        </h2>
                        <p className="mb-2">
                          Address: {selectedStudent?.address}
                        </p>
                        <p className="mb-2">
                          Contact: {selectedStudent?.number}
                        </p>
                        <p className="mb-2">
                          Case Officer: {selectedStudent?.caseOfficer}
                        </p>
                        <p className="mb-2">
                          Referral: {selectedStudent?.referral}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-xl font-semibold mb-2 underline">
                        Payment Details
                      </h2>
                      <div className="flex gap-2 items-center ">
                        <span className="w-[250px]">Total amount paid:</span>
                        <OutlinedInput
                          name="amountPaidByStudent"
                          placeholder="Amount in AUD"
                          type="number"
                          size="small"
                          startAdornment={"$"}
                          value={data?.amountPaidByStudent}
                          onChange={(e) =>
                            setData({
                              ...data,
                              amountPaidByStudent: e.target.value,
                            })
                          }
                          variant="standard"
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="w-[250px]">Agent Cost:</span>
                        <OutlinedInput
                          name="agentCost"
                          className="col-span-2"
                          placeholder="Amount in AUD"
                          type="number"
                          size="small"
                          startAdornment={"$"}
                          value={data?.agentCost}
                          onChange={(e) =>
                            setData({ ...data, agentCost: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex gap-2 items-center ">
                        <span className="w-[250px]">Due Amount:</span>
                        <OutlinedInput
                          name="dueAmount"
                          placeholder="Amount in AUD"
                          type="number"
                          size="small"
                          startAdornment={"$"}
                          value={data?.dueAmount}
                          onChange={(e) =>
                            setData({
                              ...data,
                              dueAmount: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex gap-2 items-center ">
                        <span className="w-[250px]">Total Profit/Loss:</span>
                        <OutlinedInput
                          name="profitLoss"
                          placeholder="Amount in AUD"
                          type="number"
                          size="small"
                          startAdornment={"$"}
                          value={data?.profitLoss}
                          onChange={(e) =>
                            setData({
                              ...data,
                              profitLoss: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto min-h-[400px]">
                    <MaterialReactTable table={table} />

                    <div
                      colSpan={"20"}
                      className="w-full flex justify-between border text-left px-4 py-2"
                    >
                      <Button
                        variant="contained"
                        startIcon={<FaPlusCircle />}
                        onClick={addaccountDetails}
                      >
                        Add More Entries
                      </Button>{" "}
                      <Button variant="contained" onClick={handleSubmit}>
                        Submit
                      </Button>
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
      {openEyeModal && (
        <EyeModal {...{ open: openEyeModal, setOpen: setOpenEyeModal }} />
      )}
    </div>
  );
};

export default AddAccounts;

{
  /* <table className="table-auto w-full">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border px-4 py-2">SN</th>
                            <th className="border px-4 py-2">Module</th>
                            <th className="border px-4 py-2">Agreed</th>
                            <th className="border px-4 py-2">Cost</th>
                            <th className="border px-4 py-2">Paid</th>
                            <th className="border px-4 py-2">Due</th>
                            <th className="border px-4 py-2">Referral</th>
                            <th className="border px-4 py-2">Profit/Loss</th>
                            <th className="border px-4 py-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accountDetails?.map((item, index) => (
                            <tr key={item?.index}>
                              <td className="border text-center px-4 py-2">
                                {index + 1}
                              </td>
                              <td className="border flex items-center gap-2 text-left px-4 py-2">
                                {selectedType?.value === "Admission" && (
                                  <KeyboardArrowDown className="cursor-pointer" />
                                )}
                                <Visibility
                                  className="cursor-pointer"
                                  onClick={handleOpenEyeModal}
                                />
                                <Autocomplete
                                  size="small"
                                  disablePortal
                                  options={options}
                                  sx={{ width: 200 }}
                                  onChange={(e, value) => {
                                    // setSelectedStudent(null);
                                  }}
                                  getOptionLabel={(option) => option.label}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      placeholder="Select Type"
                                    />
                                  )}
                                  value={selectedType}
                                  isOptionEqualToValue={(options, value) =>
                                    options?.value === value?.value
                                  }
                                />
                              </td>
                              <td className="border text-center px-4 py-2 min-w-[150px]">
                                <InputField
                                  type="number"
                                  name="agreedAmount"
                                  placeholder="Agreed Amount"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.agreedAmount}
                                  className="min-w-[100px]"
                                />
                              </td>
                              <td className="border text-center  px-4 py-2 min-w-[150px]">
                                <InputField
                                  type="number"
                                  name="cost"
                                  placeholder="Kothar Cost"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.method}
                                  className="min-w-[100px]"
                                />
                              </td>
                              <td className="border text-center px-4 py-2 min-w-[150px]">
                                <InputField
                                  type="number"
                                  name="paidAmount"
                                  placeholder="Paid Amount"
                                  size="small"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.paidAmount}
                                  className="min-w-[100px]"
                                />
                              </td>
                              <td className="border text-center px-4 py-2 min-w-[150px]">
                                <InputField
                                  type="number"
                                  name="dueAmount"
                                  placeholder="Due Amount"
                                  size="small"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.dueAmount}
                                  className="min-w-[100px]"
                                />
                              </td>
                              <td className="border text-center px-4 py-2 min-w-[150px]">
                                <InputField
                                  type="text"
                                  name="referral"
                                  placeholder="Referral"
                                  size="small"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.referral}
                                  className="min-w-[100px]"
                                />
                              </td>
                              <td className="border text-center px-4 py-2 min-w-[150px]">
                                <InputField
                                  type="number"
                                  name="profitLoss"
                                  placeholder="Profit/Loss"
                                  size="small"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.profitLoss}
                                  className="min-w-[100px]"
                                />
                              </td>
                              <td className="border text-center px-4 py-2">
                                <div className="flex items-center">
                                  <Tooltip title="Delete Course" arrow>
                                    <IconButton
                                      onClick={() =>
                                        handleDeleteInstallment(index)
                                      }
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
                                onClick={addaccountDetails}
                              >
                                Add More Entries
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table> */
}

{
  /* <form className="flex items-center justify-center gap-2 w-full  rounded mr-3">
                <Autocomplete
                  size="small"
                  disablePortal
                  options={options}
                  sx={{ width: 300 }}
                  onChange={(e, value) => {
                    setSelectedStudent(null);
                  }}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Type" />
                  )}
                  value={selectedType}
                  isOptionEqualToValue={(options, value) =>
                    options?.value === value?.value
                  }
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  options={getClientOption()}
                  sx={{ width: 500 }}
                  getOptionLabel={(option) => `${option.name}`}
                  getOptionKey={(option) => option.clientId}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Search using Name" />
                  )}
                  onChange={(e, value) => {
                    setSelectedStudent(value);
                  }}
                  value={selectedStudent}
                />

                <Button variant="contained">Search </Button>
              </form> */
}
{
  /* <td
                                className={
                                  `border text-center px-4 py-2 ` +
                                  (accountDetails[index]?.claimed?.value === "yes"
                                    ? "min-w-[300px]"
                                    : `min-w-[150px]`)
                                }
                              >
                                <div className="flex items-center gap-4">
                                  <Autocomplete
                                    onChange={(e, value) => {
                                      const row = accountDetails.find(
                                        (item, i) => i === index
                                      );
                                      setAccountDetails((prevState) => [
                                        ...prevState?.slice(0, index),
                                        { ...row, claimed: value },
                                        ...prevState?.slice(
                                          index + 1,
                                          accountDetails.length
                                        ),
                                      ]);
                                    }}
                                    isOptionEqualToValue={(options, value) =>
                                      options.value === value.value
                                    }
                                    value={[
                                      {
                                        label: "Yes",
                                        value: "Yes",
                                      },
                                      { label: "No", value: "No" },
                                    ]?.find(
                                      (arg) => arg?.value === item?.claimed
                                    )}
                                    name="claimed"
                                    size="small"
                                    required
                                    options={[
                                      {
                                        label: "Yes",
                                        value: "Yes",
                                      },
                                      { label: "No", value: "No" },
                                    ]}
                                    disablePortal
                                    renderInput={(params) => (
                                      <TextField {...params} label="Yes/No" />
                                    )}
                                    className="min-w-[100px]"
                                    ListboxProps={{
                                      style: {
                                        maxHeight: "180px",
                                      },
                                    }}
                                  />
                                  {item?.claimed?.value === "yes" && (
                                    <InputField
                                      type="text"
                                      name="commission"
                                      placeholder="Enter Commission"
                                      onChange={(e) =>
                                        handleInputChange(e, index)
                                      }
                                      value={item?.commission}
                                    />
                                  )}
                                </div>
                              </td> */
}
{
  /* <td className="border text-center px-4 py-2 min-w-[150px]">
                                <InputField
                                  type="text"
                                  name="caseOfficer"
                                  placeholder="Case Officer"
                                  size="small"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.caseOfficer}
                                />
                              </td> */
}
{
  /* <td className="border text-center px-4 py-2 min-w-[150px]">
                                <InputField
                                  type="number"
                                  name="agentCost"
                                  placeholder="Agent Cost"
                                  size="small"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.agentCost}
                                />
                              </td>
                              <td className="border text-center px-4 py-2 min-w-[150px]">
                                <InputField
                                  type="text"
                                  name="status"
                                  placeholder="Status"
                                  size="small"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.status}
                                  className="min-w-[250px]"
                                />
                              </td> */
}

{
  /* <div className="flex items-center gap-2">
                          <span className="w-[250px]">Commission Claimed:</span>

                          <Autocomplete
                            onChange={(e, value) =>
                              setData({ ...data, isClaimed: value?.value })
                            }
                            isOptionEqualToValue={(options, value) =>
                              options?.value === value?.value
                            }
                            value={[
                              {
                                label: "Yes",
                                value: "Yes",
                              },
                              { label: "No", value: "No" },
                            ]?.find((arg) => arg?.value === data?.isClaimed)}
                            name="claimed"
                            size="small"
                            required
                            options={[
                              {
                                label: "Yes",
                                value: "Yes",
                              },
                              { label: "No", value: "No" },
                            ]}
                            disablePortal
                            renderInput={(params) => (
                              <TextField {...params} label="Yes/No" />
                            )}
                            className="min-w-[100px]"
                            ListboxProps={{
                              style: {
                                maxHeight: "180px",
                              },
                            }}
                          />
                          {data?.isClaimed === "Yes" && (
                            <OutlinedInput
                              name="commission"
                              placeholder="Amount in AUD"
                              type="number"
                              size="small"
                              startAdornment={"$"}
                              value={data?.commission}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  commission: e.target.value,
                                })
                              }
                            />
                          )}
                          {data?.isClaimed === "No" && (
                            <OutlinedInput
                              name="reminderDate"
                              placeholder="Amount in AUD"
                              type="date"
                              size="small"
                              value={data?.reminderDate}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  reminderDate: e.target.value,
                                })
                              }
                            />
                          )}
                        </div> */
}

{
  /* <div className=" flex items-center gap-2">
                          <span> Due Date: </span>
                          <OutlinedInput
                            type="date"
                            size="small"
                            sx={{ width: "50%" }}
                            name="dueDate"
                            onChange={(e) =>
                              setData({ ...data, dueDate: e.target.value })
                            }
                            value={data?.dueDate}
                          />
                        </div> */
}
