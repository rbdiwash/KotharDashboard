import { Button, IconButton, Tooltip } from "@mui/material";
import DeleteModal from "components/Modals/DeleteModal";
import { delete_data } from "const/axios";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const University = ({ color = "light" }) => {
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <Tooltip title={renderedCellValue}>
            <div className="flex items-center">
              <div className=" mr-2">{renderedCellValue}</div>
            </div>
          </Tooltip>
        ),
      },
      {
        accessorKey: "email", //access nested data with dot notation
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "abn", //access nested data with dot notation
        header: "ABN",
        size: 150,
      },
      {
        accessorKey: "contactPerson", //access nested data with dot notation
        header: "Contact Person",
        size: 150,
      },
      {
        accessorKey: "country", //access nested data with dot notation
        header: "Country",
        size: 150,
      },
      {
        accessorKey: "state", //access nested data with dot notation
        header: "State",
        size: 150,
      },
      {
        accessorKey: "zipCode", //access nested data with dot notation
        header: "Zip Code",
        size: 150,
      },
      {
        accessorKey: "actions", //access nested data with dot notation
        header: "Actions",
        size: 150,
        Cell: ({ row, renderedCellValue }) => {
          const item = row.original;
          return (
            <div className="flex items-center">
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
                      id: row?.original?.id,
                    })
                  }
                >
                  <AiFillDelete className="text-red-600 cursor-pointer" />
                </IconButton>
              </Tooltip>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: uniData || [],
    rowNumberDisplayMode: "original",
    enableRowNumbers: true,
  });

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
  }, [searchText, uniData]);

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
              {/* <SearchField
                {...{ type: "University", searchText, setSearchText }}
              /> */}
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
            <MaterialReactTable table={table} />
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
