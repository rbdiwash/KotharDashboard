import { Check } from "@mui/icons-material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Autocomplete, IconButton, TextField, Tooltip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ImageName } from "components/helper";
import { API_URL } from "const/constants";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";

const TableRow = ({
  item,
  index,
  //   data,
  //   setData,
  navigate,
  setOpenConfirmationModal,
  setIsStatusEditable,
  isStautusEditable,
  getRPLList,
  rpl_status,
  setValue,
}) => {
  const [data, setData] = useState(item);

  const { mutate, isLoading } = useMutation(postData, {
    onSuccess() {
      toast.success("Data updated Successfully");
      setIsStatusEditable({ id: null, state: false });
      getRPLList();

      console.log(rpl_status, data.status);
      const correctIndex = rpl_status.findIndex(
        (arg) => arg?.value === data?.status
      );
      console.log("🚀  correctIndex:", correctIndex);

      setValue(correctIndex);
    },
    onError() {
      toast.error("Error Updating Data");
    },
  });

  async function postData(payload) {
    await axios.put(`${API_URL}/rpl/${payload?.id}`, payload);
  }

  const updateData = (value) => {
    if (!data?.status) {
      toast.error("Status is required to update the data");
    }

    mutate({
      ...data,
      useExistingClientData: true,
      placementRequired: "yes" ? true : false,
      status: data?.status,
    });
  };
  return (
    <tr key={item?.id}>
      <td className="table-data text-left flex items-center">
        {ImageName(item?.name)}
        <span className={"ml-3 font-bold text-slate-600"}>
          {item?.name || "-"}
        </span>
      </td>
      <td className="table-data">{item?.email || "-"}</td>
      <td className="table-data">{item?.usiNumber || "-"}</td>
      <td className="table-data">{item?.visaStatus || "-"}</td>
      <td className="table-data">{item?.certificate || "-"}</td>
      <td className="table-data">{item?.reference || "-"}</td>
      <td className="table-data">{item?.caseOfficer || "-"}</td>
      <td className="table-data">
        {isStautusEditable?.state && isStautusEditable?.id === data?.id ? (
          <Autocomplete
            onChange={(e, value) => {
              setData((prevState) => ({
                ...prevState,
                status: value?.value,
              }));
              // updateData(value?.value);
            }}
            required
            value={
              rpl_status?.find((item) => item?.value === data?.status) || null
            }
            options={rpl_status}
            disablePortal
            renderInput={(params) => (
              <TextField {...params} label="Select RPL Status" />
            )}
            ListboxProps={{
              style: {
                maxHeight: "180px",
              },
            }}
            size="small"
            sx={{ width: 250 }}
            // onBlur={updateData}
          />
        ) : (
          <span className="cursor-pointer">{item?.status || "-"}</span>
        )}
      </td>

      <td className="table-data text-right">
        <div className="flex items-center">
          {!isStautusEditable?.state ? (
            <Tooltip title="Edit Status only" arrow>
              <IconButton
                onClick={() => {
                  setIsStatusEditable({ id: item?.id, state: true });
                  setData(item);
                }}
              >
                <DriveFileRenameOutlineIcon className="text-yellow-600 cursor-pointer" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Save Data" arrow>
              <IconButton
                onClick={() => {
                  updateData();
                }}
              >
                <Check className="text-yellow-600 cursor-pointer" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="View" arrow>
            <IconButton>
              <AiFillEye className="text-sky-600 cursor-pointer" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit RPL Details" arrow>
            <IconButton
              onClick={() =>
                navigate("/admin/rpl-certificate/add", {
                  state: { item },
                })
              }
            >
              <AiFillEdit className="text-sky-600 cursor-pointer" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete RPL Details" arrow>
            <IconButton
              onClick={() =>
                setOpenConfirmationModal({
                  state: true,
                  id: item?.id,
                })
              }
            >
              <AiFillDelete className="text-red-600 cursor-pointer" />
            </IconButton>
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
