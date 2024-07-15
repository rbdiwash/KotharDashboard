import { Edit } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  RadioGroup,
  Select,
  Radio,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import InputField from "components/Input/InputField";
import SelectField from "components/Input/SelectField";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { useEffect } from "react";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PermissionDrawer from "./PermissionDrawer";

const AddUsers = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [data, setData] = useState({
    name: "",
    password: "",
    mobileNumber: "",
    email: "",
    username: "",
    type: "",
    accessToDiscussion: true,
    orgId: null,
  });

  const [{ consultancyList }, { refetchUsers }] = useKothar();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const { state } = useLocation();

  const navigate = useNavigate();
  const { isLoading, isError, error, mutate } = useMutation(postData, {
    onSuccess() {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      navigate("/admin/user");
      refetchUsers();
    },
    onError() {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });
  async function postData(payload) {
    if (payload?.id) {
      await axios.put(`${API_URL}/users/${payload?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/register/user`, payload);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      ...data,
      mfa: true,
      type: data?.type?.value,
    });
  };

  useEffect(() => {
    if (state?.item) {
      const value = state.item;
      setData({
        name: value?.name,
        orgId: value?.organization?.id,
        username: value?.username,
        mobileNumber: value?.mobileNumber,
        email: value?.email,
        password: value?.password,
        type: value?.type,
        accessToDiscussion: value?.accessToDiscussion ?? false,
        mfa: value?.mfa,
        id: value?.id,
      });
    }
  }, [state]);

  const handleOpenPermissionModule = () => {
    setOpenDrawer(true);
  };
  return (
    <div className="flex flex-wrap mt-4 dashBody">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded  bg-white"
          }
        >
          <div className="rounded-t mb-0 px-10 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full  max-w-full flex justify-start gap-4 items-center">
                <IoArrowBack
                  className="text-xl cursor-pointer"
                  onClick={() => navigate(-1)}
                />
                <h3 className={"font-semibold text-xl text-slate-700"}>
                  Add Admins/Users
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
                      label="Full Name"
                      placeholder="Enter Full Name"
                      name="name"
                      required
                      type="text"
                      value={data?.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Username"
                      placeholder="Enter Username"
                      name="username"
                      required
                      type="text"
                      value={data?.username}
                      onChange={handleInputChange}
                    />
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
                      type="number"
                      placeholder="Mobile Number"
                      name="mobileNumber"
                      label="Mobile Number"
                      required
                      value={data?.mobileNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      type="text"
                      placeholder="Password"
                      name="password"
                      label="Password"
                      required
                      value={
                        state?.item
                          ? "You cannot edit from here"
                          : data?.password
                      }
                      disabled={state?.item}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Select Consultancy
                    </label>
                    <Autocomplete
                      disablePortal
                      size="small"
                      value={
                        consultancyList?.find(
                          (item) => item?.id === data?.orgId
                        ) || null
                      }
                      options={consultancyList || []}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Consultancy"
                          required
                        />
                      )}
                      getOptionLabel={(option) => option?.name || ""}
                      isOptionEqualToValue={(options, value) =>
                        options.id === value.id
                      }
                      onChange={(e, value) => {
                        setData((prevState) => ({
                          ...prevState,
                          orgId: value?.id,
                        }));
                      }}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      User Type
                    </label>
                    <Autocomplete
                      disablePortal
                      size="small"
                      required
                      options={[
                        { label: "ADMIN", value: "ADMIN" },
                        { label: "USER", value: "USER" },
                      ]}
                      value={[
                        { label: "ADMIN", value: "ADMIN" },
                        { label: "USER", value: "USER" },
                      ]?.find((item) => item?.value === data?.type)}
                      renderInput={(params) => (
                        <TextField {...params} label="User Type" required />
                      )}
                      isOptionEqualToValue={(options, value) =>
                        options.value === value.value
                      }
                      onChange={(e, value) => {
                        setData((prevState) => ({
                          ...prevState,
                          type: value,
                        }));
                      }}
                    />
                  </div>
                  <div className="relative w-full mb-1">
                    <FormControl required>
                      <FormLabel className="text-slate-600 uppercase text-xs font-bold mb-2">
                        Access to Discussion
                      </FormLabel>
                      <RadioGroup
                        row
                        required
                        name="accessToDiscussion"
                        value={data?.accessToDiscussion}
                        onChange={(e, value) => {
                          setData((prevState) => ({
                            ...prevState,
                            accessToDiscussion: Boolean(value),
                          }));
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />

                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="relative w-full mb-3">
                    <div className="flex justify-between">
                      <label
                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Permitted Modules
                      </label>{" "}
                      <Edit
                        className="pointer"
                        onClick={handleOpenPermissionModule}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end mt-6 gap-4">
                  <Button variant="outlined" onClick={() => navigate(-1)} to="">
                    Go Back
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isLoading}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {openDrawer && (
        <PermissionDrawer {...{ open: openDrawer, setOpen: setOpenDrawer }} />
      )}
    </div>
  );
};

export default AddUsers;
