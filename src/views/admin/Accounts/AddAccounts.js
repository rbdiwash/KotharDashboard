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
import UploadFile from "components/Input/UploadFile";
import { useMutation } from "@tanstack/react-query";

const AddAccounts = ({ color = "light" }) => {
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [installments, setInstallments] = useState([{ index: 1 }]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedStudent, setSelectedStudent] = useState();
  const [data, setData] = useState({});
  const [
    { rplList, studentList, visaList, skillList, insuranceList },
    { refetchCourseList },
  ] = useKothar();
  const [{ token }, { setToken }] = useKothar();
  console.log("🚀  skillList:", skillList);

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

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const row = installments.find((item, i) => i === index);
    setInstallments((prevState) => [
      ...prevState.slice(0, index),
      { ...row, [name]: value },
      ...prevState.slice(index + 1, installments.length),
    ]);
  };

  const handleFileChange = (e, index) => {
    const { name, value } = e.target;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`${API_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const row = installments.find((item, i) => i === index);

        setInstallments((prevState) => [
          ...prevState.slice(0, index),
          { ...row, [name]: value },
          ...prevState.slice(index + 1, installments.length),
        ]);
      })
      .catch((err) => {
        toast.error("Error Uploading file");
      });
  };

  const options = [
    { title: "RPL", value: "rpl" },
    { title: "Student", value: "student" },
    { title: "Visa", value: "visa" },
    { title: "Insurance", value: "insurance" },
    {
      title: "Skill Assessment",
      value: "skill-assessment",
    },
  ];
  const getClientOption = () => {
    let secondOption = [];

    switch (selectedType?.value) {
      case "rpl":
        secondOption = rplList;
        break;
      case "student":
        secondOption = studentList;
        break;
      case "insurance":
        secondOption = insuranceList;
        break;
      case "visa":
        secondOption = visaList;
        break;
      case "skill-assessment":
        secondOption = skillList;
        break;
    }
    return secondOption;
  };

  const addInstallments = () => {
    setInstallments((prev) => [...prev, { index: prev.length + 1 }]);
  };

  const handleDeleteInstallment = (index) => {
    setInstallments((prev) => [...prev.filter((item, i) => i !== index)]);
  };

  const { mutate, isLoading } = useMutation(postData, {
    onSuccess() {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
    },
    onError() {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });

  async function postData(payload) {
    await axios.post(`${API_URL}/clients`, payload);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...data, installments, client: selectedStudent, document: [] });
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
                  size="small"
                  disablePortal
                  options={options}
                  sx={{ width: 300 }}
                  onChange={(e, value) => {
                    setSelectedType(value);
                  }}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Type" />
                  )}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  options={getClientOption()}
                  sx={{ width: 500 }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Search using Name" />
                  )}
                  onChange={(e, value) => {
                    setSelectedStudent(value);
                  }}
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
                        {selectedStudent?.name}
                      </h2>
                      <p className="mb-2"> {selectedStudent?.address}</p>
                      <p className="mb-2"> {selectedStudent?.number}</p>
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
                                $0
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
                                {selectedType?.title}
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
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">SN</th>
                          <th className="border px-4 py-2">Date</th>
                          <th className="border px-4 py-2">Amount</th>
                          <th className="border px-4 py-2">Payment Method</th>
                          <th className="border px-4 py-2">Remarks</th>
                          <th className="border px-4 py-2">
                            Commission Claimed
                          </th>
                          <th className="border px-4 py-2">Case Officer </th>
                          <th className="border px-4 py-2">Agent Cost </th>
                          <th className="border px-4 py-2">Status </th>
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
                            <td className="border text-center px-4 py-2">
                              <InputField
                                type="number"
                                name="amounts"
                                placeholder="Amount"
                                onChange={(e) => handleInputChange(e, index)}
                                value={item?.amount}
                                className="min-w-[150px]"
                              />
                            </td>
                            <td className="border text-center  px-4 py-2">
                              <InputField
                                type="text"
                                name="method"
                                placeholder="Payment Method"
                                onChange={(e) => handleInputChange(e, index)}
                                value={item?.paymentMethod}
                                className="min-w-[150px]"
                              />
                            </td>
                            <td className="border text-center px-4 py-2">
                              <InputField
                                type="text"
                                name="remarks"
                                placeholder="Enter Remarks"
                                size="small"
                                onChange={(e) => handleInputChange(e, index)}
                                value={item?.remark}
                                className="min-w-[150px]"
                              />
                            </td>
                            <td className="border text-center px-4 py-2">
                              <div className="flex items-center gap-4">
                                <Autocomplete
                                  onChange={(e, value) => {
                                    const row = installments.find(
                                      (item, i) => i === index
                                    );
                                    setInstallments((prevState) => [
                                      ...prevState.slice(0, index),
                                      { ...row, claimed: value.value },
                                      ...prevState.slice(
                                        index + 1,
                                        installments.length
                                      ),
                                    ]);
                                  }}
                                  isOptionEqualToValue={(options, value) =>
                                    options.value === value.value
                                  }
                                  value={item?.claimed}
                                  name="claimed"
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
                                {item?.claimed === "yes" && (
                                  <InputField
                                    type="text"
                                    name="comission"
                                    placeholder="Enter Comission"
                                    onChange={(e) =>
                                      handleInputChange(e, index)
                                    }
                                    value={item?.comission}
                                    className="min-w-[150px]"
                                  />
                                )}
                              </div>
                            </td>{" "}
                            <td className="border text-center px-4 py-2">
                              <InputField
                                type="text"
                                name="caseOfficer"
                                placeholder="Case Officer"
                                size="small"
                                onChange={(e) => handleInputChange(e, index)}
                                value={item?.caseOfficer}
                                className="min-w-[150px]"
                              />
                            </td>{" "}
                            <td className="border text-center px-4 py-2">
                              <InputField
                                type="number"
                                name="agentCost "
                                placeholder="Agent Cost"
                                size="small"
                                onChange={(e) => handleInputChange(e, index)}
                                value={item?.agentCost}
                                className="min-w-[150px]"
                              />
                            </td>{" "}
                            <td className="border text-center px-4 py-2">
                              <InputField
                                type="text"
                                name="status"
                                placeholder="Status"
                                size="small"
                                onChange={(e) => handleInputChange(e, index)}
                                value={item?.status}
                                className="min-w-[150px]"
                              />
                            </td>
                            <td className="border text-center px-4 py-2">
                              <InputField
                                type="file"
                                name="remarks"
                                placeholder="Upload Attachments"
                                value={item?.document}
                                onChange={(e) => handleFileChange(e, index)}
                                className="min-w-[150px]"
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
                  <div className="grid grid-cols-3  gap-5 py-10">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl font-semibold mb-5">
                        Payment Details:
                      </h2>
                      <div className="flex gap-2 items-center ">
                        Amount:
                        <InputField
                          type="number"
                          name="amount"
                          placeholder="Discount Amount"
                          className="w-[200px] p-1"
                          onChange={(e) =>
                            setData({ ...data, amount: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        Discount:
                        <InputField
                          type="number"
                          name="discount"
                          placeholder="Discount Amount"
                          className="w-[200px] p-1"
                          onChange={(e) =>
                            setData({ ...data, discount: e.target.value })
                          }
                        />
                      </div>
                      <div className=" flex items-center gap-2">
                        Due Date:
                        <InputField
                          type="date"
                          name="dueDate"
                          className="w-[200px]"
                          onChange={(e) =>
                            setData({ ...data, dueDate: e.target.value })
                          }
                        />
                      </div>{" "}
                      <div className=" flex items-center gap-2">
                        Total Amount: $0
                      </div>
                    </div>
                    <div className="col-span-1"></div>
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
