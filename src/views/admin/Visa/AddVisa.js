import { Delete } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import InputField from "components/Input/InputField";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import pdf from "../../../assets/img/pdf.png";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import ClientDropdown from "components/Dropdowns/ClientDropdown";
import UploadFile from "components/Input/UploadFile";
import { visaTabs } from "const/constants";

const AddVisaDetails = ({ color = "light" }) => {
  const [data, setData] = useState({
    name: null,
    address: null,
    dob: null,
    gender: null,
    email: null,
    number: null,
    usiNumber: null,
    visaStatus: null,
    visaExpiry: "",
    certificate: "",
    currentlyEnrolledCourse: "",
    currentlyEnrolledUniversity: "",
    courseEndData: "",
    placementRequired: null,
    visa: "",
    status: true,
    tenYearAddress: [],
    type: null,
    passport: null,
    resume: "",
    birthCertificate: "",
    currentVisa: "",
    insuranceDoc: "",
    allAcademic: [],
    coe: [],
    completionLetter: [],
    graduationCertificate: [],
    ieltsPte: [],
    policeReport: "",
    relationshipCertificate: "",
    marriageCertificate: "",
  });

  const [{ selectedVisaTab }, { refetchVisaList }] = useKothar();

  const [tenYearAddress, setTenYearAddress] = useState([
    {
      from: null,
      to: null,
      fullAddress: "",
      uid: crypto.randomUUID(),
    },
  ]);

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const { state } = useLocation();

  useEffect(() => {
    if (state?.item) {
      setData({ ...state?.item });
      setTenYearAddress(state?.item?.ten_year_address);
    }
  }, [state]);

  const { mutate } = useMutation(postData, {
    onSuccess() {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      navigate("/admin/visa");
      refetchVisaList();
    },
    onError() {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });

  async function postData(payload) {
    if (data?.id) {
      await axios.put(`${API_URL}/visa-applications/${payload?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/visa-applications`, payload);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      ...data,
      tenYearAddress: tenYearAddress,
      type: selectedVisaTab?.value,
    });
  };

  const handle10InputChange = (e, index) => {
    const { name, value } = e.target;
    const row = tenYearAddress.find((item, i) => i === index);
    setTenYearAddress((prevState) => [
      ...prevState?.slice(0, index),
      { ...row, [name]: value },
      ...prevState?.slice(index + 1, tenYearAddress.length),
    ]);
  };
  const handleAddMore = () => {
    setTenYearAddress([
      ...tenYearAddress,
      {
        from: null,
        to: null,
        fullAddress: "",
        uid: crypto.randomUUID(),
      },
    ]);
  };
  const handleDeleteExp = (id) => {
    setTenYearAddress([...tenYearAddress.filter((item) => item?.uid !== id)]);
  };
  return (
    <div className="flex flex-wrap mt-4 dashBody">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
            (color === "light" ? "bg-white" : "bg-sky-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-10 py-3 border-0">
            <div className="flex flex-wrap items-center justify-between">
              <div className="relative   max-w-full flex justify-start gap-4 items-center">
                <IoArrowBack
                  className="text-xl cursor-pointer"
                  onClick={() => navigate(-1)}
                />
                <h3
                  className={
                    "font-semibold text-xl " +
                    (color === "light" ? "text-slate-700" : "text-white")
                  }
                >
                  {data?.id ? "Edit" : "Add"} Visa Details
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {selectedVisaTab?.value === "All" && (
                  <Autocomplete
                    onChange={(e, value) => {
                      setData((prevState) => ({
                        ...prevState,
                        type: value?.value,
                      }));
                    }}
                    value={
                      visaTabs?.find((item) => item?.value === data?.type) ||
                      null
                    }
                    placeholder="Select Student Status"
                    options={visaTabs}
                    disablePortal
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Visa Type"
                        required
                      />
                    )}
                    ListboxProps={{
                      style: {
                        maxHeight: "180px",
                      },
                    }}
                    size="small"
                    sx={{ width: 300 }}
                  />
                )}
                <FormControlLabel
                  control={
                    <Switch
                      sx={{ m: 1 }}
                      onChange={(e) => {
                        setData({ ...data, status: e.target.checked });
                      }}
                      checked={data?.status}
                    />
                  }
                  label="Approved"
                />
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto mt-0">
            <div className="flex-auto lg:px-10 py-10 pt-0">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-2 text-white">
                  Personal Details
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <ClientDropdown {...{ data, setData }} />

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Address"
                      placeholder="Address"
                      name="address"
                      required
                      type="text"
                      value={data?.address}
                      disabled
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Date of Birth"
                      placeholder="Date of Birth"
                      name="dob"
                      required
                      type="date"
                      value={data?.dob}
                      disabled
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <FormControl>
                      <FormLabel className="text-slate-600 uppercase text-xs font-bold mb-2">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        required
                        value={data?.gender}
                        name="radio-buttons-group"
                        disabled
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />

                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      type="email"
                      placeholder="Email"
                      name="email"
                      label="Email"
                      required
                      value={data?.email}
                      disabled
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      fullWidth
                      label="Mobile Number"
                      placeholder="Mobile Number"
                      name="number"
                      required
                      type="number"
                      value={data?.number}
                      disabled
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Course Provider"
                      placeholder="Course Provider"
                      name="courseProvider"
                      required
                      type="text"
                      value={data?.courseProvider}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Course Completed"
                      placeholder="Course Completed"
                      name="courseCompleted"
                      required
                      type="text"
                      value={data?.courseCompleted}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-2 text-white">
                  Passport & VISA Details
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Passport Number"
                      placeholder="Passport Number"
                      name="passportNumber"
                      required
                      type="number"
                      value={data?.passportNumber}
                      disabled
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Date of Issue"
                      name="dateOfIssue"
                      required
                      type="date"
                      value={data?.dateOfIssue}
                      disabled
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Expiry Date"
                      name="passportExpiry"
                      required
                      type="date"
                      value={data?.passportExpiry}
                      disabled
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Visa Status"
                      placeholder="Visa Status"
                      name="visaStatus"
                      required
                      type="text"
                      value={data?.visaStatus}
                      disabled
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Visa Expiry"
                      name="visaExpiry"
                      required
                      type="date"
                      value={data?.visaExpiry}
                      disabled
                    />
                  </div>
                </div>
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-2 text-white">
                  Last Ten Years Address
                </p>

                {tenYearAddress?.map((item, i) => (
                  <div className="flex items-center gap-1">
                    <div className="min-w-[100px] font-semibold">
                      Address {i + 1}:
                    </div>
                    <span className="flex items-center  px-2 gap-4">
                      <p> From </p>
                      <InputField
                        type="date"
                        placeholder="Insert Date"
                        name="from"
                        className="min-w-[200px]"
                        value={item?.from}
                        onChange={(e) => handle10InputChange(e, i)}
                      />
                      <p> Till </p>
                      <InputField
                        type="date"
                        placeholder="Insert Date"
                        name="to"
                        className="min-w-[200px]"
                        value={item?.to}
                        onChange={(e) => handle10InputChange(e, i)}
                      />
                      <InputField
                        type="text"
                        placeholder="Full Address"
                        name="fullAddress"
                        className="min-w-[500px]"
                        value={item?.fullAddress}
                        onChange={(e) => handle10InputChange(e, i)}
                      />
                      <Tooltip title="Delete Address">
                        <Button>
                          <DeleteIcon
                            onClick={() => handleDeleteExp(item?.uid)}
                          />
                        </Button>
                      </Tooltip>
                    </span>
                  </div>
                ))}
                <div className="row mt-4">
                  <Button variant="contained" onClick={handleAddMore}>
                    Add More Adress Details
                  </Button>
                </div>
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-2 text-white">
                  Additional Details
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="col-span-2 relative w-full mb-3">
                    <InputField
                      label="Desired OVSC Insurance"
                      placeholder="Desired OVSC Insurance"
                      name="desiredInsurance"
                      required
                      type="number"
                      value={data?.desiredInsurance}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Police Check Lodge Date"
                      name="policeCheckLodgeDate"
                      required
                      type="date"
                      value={data?.policeCheckLodgeDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="PTE Score"
                      placeholder="PTE Score"
                      name="pteScore"
                      required
                      type="text"
                      value={data?.pteScore}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="PTE Attainted Date"
                      name="pteDate"
                      required
                      type="date"
                      value={data?.pteDate}
                      onChange={handleInputChange}
                    />
                  </div>{" "}
                  <div className="relative w-full mb-3">
                    <InputField
                      fullWidth
                      label="Case Officer"
                      placeholder="Case Officer"
                      name="caseOfficer"
                      required
                      type="text"
                      value={data?.caseOfficer}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      fullWidth
                      label="Reference"
                      placeholder="Reference"
                      name="reference"
                      required
                      type="text"
                      value={data?.reference}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-2 text-white">
                  Upload Documents
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Updated Full Passport",
                      imageKey: "passport",
                    }}
                  />
                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Updated Resume",
                      imageKey: "resume",
                    }}
                  />

                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Updated Birth Certificate",
                      imageKey: "birthCertificate",
                    }}
                  />
                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Updated Current Visa",
                      imageKey: "currentVisa",
                    }}
                  />

                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Updated Insurance",
                      imageKey: "insuranceDoc",
                    }}
                  />

                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Updated All Academic (multiple)",
                      imageKey: "allAcademic",
                      type: "multiple",
                    }}
                  />

                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Updated All COE's (multiple)",
                      imageKey: "coe",
                      type: "multiple",
                    }}
                  />
                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Updated Completion Letter",
                      imageKey: "completionLetter",
                      type: "multiple",
                    }}
                  />

                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Certificate of Graduation",
                      imageKey: "graduationCertificate",
                      type: "multiple",
                    }}
                  />

                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "IELTS/PTE (Overall 6)",
                      imageKey: "ieltsPte",
                      type: "multiple",
                    }}
                  />

                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Police Report (National Police Certificate)",
                      imageKey: "policeReport",
                    }}
                  />

                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Relationship Certificate",
                      imageKey: "relationshipCertificate",
                    }}
                  />
                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Marriage Certificate (if married)",
                      imageKey: "marriageCertificate",
                    }}
                  />
                </div>
                <div className="grid grid-cols-1 gap-8 mt-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Important Note
                    </label>
                    <textarea
                      type="text"
                      className="border px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      rows="4"
                      name="note"
                      value={data?.note}
                      onChange={(e) => handleInputChange(e, "note")}
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end mt-6 gap-4">
                  {/* <Button variant="outlined" component={Link} to=""> */}
                  <Button variant="outlined" onClick={() => navigate(-1)} to="">
                    Go Back
                  </Button>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVisaDetails;
