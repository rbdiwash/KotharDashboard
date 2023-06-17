import { Button, IconButton } from "@mui/material";
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

const AddConsultancy = ({ color = "light" }) => {
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
  console.log("🚀  data:", data);
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
                  Add Consultancy
                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto mt-8">
            <div className="flex-auto lg:px-10 py-10 pt-0">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-8">
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Name"
                      placeholder="Name"
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
                  </div>{" "}
                  <div className="relative w-full mb-3">
                    <InputField
                      type="email"
                      placeholder="University Email"
                      name="email"
                      label="Email"
                      required
                      value={data?.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Website Link"
                      placeholder="Website Link"
                      name="website"
                      required
                      type="text"
                      value={data?.website}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Owner Name"
                      placeholder="Owner Name"
                      name="owner"
                      required
                      type="text"
                      value={data?.owner}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      type="number"
                      placeholder="PAN Number/ABN Number"
                      name="panNumber"
                      label="PAN Number/ABN Number"
                      required
                      value={data?.panNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      type="number"
                      placeholder="Primary Contact Number"
                      name="primaryContactNumber"
                      label="Primary Contact Number"
                      required
                      value={data?.primaryContactNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      type="number"
                      placeholder="Secondary Contact Number"
                      name="secondaryContactNumber"
                      label="Secondary Contact Number"
                      value={data?.secondaryContactNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Logo of Consultancy"
                      name="logo"
                      // required
                      type="file"
                      onChange={(e) => handleFileChange(e, "logo")}
                    />{" "}
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
                    />{" "}
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
                <div className="w-full flex justify-end mt-6 gap-4">
                  {/* <Button variant="outlined" component={Link} to=""> */}
                  <Button variant="outlined" onClick={() => navigate(-1)} to="">
                    Go Back
                  </Button>{" "}
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

export default AddConsultancy;
