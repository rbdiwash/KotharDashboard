import { Button, IconButton, Tabs, Tooltip, Typography } from "@mui/material";
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
import VisaModel from "./VisaModel";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SearchField from "components/SearchField";
import { useEffect } from "react";
import DiscussionModal from "components/Modals/DiscussionModal";
const tabs = [
  "TR Visa",
  "Student Visa",
  "Dependent Visa",
  "Visitor/Tourist Visa",
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

const Visa = ({ color = "light" }) => {
  const tableHeadClass = color === "light" ? "light-bg" : "dark-bg";
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [openVisaForm, setOpenVisaForm] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [{ visaList }, { refetchVisaList }] = useKothar();
  const [value, setValue] = useState(0);
  const [filteredData, setFilteredData] = useState(visaList);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteData = () => {
    axios
      .delete(
        `${API_URL}/visa-applications/${openConfirmationModal?.id}`
      )
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message || "Data Deleted Successfully");
        setOpenConfirmationModal({ state: false, id: null });
        refetchVisaList();
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
      const filtered = visaList?.filter(
        (client) =>
          client?.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
          client?.address
            ?.toLowerCase()
            .includes(searchText?.toLowerCase()) ||
          client?.status?.toLowerCase().includes(searchText?.toLowerCase()) ||
          client?.coverType
            ?.toLowerCase()
            .includes(searchText?.toLowerCase()) ||
          client?.caseOfficer?.toLowerCase().includes(searchText?.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(visaList);
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
                Visa Details
              </h3>
              <SearchField {...{ type: "Visa", searchText, setSearchText }} />
              <div className="flex items-center gap-4">
                <FaRocketchat
                  className="text-blue-500 text-3xl cursor-pointer"
                  onClick={handleDiscussion}
                />
                <Button
                  variant="contained"
                  startIcon={<FaPlusCircle />}
                  component={Link}
                  to="/admin/visa/add"
                >
                  Add Visa Details
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
            aria-label="visible arrows tabs example"
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
                visaList,
                setOpenConfirmationModal,
              }}
            />
          </TabPanel>
        </div>
      </div>
      {openConfirmationModal.state && (
        <DeleteModal
          open={openConfirmationModal.state}
          item="Course"
          handleCancel={() =>
            setOpenConfirmationModal({ state: false, id: null })
          }
          handleDelete={() => deleteData()}
        />
      )}{" "}
      {openDiscussion && (
        <DiscussionModal open={openDiscussion} setOpen={setOpenDiscussion} />
      )}
      {openVisaForm && <VisaModel {...{ openVisaForm, setOpenVisaForm }} />}
    </div>
  );
};

export default Visa;

const TabContent = ({
  tableHeadClass,
  navigate,
  visaList,
  setOpenConfirmationModal,
}) => {
  return (
    <div className="block w-full overflow-x-auto">
      <table className="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th className={"table-head " + tableHeadClass}>Full Name</th>
            <th className={"table-head " + tableHeadClass}>Address</th>
            <th className={"table-head " + tableHeadClass}>Phone Number</th>

            <th className={"table-head " + tableHeadClass}>Payment Type</th>
            <th className={"table-head " + tableHeadClass}>Cost</th>
            <th className={"table-head " + tableHeadClass}>Status</th>

            <th className={"table-head " + tableHeadClass}>Action</th>
          </tr>
        </thead>
        <tbody>
          {visaList?.length > 0 ? (
            visaList?.map((item, index) => (
              <tr key={item?.id || index}>
                <td className="table-data">
                  {ImageName(item?.name)}
                  <span className={"ml-3 font-bold text-slate-600"}>
                    {item?.name || "-"}
                  </span>
                </td>
                <td className="table-data">{item?.level || "-"}</td>
                <td className="table-data">
                  <div className="flex">{item?.duration || "-"} year</div>
                </td>
                <td className="table-data">
                  <div className="flex items-center">
                    {item?.university || "-"}
                  </div>
                </td>
                <td className="table-data">
                  <div className="flex items-center">{item?.intake || "-"}</div>
                </td>
                <td className="table-data">
                  <div className="flex items-center">{item?.fee || "-"}</div>
                </td>
                <td className="table-data text-right">
                  <div className="flex items-center">
                    {/* <Tooltip title="View" arrow>
                            <IconButton>
                              <AiFillEye className="text-sky-600 cursor-pointer" />
                            </IconButton>
                          </Tooltip> */}
                    <Tooltip title="Edit Course" arrow>
                      <IconButton
                        onClick={() =>
                          navigate("/admin/course/add", {
                            state: { item },
                          })
                        }
                      >
                        <AiFillEdit className="text-sky-600 cursor-pointer" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Course" arrow>
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
  );
};
