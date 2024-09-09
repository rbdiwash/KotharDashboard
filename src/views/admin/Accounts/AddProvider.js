import { AddCircle, KeyboardArrowDown, Visibility } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
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
import { monthsForFilter } from "const/constants";

const AddProvider = ({ color = "light" }) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [bonusEntries, setBonusEntries] = useState([
    { commission: "", bonus: "", total: "" },
  ]);
  const [data, setData] = useState({});
  const [intakeDetails, setIntakeDetails] = useState([
    {
      index: 1,
      uuid: crypto.randomUUID(),
      month: monthsForFilter[new Date().getMonth()].value,
      year: new Date().getFullYear(),
      invoiceNumber: null,
      noOfStudents: null,
      commission: null,
      bonus: null,
      amount: null,
      gstInclude: true,
      claimedDate: new Date(),
      receivedAmount: null,
      receivedDate: new Date(),
    },
  ]);

  const [accountEntries, setAccountEntries] = useState([
    {
      id: null,
      uuid: crypto.randomUUID(),
      providerId: "",
      agentName: "",
      noOfStudents: null,
      totalCommission: null,
      totalBonus: null,
      totalGST: null,
      nextReminder: new Date(),
      intakeDetails: intakeDetails,
      commissionDetails: bonusEntries,
    },
  ]);
  const { state } = useLocation();

  const [{}, { refetchAccountList, getIndividualProviderAccountData }] =
    useKothar();
  const [openProviderDialog, setOpenProviderDialog] = useState({
    state: false,
    uuid: null,
    index: null,
  });
  const navigate = useNavigate();

  const yearsForFilter = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() + 3 - i
  );

  useEffect(() => {
    if (state) {
      setData({ ...data, uniData: state?.item });
      state?.item?.hasAccountDetails &&
        getIndividualProviderAccountData(state?.item?.clientAccountId);
    }
  }, [state]);

  const item = 1;

  const columns = useMemo(
    () => [
      {
        header: "Provider",
        size: 100,
        Cell: ({ row }) => {
          return (
            <div className="flex gap-2 font-semibold">
              <Tooltip title="Add Commission Information" arrow>
                <AddCircle
                  className="cursor-pointer text-orange-400"
                  onClick={() => handleOpenEyeModal(row)}
                />
              </Tooltip>
              {data?.uniData?.universityName || "N/A"}
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
                type="text"
                name="agentName"
                placeholder="Agent Name"
                onChange={(e) => handleInputChange(e, row)}
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
              onChange={(e) => handleInputChange(e, row)}
              value={row?.original?.noOfStudents}
              className="min-w-[100px]"
            />
          );
        },
      },

      {
        accessorKey: "totalCommission",
        header: "Total Commission",
        size: 80,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="totalCommission"
              placeholder="Total Commission"
              size="small"
              onChange={(e) => handleInputChange(e, row)}
              value={row?.original?.totalCommission}
              className="min-w-[100px] "
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
              onChange={(e) => handleInputChange(e, row)}
              value={row?.original?.totalBonus}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "totalGST", //normal accessorKey
        header: "Total GST",
        size: 50,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="totalGST"
              placeholder="Total GST"
              size="small"
              onChange={(e) => handleInputChange(e, row)}
              value={row?.original?.totalGST}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "nextReminder",
        header: "Next Reminder",
        size: 80,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <InputField
              type="date"
              name="nextReminder"
              placeholder="Next Reminder"
              size="small"
              onChange={(e) => handleInputChange(e, row)}
              value={row?.original?.nextReminder}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "Action",
        header: "Action",
        size: 50,
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
    [accountEntries, openProviderDialog, state]
  );

  const subColumns = useMemo(
    () => [
      {
        accessorKey: "intake",
        header: "Intake",
        size: 150,
        Cell: ({ row }) => {
          return (
            <div className="flex items-center gap-0 text-left py-2">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Year
                </InputLabel>
                <Select
                  labelId="year-filter-label"
                  id="year-filter"
                  onChange={(e) => handleYearChange(e.target.value, row)}
                  label="Year"
                  value={row?.original?.year || ""}
                >
                  {yearsForFilter?.map((value, i) => (
                    <MenuItem value={value} key={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Month
                </InputLabel>
                <Select
                  labelId="month-filter-label"
                  id="month-filter"
                  onChange={(e) => handleMonthChange(e.target.value, row)}
                  label="Month"
                  value={row?.original?.month || ""}
                >
                  {monthsForFilter?.map(({ label, value }, i) => (
                    <MenuItem value={value} key={label}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                onChange={(e) => handleSubInputChange(e, row)}
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
              onChange={(e) => handleSubInputChange(e, row)}
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
              onChange={(e) => handleSubInputChange(e, row)}
              value={row?.original?.commission}
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
              name="bonus"
              placeholder="Bonus"
              size="small"
              onChange={(e) => handleSubInputChange(e, row)}
              value={row?.original?.bonus}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "totalAmount",
        header: "Total Amount",
        size: 50,
        Cell: ({ row }) => {
          return (
            <InputField
              type="text"
              name="totalAmount"
              placeholder="Total Amount"
              size="small"
              onChange={(e) => handleSubInputChange(e, row)}
              value={row?.original?.totalAmount}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "gst",
        header: "GST Include",
        size: 160,
        Cell: ({ row }) => {
          return (
            <FormControl sx={{ display: "flex", width: "100%" }}>
              <RadioGroup
                row
                name="gst"
                onChange={(e) => handleSubInputChange(e, row)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          );
        },
      },
      {
        accessorKey: "claimedDate",
        header: "Claimed Date",
        size: 150,
        Cell: ({ row }) => {
          return (
            <InputField
              type="date"
              name="claimedDate"
              placeholder="Claimed Date"
              size="small"
              onChange={(e) => handleSubInputChange(e, row)}
              value={row?.original?.claimedDate}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "receivedAmount",
        header: "Received Amount",
        size: 50,
        Cell: ({ row }) => {
          return (
            <InputField
              type="text"
              name="receivedAmount"
              placeholder="Received Amount"
              size="small"
              onChange={(e) => handleSubInputChange(e, row)}
              value={row?.original?.receivedAmount}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "receivedDate",
        header: "Received Date",
        size: 150,
        Cell: ({ row }) => {
          return (
            <InputField
              type="date"
              name="receivedDate"
              placeholder="Received Date"
              size="small"
              onChange={(e) => handleSubInputChange(e, row)}
              value={row?.original?.receivedDate}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "Action",
        header: "Action",
        size: 150,
        Cell: ({ row }) => {
          return (
            <>
              <div className="flex items-center">
                <Tooltip title="Delete Course" arrow>
                  <IconButton
                    onClick={() => handleDeleteIntakeDetails(row?.index)}
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
    [intakeDetails]
  );

  const secondTable = useMaterialReactTable({
    columns: subColumns,
    data: intakeDetails,
    enablePagination: false,
    enableRowNumbers: true,
    initialState: {
      density: "compact",
    },
    enableColumnPinning: true,
    muiTableContainerProps: {
      sx: { height: "300px", maxHeight: "800px", borderWidth: "0px" },
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        startIcon={<FaPlusCircle />}
        onClick={addIntakeEntries}
      >
        Add More Entries
      </Button>
    ),
  });

  const table = useMaterialReactTable({
    columns,
    data: accountEntries,
    enablePagination: false,
    enableRowNumbers: true,
    initialState: {
      density: "compact",
      enableGlobalFilter: false,
      showGlobalFilter: false,
    },
    muiTableContainerProps: {
      sx: { minHeight: "400px", maxHeight: "65vh" },
    },
    renderDetailPanel: ({ row }) => (
      <>
        <MaterialReactTable table={secondTable} />
      </>
    ),
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => {
        table.setExpanded({ [row.id]: !row.getIsExpanded() });
        setIntakeDetails(row?.original?.admissionDetails);
      }, //set only this row to be expanded
    }),
  });

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

  const handleYearChange = (e, row) => {
    const foundRow = intakeDetails?.find(
      (item, i) => item?.uuid === row?.original?.uuid
    );
    setIntakeDetails((prevState) => [
      ...prevState?.slice(0, row?.index),
      { ...foundRow, year: e },
      ...prevState?.slice(row?.index + 1, intakeDetails?.length),
    ]);
  };

  const handleMonthChange = (e, row) => {
    const foundRow = intakeDetails?.find(
      (item, i) => item?.uuid === row?.original?.uuid
    );
    setIntakeDetails((prevState) => [
      ...prevState?.slice(0, row?.index),
      { ...foundRow, month: e },
      ...prevState?.slice(row?.index + 1, intakeDetails?.length),
    ]);
  };

  const handleInputChange = (e, row) => {
    const { name, value } = e.target;
    const foundRow = accountEntries.find(
      (item, i) => item?.id === row?.original?.id
    );
    setAccountEntries((prevState) => [
      ...prevState?.slice(0, row?.index),
      { ...foundRow, [name]: value },
      ...prevState?.slice(row?.index + 1, accountEntries.length),
    ]);
  };

  const handleSubInputChange = (e, row) => {
    const { name, value } = e.target;
    const foundRow = intakeDetails?.find(
      (item, i) => item?.uuid === row?.original?.uuid
    );

    setIntakeDetails((prevState) => [
      ...prevState?.slice(0, row?.index),
      { ...foundRow, [name]: value },
      ...prevState?.slice(row?.index + 1, intakeDetails?.length),
    ]);
  };

  const addIntakeEntries = () => {
    setIntakeDetails((prev) => [
      ...prev,
      {
        uuid: crypto.randomUUID(),
        month: monthsForFilter[new Date().getMonth()].value,
        year: new Date().getFullYear(),
      },
    ]);
  };

  const handleDeleteIntakeDetails = (index) => {
    setIntakeDetails((prev) => [...prev.filter((item, i) => i !== index)]);
  };

  const addAccountEntries = () => {
    setAccountEntries((prev) => [
      ...prev,
      {
        module: null,
        agreedAmount: null,
        cost: null,
        uuid: crypto.randomUUID(),
        commissionDetails: bonusEntries,
      },
    ]);
  };

  const handleDeleteInstallment = (index) => {
    setAccountEntries((prev) => [...prev.filter((item, i) => i !== index)]);
  };

  const { mutate } = useMutation(postData, {
    onSuccess() {
      toast.success(
        state?.item?.hasAccountDetails
          ? "Data updated Successfully"
          : "Data added Successfully"
      );
      navigate("/admin/account");
      refetchAccountList();
    },
    onError() {
      toast.error(
        state?.item?.hasAccountDetails
          ? "Error Updating Data"
          : "Error Submitting Data"
      );
    },
  });

  async function postData(payload) {
    if (state?.item?.hasAccountDetails) {
      await axios.put(`${API_URL}/accounts/provider/${payload?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/accounts/provider  `, payload);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      providerId: state?.item?.id,
      accountEntries: accountEntries.map((arg) => ({
        ...arg,
        intakeDetails: intakeDetails,
      })),
    };
    console.log(payload);
    mutate(payload);
  };

  const handleOpenEyeModal = (row) => {
    setOpenProviderDialog({
      state: !openProviderDialog?.state,
      uuid: row?.original?.uuid,
      index: row?.index,
    });
    setBonusEntries(row?.original?.commissionDetails);
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
                        onClick={addAccountEntries}
                      >
                        Add More Entries
                      </Button>
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
            setOpenConfirmationModal({ state: false, uuid: null })
          }
          handleDelete={() => deleteData()}
        />
      )}
      {openProviderDialog && (
        <ProviderDialog
          {...{
            open: openProviderDialog,
            setOpen: setOpenProviderDialog,
            bonusEntries,
            setBonusEntries,
            setAccountEntries,
            accountEntries,
          }}
        />
      )}
    </div>
  );
};

export default AddProvider;
