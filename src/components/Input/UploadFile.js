import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "./InputField";
import { Delete } from "@mui/icons-material";

const UploadFile = ({
  data,
  setData,
  imageKey,
  label = "Document",
  type = "single",
  required = false,
}) => {
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
        if (type === "multiple") {
          setData({
            ...data,
            [imageKey]: [...data?.[imageKey], res?.data?.url],
          });
        } else {
          setData({ ...data, [imageKey]: res?.data?.url });
        }
      })
      .catch((err) => {
        toast.error("Error Uploading file");
      });
  };

  const handleDeletePdf = (name, i) => {
    setData({
      ...data,
      [imageKey]: [...data?.[imageKey].filter((item, index) => i !== index)],
    });
  };

  return (
    <>
      <div className="relative w-full mb-3">
        <InputField
          label={`Upload ${label}` || "Upload Image"}
          name="image"
          required={required}
          type="file"
          onChange={(e) => handleFileChange(e, imageKey, "multiple")}
        />
        {type !== "multiple"
          ? data?.[imageKey] && (
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
                    <span className="text-lg font-semibold">
                      Download Image
                    </span>
                    <IconButton>
                      <FileDownloadIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </div>
                </Link>
              </div>
            )
          : data?.[imageKey]?.map((item, i) => (
              <div
                className="flex gap-4 items-center bg-gray-200 p-1 mt-2 rounded w-fit"
                key={i}
              >
                <img src={item} alt="" className="h-8" />
                <span>{item?.slice(0, 30)}</span>
                <Link
                  className="download"
                  to={item}
                  download
                  target="_blank"
                  // onClick={downloadImage}
                >
                  <Tooltip title="Download Image">
                    <IconButton>
                      <FileDownloadIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Tooltip title="Delete Image">
                  <Delete
                    className="cursor-pointer"
                    onClick={() => handleDeletePdf(imageKey, i)}
                  />
                </Tooltip>
              </div>
            ))}
      </div>
    </>
  );
};

export default UploadFile;
