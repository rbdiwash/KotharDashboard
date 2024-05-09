import {
  Autocomplete,
  Button,
  IconButton,
  OutlinedInput,
  TextField,
  Tooltip,
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

const AddAccounts = ({ color = "light" }) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [installments, setInstallments] = useState([{ index: 1 }]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [data, setData] = useState({
    studentCost: null,
    costForKothar: null,
    caseOfficer:null,isClaimed:'No', commission:null, reminderDate: new Date(),amountPaidByStudent:null});
  const [
    { rplList, studentList, visaList, skillList, insuranceList },
    { refetchAccountList },
  ] = useKothar();
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
      setInstallments(state?.item?.installments);
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

  const getClientOption = () => {
    let secondOption = [];

    switch (selectedType?.value) {
      case "RPL":
        secondOption = rplList;
        break;
      case "Student":
        secondOption = studentList;
        break;
      case "Insurance":
        secondOption = insuranceList;
        break;
      case "Visa":
        secondOption = visaList;
        break;
      case "Skill Assessment":
        secondOption = skillList;
        break;
    }
    return secondOption ?? [];
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
    await axios.post(`${API_URL}/accounts`, payload);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      ...data,
      installments: installments.map((item) => ({
        ...item,
        document:''
      })),
      clientId: Number(selectedStudent?.clientId),
      type: selectedType?.value,
      amount: installments.reduce((a, b) => a + (Number(b.amount) || 0), 0),
    });
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
  console.log(data);

  return (
    <div className="flex flex-wrap mt-4 dashBody">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded min-h-[70vh]  " +
            (color === "light" ? "bg-white" : "bg-sky-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex items-center justify-between">
              <IoArrowBack
                className="text-xl cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <form className="flex items-center justify-center gap-2 w-full  rounded mr-3">
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
              </form>
            </div>
          </div>
          {selectedStudent?.clientId ? (
            <div className="block w-full overflow-x-auto">
              <div className="px-4">
                <div className="container mx-auto px-2 py-1">
                  <div className="flex flex-col space-y-5">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold mb-10">
                        Account Details
                      </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-5">
                      <div className="flex flex-col gap-2 col-span-2">
                        <h2 className="text-xl font-semibold mb-5 underline">
                          Payment Details
                        </h2>
                        <div className="flex gap-2 items-center ">
                          Total Amount agreed by Student:
                          <OutlinedInput
                            name="studentCost"
                            className="col-span-2"
                            placeholder="Amount in AUD"
                            type="number"
                            size="small"
                            endAdornment={"AUD"}
                            value={data?.studentCost}
                            onChange={(e) =>
                              setData({ ...data, studentCost: e.target.value })
                            }
                          />
                          {/* $
                        {installments
                          .reduce((a, b) => a + (Number(b.amount) || 0), 0)
                          .toFixed(2)} */}
                        </div>{" "}
                        <div className="flex gap-2 items-center ">
                          Total Cost for Kothar
                          <OutlinedInput
                            name="costForKothar"
                            placeholder="Amount in AUD"
                            type="number"
                            size="small"
                            endAdornment={"AUD"}
                            value={data?.costForKothar}
                            onChange={(e) =>
                              setData({
                                ...data,
                                costForKothar: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex gap-2 items-center ">
                          Case Officer:
                          <OutlinedInput
                            name="caseOfficer"
                            placeholder="Case Officer Name"
                            type="text"
                            size="small"
                            value={data?.caseOfficer}
                            onChange={(e) =>
                              setData({ ...data, caseOfficer: e.target.value })
                            }
                          />
                        </div>
                        {/* <div className="flex gap-2 items-center ">
                          Total Agent Cost:
                          <OutlinedInput
                            name="agentCost"
                            placeholder="Agent Cost in AUD"
                            type="number"
                            size="small"
                            endAdornment={"AUD"}
                            value={data?.agentCost}
                            onChange={(e) =>
                              setData({ ...data, agentCost: e.target.value })
                            }
                          />
                        </div> */}
                        <div className="flex items-center gap-4">
                          Commission Claimed:
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
                        </div>
                        <div className="flex gap-2 items-center ">
                          Total amount paid by Student:
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
                          />
                        </div>
                        {/* <div className="flex gap-2 items-center">
                          Discount:
                          <OutlinedInput
                            name="discount"
                            placeholder="In percentage"
                            type="number"
                            sx={{ width: "50%" }}
                            size="small"
                            endAdornment={"%"}
                            value={data?.discount}
                            onChange={(e) =>
                              setData({ ...data, discount: e.target.value })
                            }
                          />
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
                      <div className="max-w-7xl mx-auto  lg:px-8">
                        <div className="md:col-span-2">
                          <h2 className="text-2xl font-semibold mb-5">
                            Client: {selectedStudent?.name}
                          </h2>
                          <p className="mb-2">
                            Address: {selectedStudent?.address}
                          </p>
                          <p className="mb-2">
                            Contact: {selectedStudent?.number}
                          </p>
                          <dt className="text-sm font-medium ">
                            Type: {selectedType?.label}
                          </dt>
                        </div>
                      </div>
                    </div>

                    <h1 className="text-lg text-gray-600 font-semibold underline">
                      Payment Installlments
                    </h1>
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border px-4 py-2">SN</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Payment Method</th>
                            <th className="border px-4 py-2">Remarks</th>
                            {/* <th className="border px-4 py-2">
                              Commission Claimed
                            </th> */}
                            <th className="border px-4 py-2">Attachment</th>
                            <th className="border px-4 py-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {installments?.map((item, index) => (
                            <tr key={item?.index}>
                              <td className="border text-center px-4 py-2">
                                {index + 1}
                              </td>
                              <td className="border text-center px-4 py-2">
                                <InputField
                                  type="date"
                                  name="date"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.date}
                                />
                              </td>
                              <td className="border text-center px-4 py-2 min-w-[200px]">
                                <InputField
                                  type="number"
                                  name="amount"
                                  placeholder="Amount"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.amount}
                                  className="min-w-[150px]"
                                />
                              </td>
                              <td className="border text-center  px-4 py-2 min-w-[200px]">
                                <InputField
                                  type="text"
                                  name="method"
                                  placeholder="Payment Method"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.method}
                                  className="min-w-[150px]"
                                />
                              </td>
                              <td className="border text-center px-4 py-2 min-w-[200px]">
                                <InputField
                                  type="text"
                                  name="remarks"
                                  placeholder="Enter Remarks"
                                  size="small"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.remarks}
                                />
                              </td>
                              {/* <td
                                className={
                                  `border text-center px-4 py-2 ` +
                                  (installments[index]?.claimed?.value === "yes"
                                    ? "min-w-[300px]"
                                    : `min-w-[200px]`)
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
                              </td> */}
                              {/* <td className="border text-center px-4 py-2 min-w-[200px]">
                                <InputField
                                  type="text"
                                  name="caseOfficer"
                                  placeholder="Case Officer"
                                  size="small"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.caseOfficer}
                                />
                              </td> */}
                              {/* <td className="border text-center px-4 py-2 min-w-[200px]">
                                <InputField
                                  type="number"
                                  name="agentCost"
                                  placeholder="Agent Cost"
                                  size="small"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.agentCost}
                                />
                              </td>
                              <td className="border text-center px-4 py-2 min-w-[200px]">
                                <InputField
                                  type="text"
                                  name="status"
                                  placeholder="Status"
                                  size="small"
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={item?.status}
                                  className="min-w-[150px]"
                                />
                              </td> */}
                              <td className="border text-center px-4 py-2 min-w-[250px]">
                                <UploadFile
                                  {...{
                                    data: installments,
                                    setData: setInstallments,
                                    imageKey: "document",
                                    // label: "Document",
                                  }}
                                />
                              </td>
                              <td className="border text-center px-4 py-2">
                                <div className="flex items-center">
                                  {/* <Tooltip title="Edit Course" arrow>
                                <IconButton
                                  onClick={() =>
                                    navigate("/admin/course/add", {})
                                  }
                                >
                                  <AiFillEdit className="text-sky-600 cursor-pointer" />
                                </IconButton>
                              </Tooltip> */}
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
                                Add More Installments
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
    </div>
  );
};

export default AddAccounts;
