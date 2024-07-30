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
  const [{ refetchAccountList }] = useKothar();
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
        Cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2 text-left py-2 z-[999]">
              {row?.original?.module?.value === "Student" && (
                <Visibility
                  className="cursor-pointer"
                  onClick={handleOpenEyeModal}
                />
              )}

              <Autocomplete
                size="small"
                disablePortal
                options={options}
                sx={{ width: 200, zIndex: 999 }}
                onChange={(e, value) => {
                  // setSelectedStudent(null);
                  handleAutoCompleteChange(row, value);
                }}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Type" />
                )}
                value={row?.original?.module || null}
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
                value={row?.original?.agreedAmount}
                className="min-w-[100px]"
              />
            </div>
          );
        },
      },

      {
        // accessorKey: "cost" || 0,
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
      sx: { minHeight: "400px", maxHeight: "800px" },
    },
    renderDetailPanel: ({ row }) => (
      <>
        {row?.original?.module?.value === "Student" && (
          <MaterialReactTable table={secondTable} />
        )}
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
    console.log("🚀  index:", index);
    const { name, value } = e.target;
    const row = accountDetails.find((item, i) => i === index);
    console.log("🚀  row:", row);
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
    console.log(accountDetails, row);

    debugger;
    const rowIndex = accountDetails.find(
      (_, index) => Number(index) === Number(row?.index)
    );
    console.log("🚀  rowIndex:", rowIndex);
    setAccountDetails((arg) => [
      ...arg.slice(0, row?.index),
      { ...rowIndex, module: value },
      arg.slice(row?.index + 1, accountDetails?.length - 1),
    ]);
  };

  console.log(accountDetails);

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
    setOpenEyeModal({ state: !openEyeModal?.state, id: 1 });
  };

  return (
    <>
      <div className="overflow-x-auto min-h-[400px]">
        <MaterialReactTable table={table} />
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
    </>
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
