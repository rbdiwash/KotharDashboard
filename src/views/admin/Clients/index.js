import { Button, IconButton, Tooltip } from "@mui/material";
import DeleteModal from "components/Modals/DeleteModal";
import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "const/constants";
import axios from "axios";
import { toast } from "react-toastify";
import useKothar from "context/useKothar";
import { ImageName } from "components/helper";
import SearchField from "components/SearchField";

const Clients = ({ color = "light" }) => {
  const tableHeadClass = color === "light" ? "light-bg" : "dark-bg";
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [searchText, setSearchText] = useState("");

  const [{ clientList }, { refetchClient }] = useKothar();

  const deleteData = () => {
    axios
      .delete(`${API_URL}/organization/delete/${openConfirmationModal?.id}`)
      .then((res) => {
        toast.success("Data Deleted Successfully");
        setOpenConfirmationModal({ state: false, id: null });
        refetchClient();
      })
      .error((err) => {
        toast.error("Error Deleting Data");
      });
  };

  return (
    <div className="flex flex-wrap mt-4 dashBody">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
            (color === "light" ? "bg-white" : "bg-sky-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center justify-between">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-slate-700" : "text-white")
                }
              >
                Clients
              </h3>
              <SearchField {...{ type: "Client", searchText, setSearchText }} />
              <Button
                variant="contained"
                startIcon={<FaPlusCircle />}
                component={Link}
                to="/admin/client/add"
              >
                Add Client Details
              </Button>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className={"table-head " + tableHeadClass}>Name</th>
                  <th className={"table-head " + tableHeadClass}>Email</th>
                  <th className={"table-head " + tableHeadClass}>
                    Phone Number
                  </th>
                  <th className={"table-head " + tableHeadClass}>
                    Passport Number
                  </th>
                  <th className={"table-head " + tableHeadClass}>
                    Visa Status
                  </th>{" "}
                  <th className={"table-head " + tableHeadClass}>
                    Visa Expiry
                  </th>
                </tr>
              </thead>
              <tbody>
                {clientList?.length > 0 ? (
                  clientList?.map((item, index) => (
                    <tr key={item?.id || index}>
                      <td className="table-data text-left flex items-center">
                        {ImageName(item?.name)}
                        <span
                          className={
                            "ml-3 font-bold " +
                            +(color === "light"
                              ? "text-slate-600"
                              : "text-white")
                          }
                        >
                          {item?.name || "-"}
                        </span>
                      </td>
                      <td className="table-data">{item?.email || "-"}</td>
                      <td className="table-data">
                        <div className="flex">{item?.owner || "-"}</div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center gap-2">
                          {item?.primaryContactNumber || "-"}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.website || "-"}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.panNumber || "-"}
                        </div>
                      </td>

                      <td className="table-data text-right">
                        <div className="flex items-center">
                          <Tooltip title="View" arrow>
                            <IconButton>
                              <AiFillEye className="text-sky-600 cursor-pointer" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit University" arrow>
                            <IconButton
                              onClick={() =>
                                navigate("/admin/consultancy/add", {
                                  state: { item },
                                })
                              }
                            >
                              <AiFillEdit className="text-sky-600 cursor-pointer" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete University" arrow>
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
                  ))
                ) : (
                  <tr key={1}>
                    <td colSpan={6}>
                      <div className="text-lg text-center my-10">
                        No Results Found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openConfirmationModal.state && (
        <DeleteModal
          open={openConfirmationModal.state}
          item="University"
          handleCancel={() =>
            setOpenConfirmationModal({ state: false, id: null })
          }
          handleDelete={() => deleteData()}
        />
      )}
    </div>
  );
};

export default Clients;
