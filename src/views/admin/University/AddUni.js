import {
  Autocomplete,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import InputField from "components/Input/InputField";
import { API_URL } from "const/constants";
import axios from "const/axios";
import useKothar from "context/useKothar";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClearIcon from "@mui/icons-material/Clear";
import { states } from "const/constants";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadFile from "components/Input/UploadFile";
import WholeScreenLoader from "components/WholeScreenLoader";

const AddUni = ({ color = "light" }) => {
  const [data, setData] = useState({
    name: null,
    abn: null,
    contactPerson: null,
    email: null,
    country: "Australia",
    state: [],
    zipCode: null,
    image: null,
  });

  const navigate = useNavigate();
  const [{ token }, { refetchUniData }] = useKothar();

  const { state } = useLocation();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    if (state) {
      setData({
        ...state?.item,
        state: states.filter(({ value: id1 }) =>
          state?.item?.state?.split("/").some((id2) => id2 === id1)
        ),
      });
    }
  }, [state]);

  const { mutate, isLoading } = useMutation(postData, {
    onSuccess(res) {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      refetchUniData();
      // setTimeout(() => {
      navigate("/admin/university");
      // }, 2000);
    },
    onError() {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });

  async function postData(payload) {
    if (data?.id) {
      await axios.put(`${API_URL}/university/${payload?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/university`, payload);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      ...data,
      state: data?.state?.map((item) => item?.value).join("/"),
    });
  };

  return (
    <div className="flex flex-wrap mt-4">
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
                  {data?.id ? "Edit" : "Add"} University
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
                      type="number"
                      placeholder="ABN Number"
                      name="abn"
                      label="ABN Number"
                      required
                      value={data?.abn}
                      onChange={handleInputChange}
                    />
                  </div>
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
                      type="text"
                      placeholder="Contact Person"
                      name="contactPerson"
                      label="Contact Person"
                      required
                      value={data?.contactPerson}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Country"
                      placeholder="Country"
                      name="country"
                      required
                      type="text"
                      value={data?.country}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="input-label">Select State *</label>
                    <Autocomplete
                      onChange={(e, value) => {
                        setData((prevState) => ({
                          ...prevState,
                          state: value,
                        }));
                      }}
                      required
                      multiple
                      value={data?.state}
                      placeholder="Select State"
                      options={states || []}
                      isOptionEqualToValue={(options, value) =>
                        options.value === value.value
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select State"
                          type="search"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                        />
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
                      label="ZIP Code"
                      placeholder="ZIP Code"
                      name="zipCode"
                      required
                      type="text"
                      value={data?.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>

                  <UploadFile
                    {...{
                      data,
                      setData,
                      label: "Image of University",
                      imageKey: "image",
                    }}
                  />
                </div>
                <div className="w-full flex justify-end mt-6 gap-4">
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
      {isLoading && <WholeScreenLoader open={isLoading} />}
    </div>
  );
};

export default AddUni;
