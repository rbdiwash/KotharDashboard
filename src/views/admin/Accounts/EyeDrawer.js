import { Close } from "@mui/icons-material";
import { Button, Radio, Switch } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";

export default function EyeDrawer({ open, setOpen }) {
  const toggleDrawer = (event) => {
    setOpen(!open);
  };
  const modules = [
    {
      label: "Client",
      value: "client",
      icon: "fas fa-user",
    },
    {
      label: "University",
      value: "university",
      icon: "fas fa-school",
    },
    {
      label: "Course",
      value: "course",
      icon: "fas fa-briefcase",
    },
    {
      label: "RPL Certificate",
      value: "rpl-certificate",
      icon: "fas fa-briefcase",
    },
    {
      label: "Student",
      value: "student",
      icon: "fas fa-graduation-cap",
    },
    {
      label: "Visa",
      value: "visa",
      icon: "fas fa-x-ray",
    },
    {
      label: "Insurance",
      value: "insurance",
      icon: "fas fa-x-ray",
    },
    {
      label: "Skill Assessment",
      value: "skill-assessment",
      icon: "fas fa-x-ray",
    },
    {
      label: "Consultancy",
      value: "consultancy",
      icon: "fas fa-briefcase",
    },
    {
      label: "Invoice",
      value: "invoice",
      icon: "fas fa-file-invoice-dollar",
    },

    {
      label: "Account",
      value: "account",
      icon: "fas fa-file-invoice-dollar",
    },
    {
      label: "Profit/Loss",
      value: "profit-loss",
      icon: "fas fa-dollar-sign",
    },
  ];

  const [values, setValues] = useState(modules.map((item) => item.value));

  const onChange = (event, value) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      setValues([value, ...values]);
    } else {
      setValues((item) => item?.filter((arg) => arg !== value));
    }
  };

  return (
    <Drawer
      anchor={"right"}
      open={open}
      PaperProps={{ style: { width: "25%" } }}
    >
      <div className="flex justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">Manage Permissions</h1>
        <Close onClick={toggleDrawer} className="cpointer" />
      </div>{" "}
      <div className="mt-4 p-4">
        <div className="text-base font-semibold uppercase mb-3 underline">
          Permitted Modules
        </div>
        {modules.map((module) => (
          <div className="flex justify-between items-center mb-2">
            <div className="flex">
              <i className={`${module?.icon} mr-2 text-sm text-slate-300`}></i>
              <span className=""> {module.label} </span>
            </div>
            <Switch
              checked={values.find((item) => item === module?.value) || null}
              onChange={(event) => onChange(event, module?.value)}
            />
          </div>
        ))}
      </div>
      <div className="p-4 absolute bottom-0 w-full border-t">
        <div className="flex justify-between gap-4 ">
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained"> Submit</Button>
        </div>
      </div>
    </Drawer>
  );
}
