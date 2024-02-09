import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "./InputField";

const UploadFile = ({ data, setData, imageKey, label }) => {
  const [{ token }, { setWholeLoading }] = useKothar();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    // setWholeLoading(true);
    axios
      .post(`${API_URL}/file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("File Uploaded Successfully");

        setData({ ...data, [imageKey]: res?.data?.url });
        // setWholeLoading(false);
      })
      .catch((err) => {
        toast.error("Error Uploading file");
      });
  };

  // const downloadImage = () => {
  //   saveAs(data?.image);
  // };

  return (
    <>
      <div className="relative w-full mb-3">
        <InputField
          label={label || "Upload Image"}
          name="image"
          // required
          type="file"
          onChange={handleFileChange}
        />
        {data?.[imageKey] && (
          <div className="show-image">
            <img
              src={data?.[imageKey]}
              alt="Image"
              className="mr-auto mt-4 h-80 w-80 border p-3 object-cover"
            />
            <div className="delete">
              <Tooltip title="Delete Image">
                <IconButton>
                  <ClearIcon
                    sx={{ fontSize: 40 }}
                    onClick={() => setData({ ...data, [imageKey]: null })}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <Link
              className="download"
              to={data?.[imageKey]}
              download
              target="_blank"
              // onClick={downloadImage}
            >
              <div className="flex items-center justify-between bg-gray-300 py-1 px-4">
                <span className="text-lg font-semibold">Download Image</span>
                <IconButton>
                  <FileDownloadIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadFile;
