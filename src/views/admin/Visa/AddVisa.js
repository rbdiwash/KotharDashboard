import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import InputField from "components/Input/InputField";
import { API_URL } from "const/constants";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoArrowBack } from "react-icons/io5";
import useKothar from "context/useKothar";
import ClearIcon from "@mui/icons-material/Clear";

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
    coe: "",
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
  });
  const [{}, { refetchConsultancy }] = useKothar();

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
    mutate({ ...data });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`${API_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setData({ ...data, [type]: res?.data?.data?.url });
      })
      .catch((err) => {
        toast.error("Error Uploading file");
      });
  };

  const services = [
    "Students Admission",
    "RPL Certificate",
    "Student Accommodation",
    "Visa Application",
    "Health Insurance",
    "Professional Year",
    "Individual Tax Return",
    "Skills Assessment",
    "Student Accommodation",
  ];

  const documents_for_placement = [
    {
      label: "Covid Vaccination Certificate (Australian Converted)",
      value: "covid",
    },
    { label: "Flu Vaccination", value: "flu" },
    { label: "Police Check", value: "police_check" },
    { label: "NDIS Worker Check(if Asked)", value: "ndis" },
    { label: "WWVP( For Canberra Client only)", value: "wwvp" },
    {
      label:
        "NHHI Certificate (from the link available on Handbook Provided By Us)",
      value: "nhhi",
    },
    {
      label:
        "NDIS Worker orientation (from the link available on Handbook Provided By Us)",
      value: "ndis",
    },
  ];

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChangeCheckbox = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.checked,
    });
  };

  const { license, photocard, bank_card, rsa, transcript, bills } = data;
  const error =
    [license, photocard, bank_card, rsa, transcript, bills].filter((v) => v)
      .length < 3;

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
            <div className="flex flex-wrap items-center">
              <div className="relative w-full  max-w-full flex justify-start gap-4 items-center">
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
            </div>
          </div>
          <div className="block w-full overflow-x-auto mt-8">
            <div className="flex-auto lg:px-10 py-10 pt-0">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-2 text-white">
                  Personal Details
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Full Name"
                      placeholder="Full Name"
                      name="name"
                      required
                      type="text"
                      value={data?.name}
                      onChange={handleInputChange}
                    />
                  </div>
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
                {[1, 2, 3, 4, 5].map((item) => (
                  <div className="flex items-center gap-1">
                    <div className="min-w-[100px] font-semibold">
                      Address {item}:
                    </div>
                    <span className="flex items-center px-2 gap-4">
                      <p> From </p>
                      <InputField
                        type="date"
                        placeholder="Insert Date"
                        className="min-w-[200px]"
                      />
                      <p> Till </p>
                      <InputField
                        type="date"
                        placeholder="Insert Date"
                        className="min-w-[200px]"
                      />
                      <InputField
                        type="text"
                        placeholder="Full Address"
                        className="min-w-[500px]"
                      />
                    </span>
                  </div>
                ))}
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
                      onChange={(e) => handleFileChange(e, "all_academic")}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Upload All COE's (multiple)"
                      name="coe"
                      type="file"
                      multiple
                      onChange={(e) => handleFileChange(e, "coe")}
                    />
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
