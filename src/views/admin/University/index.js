import { Button, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import DeleteModal from "components/Modals/DeleteModal";
import SearchField from "components/SearchField";
import { ImageName } from "components/helper";
import { delete_data } from "const/axios";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const University = ({ color = "light" }) => {
  const tableHeadClass = color === "light" ? "light-bg" : "dark-bg";
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [{ uniData, token }, { refetchUniData }] = useKothar();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(uniData);

  const deleteData = () => {
    delete_data(
      `${API_URL}/university/${openConfirmationModal?.id}`,
      () => {
        setOpenConfirmationModal({ state: false, id: null });
        refetchUniData();
      },
      token
    );
  };

  useEffect(() => {
    if (searchText.length > 0) {
      const filtered = uniData?.filter(
        (client) =>
          client?.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
          client?.email?.toLowerCase().includes(searchText?.toLowerCase()) ||
          client?.abn?.toLowerCase().includes(searchText?.toLowerCase()) ||
          client?.state?.toLowerCase().includes(searchText?.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(uniData);
    }
  }, [searchText]);

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
                Universities
              </h3>
              <SearchField
                {...{ type: "University", searchText, setSearchText }}
              />
              <Button
                variant="contained"
                startIcon={<FaPlusCircle />}
                component={Link}
                to="/admin/university/add"
              >
                Add University
              </Button>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className={"table-head " + tableHeadClass}>Name</th>
                  <th className={"table-head " + tableHeadClass}>Email</th>
                  <th className={"table-head " + tableHeadClass}>ABN Number</th>
                  <th className={"table-head " + tableHeadClass}>
                    Contact Person
                  </th>
                  <th className={"table-head " + tableHeadClass}>Country</th>
                  <th className={"table-head " + tableHeadClass}>State</th>
                  <th className={"table-head " + tableHeadClass}>ZIP Code</th>
                  <th className={"table-head " + tableHeadClass}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData?.map((item, index) => (
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
                          {item?.name}
                        </span>
                      </td>
                      <td className="table-data">{item?.email}</td>
                      <td className="table-data">{item?.abn}</td>
                      <td className="table-data">
                        <div className="flex">{item?.contactPerson}</div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center gap-2">
                          {(item?.country === "Australia" ||
                            item?.country === "australia") && (
                            <img
                              src={require("assets/img/country/aus.png")}
                              alt="..."
                              className="w-10 h-10 rounded-full border-2 border-slate-50 shadow"
                            ></img>
                          )}

                          {item?.country}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center">{item?.state}</div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center">{item?.zipCode}</div>
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
                                navigate("/admin/university/add", {
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
                    <td colSpan={8}>
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

export default University;
