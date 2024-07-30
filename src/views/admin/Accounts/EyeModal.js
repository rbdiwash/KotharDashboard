import { Close } from "@mui/icons-material";
import { Button, Radio, Switch } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import InputField from "components/Input/InputField";
import { useState } from "react";

export default function PermissionDrawer({ open, setOpen }) {
  const toggleDrawer = (event) => {
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
    },
    {
      label: "Agreed Fees",
      value: "agreedFees",
    },
    {
      label: "Discount",
      value: "discount",
    },
    {
      label: "Material Fee",
      value: "materialFee",
    },
    {
      label: "Enrolment Fee",
      value: "enrolmentFee",
    },
    {
      label: "Number of Semester",
      value: "semester",
    },
    {
      label: "Per Sem Fee",
      value: "perSemFee",
    },
  ];

  const [values, setValues] = useState(modules.map((item) => item.value));

  const onChange = (event, value) => {
    if (event.target.checked) {
      setValues([value, ...values]);
    } else {
      setValues((item) => item?.filter((arg) => arg !== value));
    }
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const row = values.find((item, i) => i === index);
    setValues((prevState) => [
      ...prevState?.slice(0, index),
      { ...row, [name]: value },
      ...prevState?.slice(index + 1, values.length),
    ]);
  };
  const handleSubmit = () => {
    console.log(values);
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
      </div>{" "}
      <div className="mt-4 p-4">
        {modules.map((module) => (
          <div className="flex justify-between items-center mb-2">
            <span className="w-48"> {module.label} </span>
            <InputField
              type={module?.type}
              name={module?.label}
              placeholder={module?.label}
              size="small"
              onChange={(e) => handleInputChange(e)}
              value={module?.module?.value}
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
            {" "}
            Submit
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
