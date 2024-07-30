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
import ProviderDialog from "./ProviderDialog";

const AddProvider = ({ color = "light" }) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [accountDetails, setAccountDetails] = useState([
    { module: { label: "RPL", value: "RPL" }, agreedAmount: null, cost: null },
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
  const [{ uniData }, { refetchAccountList }] = useKothar();
  const [openProviderDialog, setOpenProviderDialog] = useState({
    state: false,
    id: null,
  });
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
  const item = 1;

  const columns = useMemo(
    () => [
      {
        header: "Provider Name",
        size: 150,
        Cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2 text-left py-2 z-[999]">
              <Visibility
                className="cursor-pointer"
                onClick={handleOpenEyeModal}
              />

              <Autocomplete
                size="small"
                disablePortal
                options={uniData}
                sx={{ width: 200, zIndex: 999 }}
                onChange={(e, value) => {
                  // setSelectedStudent(null);
                  handleAutoCompleteChange(row, value);
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Provider" />
                )}
                value={row?.original?.provider || null}
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
        // accessorKey: "agreedAmount", //normal accessorKey
        header: "Agent Name",
        size: 50,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <div>
              <InputField
                type="number"
                name="agentName"
                placeholder="Agent Name"
                onChange={(e) => handleInputChange(e, row?.index)}
                value={row?.original?.agentName}
                className="min-w-[100px]"
              />
            </div>
          );
        },
      },

      {
        // accessorKey: "cost" || 0,
        header: "No of Students",
        size: 50,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="noOfStudents"
              placeholder="No of Students"
              onChange={(e) => handleInputChange(e, row?.index)}
              value={item?.noOfStudents}
              className="min-w-[100px]"
            />
          );
        },
      },

      {
        header: "Total Commission",
        size: 150,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="totalCommission"
              placeholder="Total Commission"
              size="small"
              onChange={(e) => handleInputChange(e, row?.index)}
              value={item?.totalCommission}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "totalBonus", //normal accessorKey
        header: "Total Bonus",
        size: 50,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="totalBonus"
              placeholder="Total Bonus"
              size="small"
              onChange={(e) => handleInputChange(e, row?.index)}
              value={item?.totalBonus}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "nextReminder",
        header: "Next Reminder",
        size: 100,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <InputField
              type="date"
              name="nextReminder"
              placeholder="Next Reminder"
              size="small"
              onChange={(e) => handleInputChange(e, row?.index)}
              value={item?.nextReminder}
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
        header: "Intake",
        size: 100,
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
      sx: { minHeight: "400px", maxHeight: "65vh" },
    },
    renderDetailPanel: ({ row }) => (
      <>
        <MaterialReactTable table={secondTable} />
      </>
    ),
  });

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

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const row = accountDetails.find((item, i) => i === index);
    setAccountDetails((prevState) => [
      ...prevState?.slice(0, index),
      { ...row, [name]: value },
      ...prevState?.slice(index + 1, accountDetails.length),
    ]);
  };

  const addStudentDetails = () => {
    setStudentDetails((prev) => [...prev, { index: prev.length + 1 }]);
  };

  const handleDeleteStudentDetails = (index) => {
    setStudentDetails((prev) => [...prev.filter((item, i) => i !== index)]);
  };

  const handleAutoCompleteChange = (row, value) => {
    const rowIndex = accountDetails.find(
      (_, index) => Number(index) === Number(row?.index)
    );
    setAccountDetails((arg) => [
      ...arg.slice(0, row?.index),
      { ...rowIndex, provider: value },
      arg.slice(row?.index + 1, accountDetails?.length - 1),
    ]);
  };

  const addaccountDetails = () => {
    setAccountDetails((prev) => [
      ...prev,
      { module: null, agreedAmount: null, cost: null },
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
    setOpenProviderDialog({ state: !openProviderDialog?.state, id: 1 });
  };

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
                  <div className="overflow-x-auto min-h-[400px]">
                    <MaterialReactTable table={table} />

                    <div className="w-full flex justify-between border text-left px-4 py-2">
                      <Button
                        variant="contained"
                        startIcon={<FaPlusCircle />}
                        onClick={addaccountDetails}
                      >
                        Add More Entries
                      </Button>
                      <Button variant="contained" onClick={handleSubmit}>
                        Submit
                      </Button>
                    </div>
                  </div>
                  {/* <div className="grid  gap-5 py-10">
                    <div className="col-span-1 ml-auto mt-auto">
                      <Button variant="contained" onClick={handleSubmit}>
                        Submit
                      </Button>
                    </div>
                  </div> */}
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
      {openProviderDialog && (
        <ProviderDialog
          {...{ open: openProviderDialog, setOpen: setOpenProviderDialog }}
        />
      )}
    </div>
  );
};

export default AddProvider;
