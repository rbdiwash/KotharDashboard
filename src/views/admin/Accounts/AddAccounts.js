import {
  ConstructionOutlined,
  KeyboardArrowDown,
  Visibility,
} from "@mui/icons-material";
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
import { studentInitialValue } from "const/constants";
import { useReducer } from "react";
import { useCallback } from "react";

const AddAccounts = ({ color = "light" }) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [accountDetails, setAccountDetails] = useState([
    {
      uuid: crypto.randomUUID(),
      module: { label: "RPL", value: "RPL" },
      agreedAmount: "",
      cost: "",
      dueAmount: "",
      referral: "",
      profitLoss: "",
      paidAmount: "",
      admissionValues: studentInitialValue,
      admissionDetails: null,
    },
  ]);

  const [studentDetails, setStudentDetails] = useState([
    { uuid: crypto.randomUUID() },
  ]);
  const [studentValues, setStudentValues] = useState(studentInitialValue);

  const [data, setData] = useState({
    clientData: null,
  });
  const [{ accountData }, { refetchAccountList, getIndividualAccountData }] =
    useKothar();
  const [openEyeModal, setOpenEyeModal] = useState({
    state: false,
    uuid: null,
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

  useEffect(() => {
    if (state) {
      setData({ ...data, clientData: state?.item?.clientData });
      state?.item?.hasAccountDetails &&
        getIndividualAccountData(state?.item?.clientAccountId);
    }
  }, [state]);

  useEffect(() => {
    if (accountData) {
      setAccountDetails(accountData?.accountDetails || accountDetails);
    }
  }, [accountData]);
  console.log(accountData);
  const deleteData = () => {
    axios
      .delete(`${API_URL}/organization/delete/${openConfirmationModal?.uuid}`)
      .then((res) => {
        toast.success(res?.data?.message || "Data Deleted Successfully");
        setOpenConfirmationModal({ state: false, uuid: null });
        refetchAccountList();
      })
      .catch((err) => {
        toast.error("Error Deleting Data");
      });
  };

  const handleInputChange = (e, row) => {
    const { name, value } = e.target;
    const foundRow = accountDetails.find(
      (item, i) => item?.uuid === row?.original?.uuid
    );
    setAccountDetails((prevState) => [
      ...prevState?.slice(0, row?.index),
      { ...foundRow, [name]: value },
      ...prevState?.slice(row?.index + 1, accountDetails?.length),
    ]);
  };

  const handleSubInputChange = (e, row) => {
    const { name, value } = e.target;
    const foundRow = studentDetails.find(
      (item, i) => item?.uuid === row?.original?.uuid
    );
    setStudentDetails((prevState) => [
      ...prevState?.slice(0, row?.index),
      { ...foundRow, [name]: value },
      ...prevState?.slice(row?.index + 1, studentDetails?.length),
    ]);
  };

  const addStudentDetails = () => {
    setStudentDetails((prev) => [
      ...prev,
      { index: prev?.length + 1, uuid: crypto.randomUUID() },
    ]);
  };

  const handleDeleteStudentDetails = (index) => {
    setStudentDetails((prev) => [...prev.filter((item, i) => i !== index)]);
  };

  const handleAutoCompleteChange = (value, row) => {
    const rowIndex = accountDetails.find(
      (arg) => arg?.uuid === row?.original?.uuid
    );
    setAccountDetails((arg) => [
      ...arg.slice(0, row?.index),
      {
        ...rowIndex,
        module: value?.value,
        agreedAmount: "",
        cost: "",
        dueAmount: "",
        referral: "",
        profitLoss: "",
        paidAmount: "",
      },
      ...arg.slice(row?.index + 1, accountDetails?.length),
    ]);
  };

  const addaccountDetails = () => {
    setAccountDetails((prev) => [
      ...prev,
      {
        uuid: crypto.randomUUID(),
        module: null,
        agreedAmount: null,
        cost: null,
      },
    ]);
  };

  const handleDeleteInstallment = (index) => {
    setAccountDetails((prev) => [...prev.filter((item, i) => i !== index)]);
  };

  const { mutate } = useMutation(postData, {
    onSuccess() {
      toast.success(
        state?.item?.hasAccountDetails
          ? "Data updated Successfully"
          : "Data added Successfully"
      );
      // navigate("/admin/account");
      refetchAccountList();
      getIndividualAccountData(state?.item?.clientAccountId);
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
      await axios.put(`${API_URL}/accounts/${payload?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/accounts`, payload);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: accountData?.id || data?.clientAccountId,
      uuid: data?.uuid,
      clientId: data?.clientData?.id,
      caseOfficer: "string",
      referral: "string",
      totalAmount: getTotalValue("paidAmount"),
      agentCost: getTotalValue("referral"),
      dueAmount: getTotalValue("dueAmount"),
      profitLoss: getTotalValue("profitLoss"),
      accountDetails: accountDetails.map((item, index) => ({
        uuid: item?.uuid,
        module: item?.module,
        admissionValues: item?.module === "Admission" ? studentValues : null,
        admissionDetails: item?.module === "Admission" ? studentDetails : null,
        agreedAmount: item?.agreedAmount,
        cost: item?.cost,
        paidAmount: item?.paidAmount,
        dueAmount: item?.dueAmount,
        dueDate: item?.dueDate,
        profitLoss: item?.profitLoss,
        referral: item?.referral,
      })),
    };

    mutate(payload);
  };

  const handleOpenEyeModal = (rowData) => {
    setOpenEyeModal({
      state: true,
      uuid: rowData?.original.uuid,
      index: rowData?.index,
      value: rowData?.original?.admissionValues,
      id: rowData?.original?.id,
    });
    setStudentValues(rowData?.original?.admissionValues);
  };

  const columns = useMemo(
    () => [
      {
        header: "Module",
        size: 150,
        Cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2 text-left py-2 z-[999]">
              {row?.original?.module === "Admission" && (
                <Visibility
                  className="cursor-pointer"
                  onClick={() => handleOpenEyeModal(row)}
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
                value={
                  options.find(
                    (item) => item?.value === row?.original?.module
                  ) || null
                }
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
              type="number"
              name="referral"
              placeholder="Referral Cost"
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
        header: "Date",
        size: 150,
        Cell: ({ row }) => {
          return (
            <InputField
              type="date"
              name="date"
              placeholder="Date"
              size="small"
              onChange={(e) => handleSubInputChange(e, row)}
              value={row?.original?.date}
              className="min-w-[100px]"
            />
          );
        },
      },
      {
        accessorKey: "term",
        header: "Term",
        size: 50,
        Cell: ({ row }) => {
          return row?.index + 1;
        },
      },
      {
        accessorKey: "perSemFee",
        header: "Per Sem Fee",
        size: 50,
        Cell: ({ row }) => {
          return (
            <div>
              <InputField
                type="number"
                name="perSemFee"
                placeholder="Per Sem Fee"
                onChange={(e) => handleSubInputChange(e, row)}
                value={row?.original?.perSemFee}
                className="min-w-[100px]"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "perSemCost",
        header: "Per Sem Cost",
        size: 50,
        Cell: ({ row }) => {
          return (
            <div>
              <InputField
                type="number"
                name="perSemCost"
                placeholder="Per Sem Cost"
                onChange={(e) => handleSubInputChange(e, row)}
                value={row?.original?.perSemCost}
                className="min-w-[100px]"
              />
            </div>
          );
        },
      },

      {
        accessorKey: "materialFee",
        header: "Material Fee",
        size: 50,
        Cell: ({ row }) => {
          return (
            <InputField
              type="number"
              name="materialFee"
              placeholder="Material Fee"
              onChange={(e) => handleSubInputChange(e, row)}
              value={row?.original?.materialFee}
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
              onChange={(e) => handleSubInputChange(e, row)}
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
              onChange={(e) => handleSubInputChange(e, row)}
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
              onChange={(e) => handleSubInputChange(e, row)}
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
              onChange={(e) => handleSubInputChange(e, row)}
              value={row?.original?.profitLoss}
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
    [studentDetails, accountData]
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
    renderTopToolbarCustomActions: ({ table }) => (
      <div className="flex justify-start items-center gap-12">
        <h1 className="text-xl font-normal"> Installment Entries</h1>
        <Button
          variant="contained"
          startIcon={<FaPlusCircle />}
          onClick={addStudentDetails}
        >
          Add More Entries
        </Button>
      </div>
    ),
  });

  const table = useMaterialReactTable({
    columns,
    data: accountDetails,
    enablePagination: false,
    enableRowNumbers: true,
    initialState: {
      density: "compact",
      enableGlobalFilter: false,
      showGlobalFilter: false,
    },
    muiTableContainerProps: {
      sx: { minHeight: "400px", maxHeight: "50vh" },
    },

    renderDetailPanel: ({ row }) => (
      <>
        {row?.original?.module === "Admission" && (
          <MaterialReactTable table={secondTable} />
        )}
      </>
    ),
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => {
        table.setExpanded({ [row.id]: !row.getIsExpanded() });
        console.log(row?.original?.admissionDetails);
        setStudentDetails(row?.original?.admissionDetails);
      }, //set only this row to be expanded
    }),
  });

  const getTotalValue = useCallback(
    (key) => {
      const total = accountDetails?.reduce(
        (total, amount) => Number(total) + Number(amount?.[key]),
        0
      );
      return total;
    },
    [accountDetails]
  );

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
                  <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-5">
                    <div className="lg:px-2">
                      <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold mb-2">
                          Client: {data?.clientData?.name}
                        </h2>
                        <p className="mb-2">
                          Address: {data?.clientData?.address}
                        </p>
                        <p className="mb-2">
                          Contact: {data?.clientData?.number}
                        </p>
                        <p className="mb-2">
                          Case Officer: {data?.clientData?.caseOfficer}
                        </p>
                        <p className="mb-2">
                          Referral: {data?.clientData?.referral}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-xl font-semibold mb-2 underline">
                        Payment Details
                      </h2>
                      <div className="flex gap-2 items-center ">
                        <span className="w-[200px]">Total amount paid:</span>
                        <OutlinedInput
                          name="amountPaidByStudent"
                          placeholder="Amount in AUD"
                          type="number"
                          size="small"
                          startAdornment={"$"}
                          value={getTotalValue("paidAmount")}
                          disabled
                          variant="standard"
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="w-[200px]">Agent Cost:</span>
                        <OutlinedInput
                          name="agentCost"
                          className="col-span-2"
                          placeholder="Amount in AUD"
                          type="number"
                          size="small"
                          startAdornment={"$"}
                          value={getTotalValue("cost")}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1 items-center mt-10">
                        <span className="w-[200px]">Due Amount:</span>
                        <OutlinedInput
                          name="dueAmount"
                          placeholder="Amount in AUD"
                          type="number"
                          size="small"
                          startAdornment={"$"}
                          value={getTotalValue("dueAmount")}
                          disabled
                        />
                      </div>
                      <div className="flex gap-1 items-center ">
                        <span className="w-[200px]">Total Profit/Loss:</span>
                        <OutlinedInput
                          name="profitLoss"
                          placeholder="Amount in AUD"
                          type="number"
                          size="small"
                          startAdornment={"$"}
                          value={getTotalValue("profitLoss")}
                          disabled
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
            setOpenConfirmationModal({ state: false, uuid: null })
          }
          handleDelete={() => deleteData()}
        />
      )}
      {openEyeModal && (
        <EyeModal
          {...{
            open: openEyeModal,
            setOpen: setOpenEyeModal,
            values: studentValues,
            setValues: setStudentValues,
            accountDetails,
            setAccountDetails,
          }}
        />
      )}
    </div>
  );
};

export default AddAccounts;
