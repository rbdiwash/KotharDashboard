import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { monthsForFilter } from "const/constants";
import useKothar from "context/useKothar";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import { useCallback } from "react";

const ProfitLoss = ({ color = "light" }) => {
  const [selectedType, setSelectedType] = useState("rpl");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" })
  );

  const [
    { moduleWiseProfitLossList, wholeLoading },
    { getModuleWiseProfitLoss },
  ] = useKothar();

  const yearsForFilter = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleYearChange = (selectedYear) => {
    getModuleWiseProfitLoss({ year: selectedYear, month });
    setYear(selectedYear);
  };

  const handleMonthChange = (selectedMonth) => {
    getModuleWiseProfitLoss({ year, month: selectedMonth });
    setMonth(selectedMonth);
  };

  const options = [
    { label: "RPL", value: "rpl" },
    { label: "Student", value: "student" },
    { label: "Visa", value: "visa" },
    { label: "Insurance", value: "insurance" },
    {
      label: "Skill Assessment",
      value: "skill-assessment",
    },
  ];

  const colorName = useCallback(
    (data) => (Math.sign(data) !== -1 ? "success.main" : "error.main"),
    []
  );

  const totalValue = useCallback(
    (key) =>
      moduleWiseProfitLossList?.reduce((sum, acc) => sum + acc?.[key], 0) || 0,
    [moduleWiseProfitLossList, year, month]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "clientName" || 0,
        header: "Client Name",
        size: 150,
        Footer: () => (
          <Stack> {moduleWiseProfitLossList?.length > 0 && "Total"}</Stack>
        ),
      },

      {
        accessorKey: "totalAmount", //normal accessorKey
        header: "Total Amount",
        size: 200,
        Footer: () => (
          <Stack>
            {moduleWiseProfitLossList?.length > 0 && (
              <Box color={colorName(totalValue("totalAmount"))}>
                {Math.round(totalValue("totalAmount"))}
              </Box>
            )}
          </Stack>
        ),
      },
      {
        accessorKey: "paidAmount",
        header: "Paid Amount",
        size: 150,
        Footer: () => (
          <Stack>
            {moduleWiseProfitLossList?.length > 0 && (
              <Box color={colorName(totalValue("paidAmount"))}>
                {Math.round(totalValue("paidAmount"))}
              </Box>
            )}
          </Stack>
        ),
      },
      {
        accessorKey: "costAmount",
        header: "Cost Amount",
        size: 150,
        Footer: () => (
          <Stack>
            {moduleWiseProfitLossList?.length > 0 && (
              <Box color={colorName(totalValue("costAmount"))}>
                {Math.round(totalValue("costAmount"))}
              </Box>
            )}
          </Stack>
        ),
      },
      {
        accessorKey: "profitLossAmount",
        header: "Profit/Loss Amount",
        size: 150,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <div
              style={{
                color:
                  Number(row?.original?.profitLossAmount) > 0 ? "green" : "red",
              }}
            >
              {row?.original?.profitLossAmount}
            </div>
          );
        },
        Footer: () => (
          <Stack>
            {moduleWiseProfitLossList?.length > 0 && (
              <Box color={colorName(totalValue("profitLossAmount"))}>
                {Math.round(totalValue("profitLossAmount"))}
              </Box>
            )}
          </Stack>
        ),
      },
    ],
    [moduleWiseProfitLossList]
  );

  const table = useMaterialReactTable({
    columns,
    data: moduleWiseProfitLossList,
    enableRowNumbers: true,
    enableStickyHeader: true,
    muiTableContainerProps: {
      sx: { height: "max-content", maxHeight: "800px" },
    },
    enableColumnPinning: true,
    enableRowPinning: true,
    enablePagination: false,
    enableStickyFooter: true,

    muiTableBodyRowProps: ({ row }) => {
      return {
        sx: {
          backgroundColor:
            row.original.clientName === "Total" ? "#eee" : "inherit",
        },
      };
    },
    muiTableBodyCellProps: ({ row }) => ({
      sx: {
        fontWeight: row.original.clientName === "Total" && "bold",
        fontSize: row.original.clientName === "Total" && 16,
      },
    }),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Select Type
          </InputLabel>
          <Select
            size="small"
            label="Select Type"
            labelId="month-filter-label"
            id="month-filter"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              getModuleWiseProfitLoss({ year, month, module: e.target.value });
            }}
          >
            {options?.map((arg) => (
              <MenuItem value={arg?.value} key={arg?.value}>
                {arg?.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Select Year
          </InputLabel>
          <Select
            labelId="year-filter-label"
            id="year-filter"
            value={year}
            onChange={(e) => handleYearChange(e.target.value)}
            label="Select Year"
          >
            {yearsForFilter?.map((value, i) => (
              <MenuItem value={value} key={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Select Month
          </InputLabel>
          <Select
            labelId="month-filter-label"
            id="month-filter"
            value={month}
            onChange={(e) => handleMonthChange(e.target.value)}
            label="Select Month"
          >
            {monthsForFilter?.map(({ label, value }, i) => (
              <MenuItem value={value} key={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>{" "}
      </Box>
    ),
  });
  const [openDiscussion, setOpenDiscussion] = useState(false);
  const handleDiscussion = () => {
    setOpenDiscussion(!openDiscussion);
  };
  return (
    <div className="flex flex-wrap mt-4 dashBody">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded" +
            (color === "light" ? "bg-white" : "bg-sky-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0 text-center text-xl font-bold">
            Profit/Loss Data
          </div>
          {wholeLoading ? (
            <div className="flex items-center justify-center w-full h-[80vh]">
              <CircularProgress color="inherit" />
            </div>
          ) : (
            <div className="block w-full overflow-x-auto">
              <MaterialReactTable table={table} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;
