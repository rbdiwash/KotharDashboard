import { Button, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import DeleteModal from "components/Modals/DeleteModal";
import DiscussionModal from "components/Modals/DiscussionModal";
import SearchField from "components/SearchField";
import { ImageName } from "components/helper";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaPlusCircle, FaRocketchat } from "react-icons/fa";
import { toast } from "react-toastify";
import InsuranceModal from "./InsuranceModal";

const Insurance = ({ color = "light" }) => {
  const tableHeadClass = color === "light" ? "light-bg" : "dark-bg";
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [openInsuranceForm, setOpenInsuranceForm] = useState({});
  const [searchText, setSearchText] = useState("");

  const [{ insuranceList }, { refetchInsuranceList }] = useKothar();
  const [filteredData, setFilteredData] = useState(insuranceList);

  const deleteData = () => {
    axios
      .delete(`${API_URL}/insurance/${openConfirmationModal?.id}`)
      .then((res) => {
        toast.success(res?.data?.message || "Data Deleted Successfully");
        setOpenConfirmationModal({ state: false, id: null });
        refetchInsuranceList();
      })
      .catch((err) => {
        toast.error("Error Deleting Data");
      });
  };
  const [openDiscussion, setOpenDiscussion] = useState(false);
  const handleDiscussion = () => {
    setOpenDiscussion(!openDiscussion);
  };

  useEffect(() => {
    if (searchText.length > 0) {
      const filtered = insuranceList?.filter(
        (client) =>
          client?.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
          client?.insuranceCompany
            ?.toLowerCase()
            .includes(searchText?.toLowerCase()) ||
          client?.type?.toLowerCase().includes(searchText?.toLowerCase()) ||
          client?.coverType
            ?.toLowerCase()
            .includes(searchText?.toLowerCase()) ||
          client?.caseOfficer?.toLowerCase().includes(searchText?.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(insuranceList);
    }
  }, [searchText, insuranceList, openConfirmationModal]);

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
                Insurance
              </h3>
              <SearchField
                {...{ type: "Insurance", searchText, setSearchText }}
              />
              <div className="flex items-center gap-4">
                <FaRocketchat
                  className="text-blue-500 text-3xl cursor-pointer"
                  onClick={handleDiscussion}
                />{" "}
                <Button
                  variant="contained"
                  startIcon={<FaPlusCircle />}
                  onClick={() =>
                    setOpenInsuranceForm({ state: true, id: null })
                  }
                >
                  Add Insurance
                </Button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className={"table-head " + tableHeadClass}>Full Name</th>
                  <th className={"table-head " + tableHeadClass}>Address</th>
                  <th className={"table-head " + tableHeadClass}>
                    Phone Number
                  </th>
                  <th className={"table-head " + tableHeadClass}>
                    Insurance Company
                  </th>
                  <th className={"table-head " + tableHeadClass}>Start Date</th>
                  <th className={"table-head " + tableHeadClass}>End Date</th>
                  <th className={"table-head " + tableHeadClass}>
                    Payment Type
                  </th>
                  <th className={"table-head " + tableHeadClass}>Cost</th>
                  <th className={"table-head " + tableHeadClass}>
                    Insurance Type
                  </th>
                  <th className={"table-head " + tableHeadClass}>
                    Insurance Cover Type
                  </th>
                  <th className={"table-head " + tableHeadClass}>
                    Case Officer
                  </th>
                  <th className={"table-head " + tableHeadClass}>Reference</th>
                  <th className={"table-head " + tableHeadClass}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData?.map((item, index) => (
                    <tr key={item?.id || index}>
                      <td className="table-data">
                        {ImageName(item?.name)}
                        <span className={"ml-3 font-bold text-slate-600"}>
                          {item?.name || "-"}
                        </span>
                      </td>
                      <td className="table-data">{item?.address || "-"}</td>
                      <td className="table-data">
                        <div className="flex">{item?.number || "-"}</div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.insuranceCompany || "-"}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.startingDate || "-"}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.endDate || "-"}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.paymentType || "-"}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.cost || "-"}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.type || "-"}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.coverType || "-"}
                        </div>
                      </td>

                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.caseOfficer || "-"}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.reference || "-"}
                        </div>
                      </td>
                      <td className="table-data text-right">
                        <div className="flex items-center">
                          <Tooltip title="Edit Insurance details" arrow>
                            <IconButton
                              onClick={() =>
                                setOpenInsuranceForm({
                                  state: true,
                                  id: item,
                                })
                              }
                            >
                              <AiFillEdit className="text-sky-600 cursor-pointer" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Insurance details" arrow>
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
                    <td colSpan={15}>
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
          item="Insurance details"
          handleCancel={() =>
            setOpenConfirmationModal({ state: false, id: null })
          }
          handleDelete={() => deleteData()}
        />
      )}
      {openInsuranceForm && (
        <InsuranceModal {...{ openInsuranceForm, setOpenInsuranceForm }} />
      )}{" "}
      {openDiscussion && (
        <DiscussionModal
          open={openDiscussion}
          setOpen={setOpenDiscussion}
          studentList={insuranceList}
          type="insurance"
        />
      )}
    </div>
  );
};

export default Insurance;
