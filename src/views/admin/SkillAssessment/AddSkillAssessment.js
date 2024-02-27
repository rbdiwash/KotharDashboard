import { Delete } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
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
import ClientDropdown from "components/Dropdowns/ClientDropdown";
import UploadFile from "components/Input/UploadFile";

const AddSkillAssessment = ({ color = "light" }) => {
  const [data, setData] = useState({
    status: false,
    visa_status: null,
    course_provider: null,
    course_completed: null,
    resume: "",
    academic: [],
    py: [],
    gender: "",
  });
  const [{}, { refetchSkillList }] = useKothar();

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setData({ ...state?.item, client: state?.item?.name });
    }
  }, [state]);
  console.log("🚀  data:", data);

  const { mutate } = useMutation(postData, {
    onSuccess() {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      navigate("/admin/skill-assessment");
      refetchSkillList();
    },
    onError() {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });

  async function postData(payload) {
    if (data?.id) {
      await axios.put(`${API_URL}/skill-assessment/${payload?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/skill-assessment`, payload);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...data });
  };

  const handleFileChange = (e, name, type) => {
    const file = e.target.files[0];
    // if (type === "multiple") {
    //   setData({ ...data, [name]: [...data?.[name], file] });
    // } else {
    //   setData({ ...data, [name]: file });
    // }
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`${API_URL}/file/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (type === "multiple") {
          setData({ ...data, [name]: [...data?.[name], res?.data?.data?.url] });
        } else {
          setData({ ...data, [name]: res?.data?.data?.url });
        }
      })
      .catch((err) => {
        toast.error("Error Uploading file");
      });
  };

  const handleDeletePdf = (name, i) => {
    setData({
      ...data,
      [name]: [...data?.[name].filter((item, index) => i !== index)],
    });
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
              <div className="relative max-w-full flex justify-start gap-4 items-center">
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
                  Add Skill Assessment Details
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
          <div className="block w-full overflow-x-auto">
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
                      disabled
                      type="text"
                      value={data?.address}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Date of Birth"
                      placeholder="Date of Birth"
                      name="dob"
                      disabled
                      required
                      type="date"
                      value={data?.dob}
                      // onChange={handleInputChange}
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
                        disabled
                        value={data?.gender}
                        name="gender"
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                          disabled
                        />

                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                          disabled
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Other"
                          disabled
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
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      fullWidth
                      label="Mobile Number"
                      placeholder="Mobile Number"
                      name="number"
                      disabled
                      required
                      type="number"
                      value={data?.number}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Course Provider"
                      placeholder="Course Provider"
                      name="course_provider"
                      required
                      type="text"
                      value={data?.course_provider}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Course Completed"
                      placeholder="Course Completed"
                      name="course_completed"
                      required
                      type="text"
                      value={data?.course_completed}
                      // onChange={handleInputChange}
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
                  Passport & VISA Details
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Passport Number"
                      placeholder="Passport Number"
                      name="passportNumber"
                      disabled
                      required
                      type="number"
                      value={data?.passportNumber}
                      // onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Date of Issue"
                      name="dateOfIssue"
                      disabled
                      required
                      type="date"
                      value={data?.dateOfIssue}
                      // onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Expiry Date"
                      name="passportExpiry"
                      disabled
                      required
                      type="date"
                      value={data?.passportExpiry}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Visa Status"
                      placeholder="Visa Status"
                      name="visa_status"
                      disabled
                      required
                      type="text"
                      value={data?.visa_status}
                      // onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Visa Expiry"
                      name="visa_expiry"
                      required
                      type="date"
                      disabled
                      value={data?.visa_expiry}
                      // onChange={handleInputChange}
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
                      label: "Updated Resume",
                      imageKey: "resume",
                    }}
                  />
                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Full Passport",
                      imageKey: "passport",
                    }}
                  />{" "}
                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "All Academic Documents(multiple)",
                      imageKey: "academic",
                      type: "multiple",
                    }}
                  />{" "}
                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "All PY Certificate(multiple)",
                      imageKey: "py",
                      type: "multiple",
                    }}
                  />
                  {/* <div className="relative w-full mb-3">
                    <InputField
                      label="Upload All Academic Documents(multiple)"
                      name="coe"
                      type="file"
                      onChange={(e) =>
                        handleFileChange(e, "academic", "multiple")
                      }
                    />
                    {data?.academic?.map((data, i) => (
                      <div className="flex gap-4 items-center bg-gray-200 p-1 mt-2 rounded w-fit">
                        <img src={pdf} alt="" className="h-8" />
                        <span>{data?.name?.slice(0, 30)}</span>
                        <Delete
                          className="cursor-pointer"
                          onClick={() => handleDeletePdf("academic", i)}
                        />
                      </div>
                    ))}
                  </div> */}
                  {/* <div className="relative w-full mb-3">
                    <InputField
                      label="Upload All PY Certificate(multiple)"
                      name="coe"
                      type="file"
                      onChange={(e) => handleFileChange(e, "py", "multiple")}
                    />
                    {data?.py?.map((data, i) => (
                      <div className="flex gap-4 items-center bg-gray-200 p-1 mt-2 rounded w-fit">
                        <img src={pdf} alt="" className="h-8" />
                        <span>{data?.name?.slice(0, 30)}</span>
                        <Delete
                          className="cursor-pointer"
                          onClick={() => handleDeletePdf("py", i)}
                        />
                      </div>
                    ))}
                  </div> */}
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

export default AddSkillAssessment;

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
