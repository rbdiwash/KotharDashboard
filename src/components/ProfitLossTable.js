import React from "react";
import { Autocomplete, TextField } from "@mui/material";

import axios from "axios";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfitLossTable = () => {
  const [{ accountsList }, {}] = useKothar();

  const columns = useMemo(
    () => [
      {
        accessorKey: "date", //normal accessorKey
        header: "Date",
        size: 100,
      },

      {
        accessorKey: "clientName" || 0,
        header: "Category",
        size: 150,
      },

      {
        accessorKey: "totalAmount", //normal accessorKey
        header: "Total Amount",
        size: 200,
      },
      {
        accessorKey: "paidAmount",
        header: "Paid Amount",
        size: 150,
      },
      {
        accessorKey: "costAmount",
        header: "Cost Amount",
        size: 150,
      },
      {
        accessorKey: "profileAmount",
        header: "Profit/Loss Amount",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: accountsList,
    enableStickyHeader: true,
    muiTableContainerProps: { sx: { maxHeight: "300px" } },
    // enableDensityToggle: true,
    initialState: { density: "compact", enableGlobalFilter: true },
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
  });

  return (
    <div className="block w-full overflow-x-auto bg-white shadow rounded">
      <p className="p-4 px-4 font-semibold">Profit/Loss Table</p>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default ProfitLossTable;
