import { Delete } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
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

const AddVisaDetails = ({ color = "light" }) => {
  const [data, setData] = useState({
    name: null,
    address: null,
    dob: null,
    gender: null,
    email: null,
    number: null,
    usiNumber: null,
    visa_status: null,
    visa_expiry: "",
    certificate: "",
    currently_enrolled_course: "",
    currently_enrolled_university: "",
    course_end_data: "",
    placement_required: null,
    passport: "",
    visa: "",
    coe: [],
    all_academic: [],
    license_file: "",
    photocard_file: "",
    bank_card_file: "",
    rsa_file: "",
    transcript_file: "",
    bills_file: "",
    covid_file: "",
    flu_file: "",
    police_check_file: "",
    ndis_file: "",
    wwvp_file: "",
    nhhi_file: "",
    ndis_file: "",
    status: true,
    ten_year_address: [],
  });
  const [{}, { refetchConsultancy }] = useKothar();
  const [tenYearAddress, setTenYearAddress] = useState([
    {
      from: null,
      to: null,
      full_address: "",
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
    if (state) {
      setData({ ...state?.item });
    }
  }, [state]);

  const { mutate } = useMutation(postData, {
    onSuccess() {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      navigate("/admin/consultancy");
      refetchConsultancy();
    },
    onError() {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });

  async function postData(payload) {
    if (data?.id) {
      await axios.put(`${API_URL}/organization/update/${payload?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/organization/register`, payload);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...data, ten_year_address: tenYearAddress });
  };

  const handleFileChange = (e, name, type) => {
    const file = e.target.files[0];
    if (type === "multiple") {
      setData({ ...data, [name]: [...data?.[name], file] });
    } else {
      setData({ ...data, [name]: file });
    }
    // const formData = new FormData();
    // formData.append("file", file);
    // axios
    //   .post(`${API_URL}/api/upload`, formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //   .then((res) => {
    //     if (type === "multiple") {
    //       setData({ ...data, [name]: [...data?.[name], res?.data?.data?.url] });
    //     } else {
    //       setData({ ...data, [name]: res?.data?.data?.url });
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error("Error Uploading file");
    //   });
  };

  const handleDeletePdf = (name, i) => {
    setData({
      ...data,
      [name]: [...data?.[name].filter((item, index) => i !== index)],
    });
  };

  const handle10InputChange = (e, index) => {
    const { name, value } = e.target;
    const row = tenYearAddress.find((item, i) => i === index);
    setTenYearAddress((prevState) => [
      ...prevState.slice(0, index),
      { ...row, [name]: value },
      ...prevState.slice(index + 1, tenYearAddress.length),
    ]);
  };
  const handleAddMore = () => {
    setTenYearAddress([
      ...tenYearAddress,
      {
        from: null,
        to: null,
        full_address: "",
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
                  Add Visa Details
                </h3>
              </div>
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                        defaultValue="female"
                        name="radio-buttons-group"
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Date of Issue"
                      name="dataOfIssue"
                      required
                      type="date"
                      value={data?.dataOfIssue}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Expiry Date"
                      name="dateOfExpiry"
                      required
                      type="date"
                      value={data?.dateOfExpiry}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Visa Status"
                      placeholder="Visa Status"
                      name="visa_status"
                      required
                      type="text"
                      value={data?.visa_status}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Visa Expiry"
                      name="visa_expiry"
                      required
                      type="date"
                      value={data?.visa_expiry}
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
                        name="till"
                        className="min-w-[200px]"
                        value={item?.till}
                        onChange={(e) => handle10InputChange(e, i)}
                      />
                      <InputField
                        type="text"
                        placeholder="Full Address"
                        name="full_address"
                        className="min-w-[500px]"
                        value={item?.full_address}
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
                      name="passportNumber"
                      required
                      type="number"
                      value={data?.passportNumber}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Police Check Lodge Date"
                      name="dataOfIssue"
                      required
                      type="date"
                      value={data?.dataOfIssue}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Police Check Lodge Date"
                      name="dateOfExpiry"
                      required
                      type="text"
                      value={data?.dateOfExpiry}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="PTE Score"
                      placeholder="PTE Score"
                      name="pte_score"
                      required
                      type="text"
                      value={data?.pte_score}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="PTE Attainted Date"
                      name="pte_date"
                      required
                      type="date"
                      value={data?.pte_date}
                    />
                  </div>
                </div>
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-2 text-white">
                  Upload Documents
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload Full Passport"
                      name="passport"
                      type="file"
                      onChange={(e) => handleFileChange(e, "passport")}
                    />
                    {data?.passport && (
                      <div className="flex gap-4 items-center bg-gray-200 p-1 mt-2 rounded w-fit">
                        {data?.name?.length > 30 ? (
                          <Tooltip title={data?.name}>
                            <span>{data?.name?.slice(0, 30)}</span>
                          </Tooltip>
                        ) : (
                          <span>{data?.name?.slice(0, 30)}</span>
                        )}
                        <DownloadIcon
                          className="cursor-pointer"
                          // onClick={() => downloadFile()}
                        />
                        <Delete
                          className="cursor-pointer"
                          onClick={() => handleDeletePdf("passport")}
                        />
                      </div>
                    )}
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload Updated Resume"
                      name="resume"
                      type="file"
                      onChange={(e) => handleFileChange(e, "resume")}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload Birth Certificate"
                      name="birth_certificate"
                      type="file"
                      onChange={(e) => handleFileChange(e, "birth_certificate")}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload Current Visa"
                      name="current_visa"
                      type="file"
                      onChange={(e) => handleFileChange(e, "current_visa")}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload Insurance"
                      name="insurance_doc"
                      type="file"
                      onChange={(e) => handleFileChange(e, "insurance_doc")}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload All Academic (multiple)"
                      name="all_academic"
                      type="file"
                      multiple
                      onChange={(e) =>
                        handleFileChange(e, "all_academic", "multiple")
                      }
                    />
                    {data?.all_academic?.map((data, i) => (
                      <div className="flex gap-4 items-center bg-gray-200 p-1 mt-2 rounded w-fit">
                        <img src={pdf} alt="" className="h-8" />
                        <span>{data?.name.slice(0, 30)}</span>
                        <Delete
                          className="cursor-pointer"
                          onClick={() => handleDeletePdf("all_academic", i)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload All COE's (multiple)"
                      name="coe"
                      type="file"
                      multiple
                      onChange={(e) => handleFileChange(e, "coe")}
                    />
                    {data?.coe?.map((data, i) => (
                      <div className="flex gap-4 items-center bg-gray-200 p-1 mt-2 rounded w-fit">
                        <img src={pdf} alt="" className="h-8" />
                        <span>{data?.name.slice(0, 30)}</span>
                        <Delete
                          className="cursor-pointer"
                          onClick={() => handleDeletePdf("coe", i)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload Completion Letter"
                      name="completion_letter"
                      type="file"
                      multiple
                      onChange={(e) => handleFileChange(e, "completion_letter")}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload Certificate of Graduation"
                      name="graduation_certificate"
                      type="file"
                      multiple
                      onChange={(e) =>
                        handleFileChange(e, "graduation_certificate")
                      }
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload IELTS/PTE (Overall 6)"
                      name="ielts_pte"
                      type="file"
                      multiple
                      onChange={(e) => handleFileChange(e, "ielts_pte")}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload Police Report (National Police Certificate) "
                      name="police_report"
                      type="file"
                      multiple
                      onChange={(e) => handleFileChange(e, "police_report")}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload Relationship Certificate "
                      name="relationship_certificate"
                      type="file"
                      multiple
                      onChange={(e) =>
                        handleFileChange(e, "relationship_certificate")
                      }
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload Marriage Certificate (if married)"
                      name="marriage_certificate"
                      type="file"
                      multiple
                      onChange={(e) =>
                        handleFileChange(e, "marriage_certificate")
                      }
                    />
                  </div>
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

const certificates = [
  "Certificate IV in Ageing Support with First Aid And CPR",
  "Certificate IV in Disability Support with First Aid And CPR",
  "Certificate III in Individual Support with First Aid And CPR",
  "Certificate IV in Ageing Support",
  "Certificate IV in Disability Support",
  "Certificate III in Individual Support",
  "Certificate III in Childcare",
  "Diploma in Childcare",
  "Certificate Iii in Comercial Cookary",
  "Certificate IV in Comercial Cookary",
];
