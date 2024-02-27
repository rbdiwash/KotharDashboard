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
import ClientDropdown from "components/Dropdowns/ClientDropdown";
import { rpl_status } from "const/constants";
import UploadFile from "components/Input/UploadFile";

const AddRPLCertificate = ({ color = "light" }) => {
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

  const { mutate, isLoading } = useMutation(postData, {
    onSuccess() {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      navigate("/admin/rpl-certificate");
      refetchConsultancy();
    },
    onError() {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });

  async function postData(payload) {
    if (data?.id) {
      await axios.put(`${API_URL}/rpl/${payload?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/rpl`, payload);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...data, useExistingClientData: true });
  };

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
            <div className="flex items-center">
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
                  Add RPL Certificate
                </h3>
              </div>
              <Autocomplete
                onChange={(e, value) => {
                  setData((prevState) => ({
                    ...prevState,
                    status: value?.value,
                  }));
                }}
                required
                value={data?.status}
                placeholder="Select Status"
                options={rpl_status}
                disablePortal
                renderInput={(params) => (
                  <TextField {...params} label="Select Status" />
                )}
                ListboxProps={{
                  style: {
                    maxHeight: "180px",
                  },
                }}
                size="small"
                sx={{ width: 300 }}
              />
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
                    <ClientDropdown {...{ data, setData }} />
                  </div>
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
                      <RadioGroup row required disabled value={data?.gender}>
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
                      label="USI Number"
                      placeholder="USI Number"
                      name="usiNumber"
                      required
                      type="text"
                      value={data?.usiNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-2 text-white">
                  VISA Details
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Visa Status"
                      placeholder="Visa Status"
                      name="visa_status"
                      required
                      type="text"
                      value={data?.visa_status}
                      disabled
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Visa Expiry"
                      name="visa_expiry"
                      required
                      type="date"
                      value={data?.visa_expiry}
                      disabled
                    />
                  </div>
                </div>
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-2 text-white">
                  Course & Other Details
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="relative w-full mb-3">
                    <label className="input-label">Select Certificate *</label>
                    <Autocomplete
                      onChange={(e, value) => {
                        setData((prevState) => ({
                          ...prevState,
                          certificate: value,
                        }));
                      }}
                      required
                      value={data?.certificate}
                      options={certificates}
                      getOptionLabel={(option) => option || ""}
                      getOptionValue={(option) => option}
                      disablePortal
                      renderInput={(params) => (
                        <TextField {...params} label="Select Certificate" />
                      )}
                      ListboxProps={{
                        style: {
                          maxHeight: "180px",
                        },
                      }}
                      size="small"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      fullWidth
                      label="Currently Enrolled Course"
                      placeholder="Currently Enrolled Course"
                      name="currently_enrolled_course"
                      required
                      type="text"
                      value={data?.currently_enrolled_course}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      fullWidth
                      label="Currently Enrolled University"
                      placeholder="Currently Enrolled University"
                      name="currently_enrolled_university"
                      required
                      type="text"
                      value={data?.currently_enrolled_university}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      fullWidth
                      label="Expected Course End Date"
                      placeholder="Expected Course End Date"
                      name="course_end_data"
                      required
                      type="date"
                      value={data?.course_end_data}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <FormControl>
                      <FormLabel className="text-slate-600 uppercase text-xs font-bold mb-2">
                        Placement Required
                      </FormLabel>
                      <RadioGroup
                        row
                        required
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                        />

                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
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
                      label: "Valid Passport",
                      imageKey: "passport",
                    }}
                  />{" "}
                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Current VisaCurrent Visa",
                      imageKey: "visa",
                    }}
                  />
                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: " All COE's",
                      imageKey: "coe",
                      type: "multiple",
                    }}
                  />
                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "USI document",
                      imageKey: "usi_document",
                    }}
                  />
                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "resume",
                      imageKey: "resume",
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-8 border-t">
                  <FormControl
                    required
                    error={error}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel
                      component="legend"
                      className="text-orange-500 font-semibold pt-4 text-xl"
                    >
                      100 Points ID (Any 3 Form of ID)
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data?.license}
                            onChange={handleChange}
                            name="license"
                          />
                        }
                        label="License (Australian only valid)"
                      />
                      {data?.license && (
                        <UploadFile
                          {...{
                            data,
                            setData,
                            label: "any Australian Licence",
                            imageKey: "license_file",
                            required: true,
                          }}
                        />
                      )}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data?.photocard}
                            onChange={handleChange}
                            name="photocard"
                          />
                        }
                        label="Photo Card"
                      />
                      {data?.photocard && (
                        <UploadFile
                          {...{
                            data,
                            setData,
                            label: "any Photo Card",
                            imageKey: "photocard_file",
                            required: true,
                          }}
                        />
                      )}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data?.bank_card}
                            onChange={handleChange}
                            name="bank_card"
                          />
                        }
                        label="Bank Card"
                      />
                      {data?.bank_card && (
                        <UploadFile
                          {...{
                            data,
                            setData,
                            label: "Bank Card Document",
                            imageKey: "bank_card_file",
                            required: true,
                          }}
                        />
                      )}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data?.rsa}
                            onChange={handleChange}
                            name="rsa"
                          />
                        }
                        label="RSA/ Whitecard"
                      />
                      {data?.rsa && (
                        <UploadFile
                          {...{
                            data,
                            setData,
                            label: "RSA/ Whitecard document",
                            imageKey: "rsa_file",
                            required: true,
                          }}
                        />
                      )}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data?.insurance_student_card}
                            onChange={handleChange}
                            name="insurance_student_card"
                          />
                        }
                        label=" Insurance/Student Card"
                      />
                      {data?.insurance_student_card && (
                        <UploadFile
                          {...{
                            data,
                            setData,
                            label: "Insurance Card/Student Card",
                            imageKey: "insurance_student_card_file",
                            required: true,
                          }}
                        />
                      )}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data?.bills}
                            onChange={handleChange}
                            name="bills"
                          />
                        }
                        label="Bills any with full name and address details"
                      />
                      {data?.bills && (
                        <UploadFile
                          {...{
                            data,
                            setData,
                            label: "Bills",
                            imageKey: "bills_file",
                            required: true,
                          }}
                        />
                      )}
                    </FormGroup>
                    {error && (
                      <FormHelperText className="text-base bg-red-500 text-white p-1 px-3 rounded">
                        Pick at least 3 form of ID
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>

                <FormControl required component="fieldset" variant="standard">
                  <FormLabel
                    component="legend"
                    className="text-orange-500 font-semibold pt-4 mb-4 text-xl"
                  >
                    Documents Checklist For Placement.
                  </FormLabel>
                  <FormGroup>
                    <div className="grid grid-cols-2 gap-8">
                      {documents_for_placement?.map((item) => (
                        <div className="">
                          <UploadFile
                            {...{
                              data,
                              setData,
                              label: `Upload ${item?.label}`,
                              imageKey: `${item?.value}_file`,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </FormGroup>
                </FormControl>

                <div className="w-full flex justify-end mt-6 gap-4">
                  {/* <Button variant="outlined" component={Link} to=""> */}
                  <Button variant="outlined" onClick={() => navigate(-1)} to="">
                    Go Back
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    // disabled={!data?.status}
                  >
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

export default AddRPLCertificate;

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
