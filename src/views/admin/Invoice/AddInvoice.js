import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField, Tooltip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import InputField from "components/Input/InputField";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddInvoice = () => {
  const [data, setData] = useState({
    title: null,
    invoiceTo: null,
    paymentInfo: {
      accountNumber: "",
      accountName: "",
      bankDetails: "",
    },
    invoices: [],
  });
  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      setData({ ...state?.item });
    }
  }, [state]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name?.split(".")?.length > 1) {
      let key = name?.split(".")[0];
      let nestedKey = name?.split(".")[1];
      setData((prevState) => ({
        ...prevState,
        [key]: { ...prevState?.[key], [nestedKey]: value },
      }));
    } else {
      setData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const navigate = useNavigate();
  const { isLoading, isError, error, mutate } = useMutation(postData, {
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
    if (data?.id) {
      await axios.put(`${API_URL}/api/invoice/update/${payload?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/api/invoice`, payload);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...data });
  };
  const handleAddMore = () => {
    setData({
      ...data,
      invoices: [
        ...data?.invoices,
        {
          description: null,
          price: null,
          quantity: null,
          total: null,
          uid: crypto.randomUUID(),
        },
      ],
    });
  };
  const handleDeleteInv = (id) => {
    setData({
      ...data,
      invoices: [...data?.invoices?.filter((item) => item?.uid !== id)],
    });
  };

  const handleInvoiceInput = (e, index) => {
    const { name, value } = e.target;
    const row = data?.invoices?.find((item, i) => i === index);

    setData((prevState) => ({
      ...prevState,
      invoices: [
        ...prevState?.invoices?.slice(0, index),
        { ...row, [name]: value },
        ...prevState?.invoices?.slice(index + 1, data.invoices?.length),
      ],
    }));
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
                  Add Invoice
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
                      label="Title"
                      placeholder="Enter Title"
                      name="Title"
                      required
                      type="text"
                      value={data?.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Invoice to"
                      placeholder="Enter Invoice to"
                      name="invoiceTo"
                      required
                      type="text"
                      value={data?.invoiceTo}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      type="text"
                      placeholder="Account Number"
                      name="paymentInfo.accountNumber"
                      label="Account Number"
                      required
                      value={data?.paymentInfo?.accountNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      type="text"
                      placeholder="Account Name"
                      name="paymentInfo.accountName"
                      label="Account Name"
                      required
                      value={data?.paymentInfo?.accountName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      type="text"
                      placeholder="Bank Details"
                      name="paymentInfo.bankDetails"
                      label="Bank Details"
                      required
                      value={data?.paymentInfo?.bankDetails}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {data?.invoices?.map((item, index) => (
                  <div
                    className="grid grid-cols-12 items-center gap-8 mt-6"
                    key={index}
                  >
                    <div className="col-span-5 relative w-full">
                      <InputField
                        fullWidth
                        label="Description"
                        placeholder="Description"
                        name="description"
                        required
                        type="text"
                        sx={{ minWidth: 300 }}
                        value={item?.description}
                        onChange={(e) => handleInvoiceInput(e, index)}
                      />
                    </div>
                    <div className="col-span-2 relative w-full">
                      <InputField
                        type="number"
                        placeholder="Price"
                        name="price"
                        label="Price"
                        required
                        sx={{ minWidth: 60 }}
                        value={item?.price}
                        onChange={(e) => handleInvoiceInput(e, index)}
                      />
                    </div>
                    <div className="col-span-2 relative w-full">
                      <InputField
                        type="number"
                        placeholder="Quantity"
                        name="quantity"
                        label="Quantity"
                        required
                        sx={{ minWidth: 60 }}
                        value={item?.quantity}
                        onChange={(e) => handleInvoiceInput(e, index)}
                      />
                    </div>
                    <div className="col-span-2 relative w-full">
                      <InputField
                        fullWidth
                        label="Total"
                        name="Total"
                        placeholder="Total"
                        required
                        type="number"
                        value={item?.total}
                        onChange={(e) => handleInvoiceInput(e, index)}
                      />
                    </div>
                    <Tooltip title="Delete this detail">
                      <Button>
                        <DeleteIcon
                          onClick={() => handleDeleteInv(item?.uid)}
                        />
                      </Button>
                    </Tooltip>
                  </div>
                ))}
                <div className="row mt-4">
                  <Button variant="contained" onClick={handleAddMore}>
                    Add Invoice Details
                  </Button>
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

export default AddInvoice;
