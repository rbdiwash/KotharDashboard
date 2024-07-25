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
import EyeDrawer from "./EyeDrawer";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import EyeModal from "./EyeDrawer";

const AddAccounts = ({ color = "light" }) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [installments, setInstallments] = useState([{ index: 1 }]);
  const [studentDetails, setStudentDetails] = useState([{ index: 1 }]);
  const [selectedType, setSelectedType] = useState(null);
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
  const [
    { rplList, studentList, visaList, skillList, insuranceList },
    { refetchAccountList },
  ] = useKothar();
  const [openEyeModal, setOpenEyeModal] = useState({ state: false, id: null });
  const { state } = useLocation();
  const navigate = useNavigate();
  const options = [
    { label: "RPL", value: "RPL" },
    { label: "Student", value: "Student" },
    { label: "Visa", value: "Visa" },
    { label: "Insurance", value: "Insurance" },
    {
      label: "Skill Assessment",
      value: "Skill Assessment",
    },
  ];
  const item = 1;

  const columns = useMemo(
    () => [
      {
        header: "Module",
        size: 150,
        accessorKey: "clientName",
        Cell: ({ row, renderedCellValue }) => {
          return (
            <div className="flex items-center gap-2 text-left py-2 z-[999]">
              {selectedType?.value === "Student" && (
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
                sx={{ width: 200, zIndex: 999 }}
                onChange={(e, value) => {
                  setSelectedType(value);
                  // setSelectedStudent(null);
                }}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Type" />
                )}
                value={selectedType}
                isOptionEqualToValue={(options, value) =>
                  options?.value === value?.value
                }
                slotProps={{
                  popper: {
                    sx: {
                      zIndex: 1000,
                    },
                  },
                }}
                ListboxProps={{ style: { zIndex: 999 } }}
              />
            </div>
          );
        },
      },

      {
        accessorKey: "agreed", //normal accessorKey
        header: "Agreed",
        size: 50,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <div>
              <InputField
                type="number"
                name="agreedAmount"
                placeholder="Agreed Amount"
                onChange={(e) => handleInputChange(e, row?.index)}
                value={item?.agreedAmount}
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
              onChange={(e) => handleInputChange(e, row?.index)}
              value={item?.method}
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
              onChange={(e) => handleInputChange(e, row?.index)}
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
              onChange={(e) => handleInputChange(e, row?.index)}
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
              onChange={(e) => handleInputChange(e, row?.index)}
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
              onChange={(e) => handleInputChange(e, row?.index)}
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
    []
  );

  const subColumns = useMemo(
    () => [
      {
        accessorKey: "invoiceNo", //normal accessorKey
        header: "Invoice No",
        size: 50,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <div>
              <InputField
                type="number"
                name="invoiceNo"
                placeholder="Invoice Number"
                onChange={(e) => handleInputChange(e, row?.name)}
                value={item?.invoiceNumber}
                className="min-w-[100px]"
              />
            </div>
          );
        },
      },

      {
        accessorKey: "noOfStudents" || 0,
        header: "No of Students",
        size: 50,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="noOfStudents"
              placeholder="Number of Students"
              onChange={(e) => handleInputChange(e, row?.noOfStudents)}
              value={item?.noOfStudents}
              className="min-w-[100px]"
            />
          );
        },
      },

      {
        accessorKey: "commission", //normal accessorKey
        header: "Commission",
        size: 150,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="commission"
              placeholder="Commission"
              size="small"
              onChange={(e) => handleInputChange(e, row?.index)}
              value={item?.commission}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "bonus", //normal accessorKey
        header: "Bonus",
        size: 50,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="Bonus"
              placeholder="Bonus"
              size="small"
              onChange={(e) => handleInputChange(e, row?.index)}
              value={item?.Bonus}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "totalAmount",
        header: "Total Amount",
        size: 50,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <InputField
              type="text"
              name="totalAmount"
              placeholder="Total Amount"
              size="small"
              onChange={(e) => handleInputChange(e, row?.index)}
              value={item?.totalAmount}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "claimedDate",
        header: "Claimed Date",
        size: 150,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <InputField
              type="date"
              name="claimedDate"
              placeholder="Claimed Date"
              size="small"
              onChange={(e) => handleInputChange(e, row?.index)}
              value={item?.claimedDate}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "receivedAmount",
        header: "Received Amount",
        size: 50,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <InputField
              type="text"
              name="receivedAmount"
              placeholder="Received Amount"
              size="small"
              onChange={(e) => handleInputChange(e, row?.index)}
              value={item?.receivedAmount}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "receivedDate",
        header: "Received Date",
        size: 150,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <InputField
              type="date"
              name="receivedDate"
              placeholder="Received Date"
              size="small"
              onChange={(e) => handleInputChange(e, row?.index)}
              value={item?.claimedDate}
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
    enableRowNumbers: true,
    initialState: {
      density: "compact",
    },
    enableColumnPinning: true,
    muiTableContainerProps: {
      sx: { height: "300px", maxHeight: "800px", borderWidth: "0px" },
    },
    // enableExpandAll: true,
  });

  const table = useMaterialReactTable({
    columns,
    data: installments,
    enablePagination: false,
    enableRowNumbers: true,
    initialState: {
      density: "compact",
      enableGlobalFilter: true,
      showGlobalFilter: true,
    },
    muiTableContainerProps: {
      sx: { minHeight: "100px", maxHeight: "800px" },
    },
    renderDetailPanel: ({ row }) => (
      <>
        <MaterialReactTable table={secondTable} />
        <Button
          variant="contained"
          startIcon={<FaPlusCircle />}
          onClick={addStudentDetails}
        >
          Add More Entries
        </Button>
      </>
    ),
  });

  useEffect(() => {
    if (state) {
      setData({ ...state?.item });
      setSelectedType(
        options.find(
          (item) =>
            item?.value.toLowerCase() === state?.item?.type?.toLowerCase()
        )
      );
      setSelectedStudent({
        clientId: state?.item?.clientId,
        name: `${state?.item?.clientName}`,
        address: state?.item?.clientData?.address,
        number: state?.item?.clientData?.number,
      });
      setInstallments([
        ...state?.item?.installments.map((item) => ({
          ...item,
          date: item?.date?.split("T")[0],
        })),
      ]);
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

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const row = installments.find((item, i) => i === index);
    setInstallments((prevState) => [
      ...prevState?.slice(0, index),
      { ...row, [name]: value },
      ...prevState?.slice(index + 1, installments.length),
    ]);
  };

  const addStudentDetails = () => {
    setStudentDetails((prev) => [
      ...prev,
      { index: prev.length + 1, amount: 0 },
    ]);
  };

  const handleDeleteStudentDetails = (index) => {
    setStudentDetails((prev) => [...prev.filter((item, i) => i !== index)]);
  };

  const addInstallments = () => {
    setInstallments((prev) => [...prev, { index: prev.length + 1, amount: 0 }]);
  };

  const handleDeleteInstallment = (index) => {
    setInstallments((prev) => [...prev.filter((item, i) => i !== index)]);
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
      installments: installments.map((item) => ({
        ...item,
        document: "",
      })),
      clientId: Number(selectedStudent?.clientId),
      type: selectedType?.value,
      amount: installments.reduce((a, b) => a + (Number(b.amount) || 0), 0),
    });
  };

  const handleOpenEyeModal = () => {
    setOpenEyeModal({ state: !openEyeModal?.state, id: 1 });
  };

  const totalAmountAfterDiscount = () => {
    let totalAmount = 0;
    let priceAfterDiscount = 0;
    installments?.forEach((item) => {
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
          {selectedStudent?.clientId ? (
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
                            endAdornment={"AUD"}
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
                            endAdornment={"AUD"}
                            value={data?.agentCost}
                            onChange={(e) =>
                              setData({ ...data, agentCost: e.target.value })
                            }
                          />
                          {/* $
                        {installments
                          .reduce((a, b) => a + (Number(b.amount) || 0), 0)
                          .toFixed(2)} */}
                        </div>
                        <div className="flex gap-2 items-center ">
                          <span className="w-[250px]">Due Amount:</span>
                          <OutlinedInput
                            name="dueAmount"
                            placeholder="Amount in AUD"
                            type="number"
                            size="small"
                            endAdornment={"AUD"}
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
                            endAdornment={"AUD"}
                            value={data?.profitLoss}
                            onChange={(e) =>
                              setData({
                                ...data,
                                profitLoss: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* <div className="flex items-center gap-2">
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
                              endAdornment={"AUD"}
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
                        </div> */}

                        {/* <div className=" flex items-center gap-2">
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
                        </div> */}
                      </div>
                    </div>

                    <div className="overflow-x-auto min-h-[400px]">
                      <MaterialReactTable table={table} />

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
                            Add More Entries
                          </Button>
                        </td>
                      </tr>
                    </div>
                    <div className="grid  gap-5 py-10">
                      <div className="col-span-1 ml-auto mt-auto">
                        <Button variant="contained" onClick={handleSubmit}>
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full min-h-[70vh] ">
              Selected Student to continue...
            </div>
          )}
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
                          {installments?.map((item, index) => (
                            <tr key={item?.index}>
                              <td className="border text-center px-4 py-2">
                                {index + 1}
                              </td>
                              <td className="border flex items-center gap-2 text-left px-4 py-2">
                                {selectedType?.value === "Student" && (
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
                                    setSelectedType(value);
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
                                onClick={addInstallments}
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
                    setSelectedType(value);
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
                                  (installments[index]?.claimed?.value === "yes"
                                    ? "min-w-[300px]"
                                    : `min-w-[150px]`)
                                }
                              >
                                <div className="flex items-center gap-4">
                                  <Autocomplete
                                    onChange={(e, value) => {
                                      const row = installments.find(
                                        (item, i) => i === index
                                      );
                                      setInstallments((prevState) => [
                                        ...prevState?.slice(0, index),
                                        { ...row, claimed: value },
                                        ...prevState?.slice(
                                          index + 1,
                                          installments.length
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
