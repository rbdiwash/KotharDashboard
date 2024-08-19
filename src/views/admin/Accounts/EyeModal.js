import { Close } from "@mui/icons-material";
import { Button, Radio, Switch } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import InputField from "components/Input/InputField";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PermissionDrawer({
  open,
  setOpen,
  values,
  setValues,
  accountDetails,
  setAccountDetails,
}) {
  const toggleDrawer = () => {
    setOpen({ state: !open?.state, id: null });
  };
  const modules = [
    {
      label: "Agent Name",
      value: "client",
      type: "text",
    },
    {
      label: "Course Name",
      value: "course",
      type: "text",
    },
    {
      label: "College Name",
      value: "university",
      type: "text",
    },
    {
      label: "Start Date",
      value: "startDate",
      type: "date",
    },
    {
      label: "End Date",
      value: "endDate",
      type: "date",
    },
    {
      label: "Total Fees",
      value: "totalFees",
      type: "number",
    },
    {
      label: "Agreed Fees",
      value: "agreedFees",
      type: "number",
    },
    {
      label: "Discount",
      value: "discount",
      type: "number",
    },
    {
      label: "Material Fee",
      value: "materialFee",
      type: "number",
    },
    {
      label: "Enrolment Fee",
      value: "enrolmentFee",
      type: "number",
    },
    {
      label: "Number of Semester",
      value: "semester",
      type: "number",
    },
    {
      label: "Per Sem Fee",
      value: "perSemFee",
      type: "number",
    },
  ];

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    setValues(open?.value);
  }, [open.id]);

  const handleSubmit = () => {
    const foundRow = accountDetails?.find((item, i) => item?.id === open?.id);

    setAccountDetails((prevState) => [
      ...prevState?.slice(0, open?.index),
      { ...foundRow, admissionValues: values },
      ...prevState?.slice(open?.index + 1, accountDetails.length),
    ]);

    setOpen({ state: !open?.state, id: null });
    toast.success("Values updated successfully");
  };

  return (
    <Drawer
      anchor={"right"}
      open={open?.state}
      PaperProps={{ style: { width: "25%" } }}
    >
      <div className="flex justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">Admission More Details</h1>
        <Close onClick={toggleDrawer} className="cursor-pointer" />
      </div>
      <div className="mt-4 p-4">
        {modules.map((module) => (
          <div
            className="flex justify-between items-center mb-2"
            key={module.label}
          >
            <span className="w-48"> {module.label} </span>
            <InputField
              type={module?.type}
              name={module?.value}
              placeholder={module?.label}
              size="small"
              onChange={(e) => handleInputChange(e)}
              value={values?.[module.value]}
              className="min-w-[50px]"
            />
          </div>
        ))}
      </div>
      <div className="p-4 absolute bottom-0 w-full border-t">
        <div className="flex justify-between gap-4 ">
          <Button variant="outlined" onClick={toggleDrawer}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
