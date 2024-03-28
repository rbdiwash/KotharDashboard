import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField, Tooltip } from "@mui/material";
import InputField from "components/Input/InputField";
import UploadFile from "components/Input/UploadFile";

const WorkExperience = ({ workInfo, setWorkInfo }) => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const row = workInfo.find((item, i) => i === index);
    setWorkInfo((prevState) => [
      ...prevState?.slice(0, index),
      { ...row, [name]: value },
      ...prevState?.slice(index + 1, workInfo.length),
    ]);
  };
  const handleAddMore = () => {
    setWorkInfo([
      ...workInfo,
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
    setWorkInfo([...workInfo.filter((item) => item?.uid !== id)]);
  };
  return (
    <div>
      <div className="sub-heading">Work Experience:</div>

      {workInfo?.map((item, index) => (
        <div className="flex  gap-8 mt-6 items-center" key={index}>
          <div className="relative w-full">
            <InputField
              fullWidth
              size="small"
              label="Name of Organization"
              placeholder="Name of Organization"
              name="nameofOrg"
              required
              type="text"
              sx={{ minWidth: 300 }}
              value={item?.nameofOrg}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
          <div className="relative w-full">
            <InputField
              type="date"
              placeholder="From"
              name="from"
              label="From"
              required
              sx={{ minWidth: 100 }}
              value={item?.from}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
          <div className="relative w-full">
            <InputField
              type="date"
              placeholder="To"
              name="to"
              label="To"
              required
              sx={{ minWidth: 100 }}
              value={item?.to}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>

          <UploadFile
            {...{
              data: workInfo,
              setData: setWorkInfo,
              label: "Documents",
              imageKey: "documents",
            }}
          />
          <Tooltip title="Delete experience">
            <Button>
              <DeleteIcon onClick={() => handleDeleteExp(item?.uid)} />
            </Button>
          </Tooltip>
        </div>
      ))}
      <div className="row mt-4">
        <Button variant="contained" onClick={handleAddMore}>
          Add Work Experience
        </Button>
      </div>
    </div>
  );
};

export default WorkExperience;
