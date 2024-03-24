import { Button, IconButton, Tooltip } from "@mui/material";
import DeleteModal from "components/Modals/DeleteModal";
import DiscussionModal from "components/Modals/DiscussionModal";
import SearchField from "components/SearchField";
import { delete_data } from "const/axios";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { FaPlusCircle, FaRocketchat } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Students = ({ color = "light" }) => {
  const tableHeadClass = color === "light" ? "light-bg" : "dark-bg";
  const [{ studentList, token }, { refetchStudent }] = useKothar();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [openDiscussion, setOpenDiscussion] = useState(false);
  const handleDiscussion = () => {
    setOpenDiscussion(!openDiscussion);
  };
  const [filteredData, setFilteredData] = useState(studentList);

  useEffect(() => {
    if (searchText.length > 0) {
      const filtered = studentList?.filter(
        (client) =>
          client?.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
          client?.email?.toLowerCase().includes(searchText?.toLowerCase()) ||
          client?.caseOfficer
            ?.toLowerCase()
            .includes(searchText?.toLowerCase()) ||
          client?.status?.toLowerCase().includes(searchText?.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(studentList);
    }
  }, [searchText, studentList]);

  const deleteData = () => {
    delete_data(
      `${API_URL}/student/${openConfirmationModal?.id}`,
      () => {
        setOpenConfirmationModal({ state: false, id: null });
        refetchStudent();
      },
      token
    );
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
                Students
              </h3>
              <SearchField
                {...{ type: "Student", searchText, setSearchText }}
              />
              <div className="flex items-center gap-4">
                <FaRocketchat
                  className="text-blue-500 text-3xl cursor-pointer"
                  onClick={handleDiscussion}
                />{" "}
                <Button
                  variant="contained"
                  startIcon={<FaPlusCircle />}
                  component={Link}
                  to="/admin/student/add"
                >
                  Add Student
                </Button>{" "}
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className={"table-head " + tableHeadClass}>Name</th>
                  <th className={"table-head " + tableHeadClass}>Email</th>
                  <th className={"table-head " + tableHeadClass}>Course</th>
                  <th className={"table-head " + tableHeadClass}>University</th>
                  <th className={"table-head " + tableHeadClass}>Intake</th>
                  <th className={"table-head " + tableHeadClass}>
                    Case Officer
                  </th>
                  <th className={"table-head " + tableHeadClass}>Reference</th>
                  <th className={"table-head " + tableHeadClass}>Status</th>
                  <th className={"table-head " + tableHeadClass}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData?.map((item, index) => (
                    <tr key={item?.id || index}>
                      <th className="table-data text-left">
                        {item?.name || "-"}
                      </th>
                      <td className="table-data"> {item?.email || "-"}</td>
                      <td className="table-data"> {item?.course || "-"}</td>
                      <td className="table-data">{item?.university || "-"}</td>
                      <td className="table-data">
                        <div className="flex items-center gap-2">
                          {item?.intake || "-"}
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
                      <td className="table-data">
                        <div className="flex items-center">
                          {item?.status || "-"}
                        </div>
                      </td>
                      <td className="table-data text-right">
                        <div className="flex items-center">
                          <Tooltip title="View Student Details" arrow>
                            <Link to="/admin/student/view">
                              <IconButton>
                                <AiFillEye className="text-sky-600 cursor-pointer" />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip title="Edit Student Details" arrow>
                            <IconButton
                              onClick={() => navigate("/admin/student/add")}
                            >
                              <AiFillEdit className="text-sky-600 cursor-pointer" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Student Info" arrow>
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
      </div>{" "}
      {openDiscussion && (
        <DiscussionModal
          open={openDiscussion}
          setOpen={setOpenDiscussion}
          studentList={studentList}
          type="student"
        />
      )}
      {openConfirmationModal.state && (
        <DeleteModal
          open={openConfirmationModal.state}
          item="Student Information"
          handleCancel={() =>
            setOpenConfirmationModal({ state: false, id: null })
          }
          handleDelete={() => deleteData()}
        />
      )}
    </div>
  );
};

export default Students;
