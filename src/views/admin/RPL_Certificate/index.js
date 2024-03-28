import {
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteModal from "components/Modals/DeleteModal";
import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { FaPlusCircle, FaRocketchat } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "const/constants";
import axios from "axios";
import { toast } from "react-toastify";
import useKothar from "context/useKothar";
import { ImageName } from "components/helper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SearchField from "components/SearchField";
import DiscussionModal from "components/Modals/DiscussionModal";
import { useEffect } from "react";
import { delete_data } from "const/axios";

const RPLCertificate = ({ color = "light" }) => {
  const tableHeadClass = color === "light" ? "light-bg" : "dark-bg";
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [{ rplList }, { setRPLList }] = useKothar();
  const [filteredData, setFilteredData] = useState(rplList);

  const [value, setValue] = useState(0);
  const [openDiscussion, setOpenDiscussion] = useState(false);
  const handleDiscussion = () => {
    setOpenDiscussion(!openDiscussion);
  };

  const getRPLList = (params) => {
    let url =
      typeof params === "string"
        ? `${API_URL}/rpl/?${params}`
        : `${API_URL}/rpl`;
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setRPLList(res?.data?.data);
        setLoading(false);
      });
  };
  const deleteData = () => {
    delete_data(`${API_URL}/rpl/${openConfirmationModal?.id}`, () => {
      setOpenConfirmationModal({ state: false, id: null });
      getRPLList();
    });
  };
  useEffect(() => {
    if (searchText.length > 0) {
      const filtered = rplList?.filter(
        (client) =>
          client?.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
          client?.email?.toLowerCase().includes(searchText?.toLowerCase()) ||
          client?.caseOfficer
            ?.toLowerCase()
            .includes(searchText?.toLowerCase()) ||
          client?.status?.toLowerCase().includes(searchText?.toLowerCase()) ||
          client?.reference?.toLowerCase().includes(searchText?.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(rplList);
    }
  }, [searchText, rplList]);

  const handleChange = (event, newValue, val) => {
    setValue(newValue);
    const status = event.target.innerText.toLowerCase().split(" ").join("_");
    setLoading(true);
    getRPLList(`status=${status}`);
  };

  const tabs = [
    "All",
    "Incomplete Application",
    "Application Ready",
    "Placement Waiting",
    "Placement Processing",
    "Ready to Apply",
    "Certificate Processing",
    "Certificate Ready",
    "Payment Completed",
    "Softcopy sent",
    "Hardcopy sent",
  ];

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap mt-4 dashBody">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
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
                RPL Certificates
              </h3>
              <SearchField
                {...{ type: "RPL Certificate", searchText, setSearchText }}
              />
              <div className="flex items-center gap-4">
                <FaRocketchat
                  className="text-blue-500 text-3xl cursor-pointer"
                  onClick={handleDiscussion}
                />
                <Button
                  variant="contained"
                  startIcon={<FaPlusCircle />}
                  component={Link}
                  to="/admin/rpl-certificate/add"
                >
                  Add Client Details
                </Button>
              </div>
            </div>
          </div>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            {tabs?.map((arg) => (
              <Tab
                label={arg}
                key={arg}
                sx={{ fontWeight: "bold", fontSize: 16 }}
              />
            ))}
          </Tabs>
          <TabPanel value={value} index={value}>
            <TabContent
              {...{
                tableHeadClass,
                navigate,
                filteredData,
                setOpenConfirmationModal,
                color,
                loading,
              }}
            />
          </TabPanel>
        </div>
      </div>
      {openConfirmationModal.state && (
        <DeleteModal
          open={openConfirmationModal.state}
          item="RPL Details"
          handleCancel={() =>
            setOpenConfirmationModal({ state: false, id: null })
          }
          handleDelete={() => deleteData()}
        />
      )}
      {openDiscussion && (
        <DiscussionModal
          open={openDiscussion}
          setOpen={setOpenDiscussion}
          studentList={rplList}
          type="rpl"
        />
      )}
    </div>
  );
};

export default RPLCertificate;

const TabContent = ({
  tableHeadClass,
  navigate,
  filteredData,
  setOpenConfirmationModal,
  loading,
}) => {
  return (
    <div className="block w-full overflow-x-auto mt-0">
      <table className="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th className={"table-head " + tableHeadClass}>Name</th>
            <th className={"table-head " + tableHeadClass}>Email</th>
            <th className={"table-head " + tableHeadClass}>USI Number</th>
            <th className={"table-head " + tableHeadClass}>Visa Status</th>

            <th className={"table-head " + tableHeadClass}>
              Certification Type
            </th>
            <th className={"table-head " + tableHeadClass}>Case Officer</th>
            <th className={"table-head " + tableHeadClass}>Reeference</th>

            <th className={"table-head " + tableHeadClass}>Status </th>

            <th className={"table-head " + tableHeadClass}>Action </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={12}>
                <div className="w-full h-[50vh] flex items-center justify-center text-center">
                  <CircularProgress />
                </div>
              </td>
            </tr>
          ) : (
            <>
              {filteredData?.length > 0 ? (
                filteredData?.map((item, index) => (
                  <tr key={item?.id || index}>
                    <td className="table-data text-left flex items-center">
                      {ImageName(item?.name)}
                      <span className={"ml-3 font-bold text-slate-600"}>
                        {item?.name || "-"}
                      </span>
                    </td>
                    <td className="table-data">{item?.email || "-"}</td>
                    <td className="table-data">
                      <div className="flex">{item?.usiNumber || "-"}</div>
                    </td>
                    <td className="table-data">
                      <div className="flex items-center gap-2">
                        {item?.visaStatus || "-"}
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
                        {item?.certificate || "-"}
                      </div>
                    </td>
                    <td className="table-data">
                      <div className="flex items-center">
                        {item?.status || "-"}
                      </div>
                    </td>

                    <td className="table-data text-right">
                      <div className="flex items-center">
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
                ))
              ) : (
                <tr key={1}>
                  <td colSpan={14}>
                    <div className="text-lg text-center my-10">
                      No Results Found
                    </div>
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};
