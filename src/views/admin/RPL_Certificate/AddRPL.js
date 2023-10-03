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

const AddRPLCertificate = ({ color = "light" }) => {
  const [data, setData] = useState({
    name: null,
    address: null,
    email: null,
    website: null,
    owner: null,
    panNumber: null,
    primaryContactNumber: null,
    secondaryContactNumber: null,
    logo: null,
    image: null,
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

  const [states, setState] = useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({
      ...states,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = states;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

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
                  Add RPL Certificate
                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto mt-8">
            <div className="flex-auto lg:px-10 py-10 pt-0">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-4 text-white">
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
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-4 text-white">
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
                      onChange={handleInputChange}
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
                  </div>
                </div>
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-4 text-white">
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
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Logo of Consultancy"
                      name="logo"
                      // required
                      type="file"
                      onChange={(e) => handleFileChange(e, "logo")}
                    />
                    {data?.logo && (
                      <div class="show-image">
                        <img
                          src={data?.logo}
                          alt="Image"
                          className="mr-auto mt-4 h-80 w-80 border p-3 object-cover"
                        />
                        <div className="delete">
                          <IconButton>
                            <ClearIcon
                              sx={{ fontSize: 40 }}
                              onClick={() => setData({ ...data, logo: null })}
                            />
                          </IconButton>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="Image of Consultancy"
                      name="image"
                      // required
                      type="file"
                      onChange={(e) => handleFileChange(e, "image")}
                    />
                    {data?.image && (
                      <div class="show-image">
                        <img
                          src={data?.image}
                          alt="Image"
                          className="mr-auto mt-4 h-80 w-80 border p-3 object-cover"
                        />
                        <div className="delete">
                          <IconButton>
                            <ClearIcon
                              sx={{ fontSize: 40 }}
                              onClick={() => setData({ ...data, image: null })}
                            />
                          </IconButton>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-4 text-white">
                  Our Services
                </p>
                <div className="grid grid-cols-3 gap-8">
                  {services?.map((item) => (
                    <div className="flex items-center gap-2 w-full mb-3 font-semibold">
                      <i className="fas fa-check-circle text-orange-500 text-xl"></i>
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-xl font-semibold tracking-wider bg-orange-500 p-4 text-white">
                  Upload Documents
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Valid Passport"
                      name="passport"
                      // required
                      type="file"
                      onChange={(e) => handleFileChange(e, "passport")}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Current Visa"
                      name="visa"
                      // required
                      type="file"
                      onChange={(e) => handleFileChange(e, "visa")}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      label="All COE's"
                      name="coe"
                      // required
                      type="file"
                      onChange={(e) => handleFileChange(e, "coe")}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="USI Number"
                      name="usi_number"
                      // required
                      type="file"
                      onChange={(e) => handleFileChange(e, "usi_number")}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Reference Letter from currently working company."
                      name="usi_number"
                      // required
                      type="file"
                      onChange={(e) => handleFileChange(e, "usi_number")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <FormControl
                    required
                    error={error}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">
                      100 Points ID (Any 3 Form of ID)
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={gilad}
                            onChange={handleChange}
                            name="gilad"
                          />
                        }
                        label="Gilad Gray"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={jason}
                            onChange={handleChange}
                            name="jason"
                          />
                        }
                        label="Jason Killian"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={antoine}
                            onChange={handleChange}
                            name="antoine"
                          />
                        }
                        label="Antoine Llorca"
                      />
                    </FormGroup>
                    <FormHelperText>Pick at least 3 form of ID</FormHelperText>
                  </FormControl>
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
