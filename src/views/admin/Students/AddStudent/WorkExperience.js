import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import InputField from "components/Input/InputField";
import { useState } from "react";

const WorkExperience = () => {
  const [expData, setExpData] = useState([
    {
      nameofOrg: null,
      from: null,
      to: null,
      docs: null,
      uid: crypto.randomUUID(),
    },
  ]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleAddMore = () => {
    setExpData([
      ...expData,
      {
        nameofOrg: null,
        from: null,
        to: null,
        docs: null,
        uid: crypto.randomUUID(),
      },
    ]);
  };
  const handleDeleteExp = (id) => {
    setExpData([...expData.filter((item) => item?.uid !== id)]);
  };
  return (
    <div>
      <div className="sub-heading">Work Experience:</div>
      <hr />
      {expData?.map((item, index) => (
        <div className="flex items-end gap-8 mt-6" key={index}>
          <div className="relative w-full">
            <TextField
              fullWidth
              label="Name of Organization"
              placeholder="Name of Organization"
              name="nameofOrg"
              required
              type="text"
              sx={{ minWidth: 300 }}
              value={item?.nameofOrg}
              onChange={handleInputChange}
            />
          </div>

          <TextField
            type="text"
            placeholder="From"
            name="from"
            label="From"
            required
            sx={{ minWidth: 100 }}
            value={item?.from}
            onChange={handleInputChange}
          />

          <TextField
            type="text"
            placeholder="To"
            name="to"
            label="To"
            required
            sx={{ minWidth: 100 }}
            value={item?.to}
            onChange={handleInputChange}
          />

          <div className="relative w-full">
            <InputField
              fullWidth
              label="Upload Documents"
              name="permanent.zip"
              required
              type="file"
              value={item?.docs}
              onChange={handleInputChange}
            />
          </div>
          <Tooltip title="Delete experience">
            <Button>
              <DeleteIcon onClick={() => handleDeleteExp(item?.uid)} />
            </Button>
          </Tooltip>
        </div>
      ))}
      <div className="row mt-4">
        <Button variant="contained" onClick={handleAddMore}>
          Add More Work Experience
        </Button>
      </div>
    </div>
  );
};

export default WorkExperience;
