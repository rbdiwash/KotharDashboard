import { AddCircle } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import InputField from "components/Input/InputField";

export default function ProviderDialog({
  color = "light",
  open,
  setOpen,
  bonusEntries,
  setBonusEntries,
  setAccountEntries,
  accountEntries,
}) {
  const tableHeadClass = color === "light" ? "light-bg" : "dark-bg";
  const handleClose = () => {
    setOpen({ state: false, uuid: "", index: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundRow = accountEntries.find((item, i) => item?.id === open?.id);
    setAccountEntries((prevState) => [
      ...prevState?.slice(0, open?.index),
      { ...foundRow, commissionDetails: bonusEntries },
      ...prevState?.slice(open?.index + 1, accountEntries.length),
    ]);

    setOpen({ state: false, uuid: null, index: null });
  };

  const addMoreBonuses = () => {
    setBonusEntries([
      ...bonusEntries,
      { index: bonusEntries?.length + 1, bonus: "" },
    ]);
  };

  const handleDeleteBonusEntries = (index) => {
    setBonusEntries([...bonusEntries.filter((b, i) => i !== index)]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const row = bonusEntries.find((item, i) => i === index);
    setBonusEntries((prevState) => [
      ...prevState?.slice(0, index),
      { ...row, [name]: value },
      ...prevState?.slice(index + 1, bonusEntries.length),
    ]);
  };

  return (
    <div>
      <BootstrapDialog onClose={handleClose} open={open?.state} maxWidth="md">
        <form action="" onSubmit={handleSubmit}>
          <BootstrapDialogTitle onClose={handleClose}>
            Commission Information
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-3 justify-end items-end min-w-[700px] px-4">
              <>
                <div className="block w-full overflow-x-auto max-h-[400px]">
                  <table className="items-center w-full bg-transparent border-collapse ">
                    <thead className="sticky top-0">
                      <tr>
                        <th className={"table-head " + tableHeadClass}>Term</th>
                        <th className={"table-head " + tableHeadClass}>
                          Commission
                        </th>
                        <th className={"table-head " + tableHeadClass}>
                          Bonus
                        </th>
                        <th className={"table-head " + tableHeadClass}>
                          Total
                        </th>
                        <th className={"table-head " + tableHeadClass}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bonusEntries?.length > 0 ? (
                        bonusEntries?.map((item, index) => (
                          <tr>
                            <td className="table-data p-2 text-center">
                              {index + 1}.
                            </td>
                            <td className="table-data p-2">
                              <InputField
                                placeholder="Commission"
                                name="commission"
                                required
                                type="number"
                                value={item?.commission}
                                className={"w-[100px]"}
                                onChange={(e) => handleInputChange(e, index)}
                                startIcon={"$"}
                              />
                            </td>
                            <td className="table-data p-2">
                              <InputField
                                placeholder="Bonus"
                                name="bonus"
                                required
                                type="number"
                                value={item?.bonus}
                                className={"w-[100px]"}
                                onChange={(e) => handleInputChange(e, index)}
                                startIcon={"$"}
                              />
                            </td>
                            <td className="table-data p-2">
                              <InputField
                                placeholder="Total"
                                name="bonus"
                                required
                                type="number"
                                disabled
                                value={
                                  Number(item?.commission) * Number(item.bonus)
                                }
                                className={"w-[130px]"}
                                startIcon={"$"}
                              />
                            </td>
                            <td className="table-data p-2 text-center">
                              <DeleteIcon
                                onClick={() => handleDeleteBonusEntries(index)}
                                className="text-red-500 cursor-pointer"
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr key={1}>
                          <td colSpan={6}>
                            <div className="text-lg text-center my-10">
                              No Entries Available. Click on Add Entries to Add
                              Entries
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>

              <div className="relative">
                <Button
                  variant="contained"
                  startIcon={<AddCircle />}
                  onClick={addMoreBonuses}
                >
                  Add More Bonuses
                </Button>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" autoFocus onClick={handleSubmit}>
              {open?.id ? "Submit" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
