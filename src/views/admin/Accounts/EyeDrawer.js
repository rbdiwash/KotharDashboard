import { AddCircle } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import ClientDropdown from "components/Dropdowns/ClientDropdown";
import InputField from "components/Input/InputField";
import {
  API_URL,
  insurance_companies,
  insurance_cover_type,
} from "const/constants";
import useKothar from "context/useKothar";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function EyeModal({ open, setOpen, studentDetails }) {
  const handleClose = () => {
    setOpen({ state: false, id: null });
  };
  const [childName, setChildName] = useState([]);
  const [{}, { refetchInsuranceList }] = useKothar();
  const initalState = {
    caseOfficer: "",
    cost: 0,
    date: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    clientId: null,
    insuranceCompany: null,
    paymentType: "",
    startingDate: new Date().toISOString().split("T")[0],
    type: "",
    children: 0,
    child: childName,
    coverType: null,
  };
  const [bonusEntries, setBonusEntries] = useState([{ index: 1, bonus: 0 }]);
  console.log("🚀  bonusEntries:", bonusEntries);
  const [data, setData] = React.useState(initalState);
  useEffect(() => {
    if (open?.id) {
      setData(open?.id);
      setChildName(open?.id?.child);
    } else {
      setData(initalState);
    }
  }, [open]);

  const { mutate } = useMutation(postData, {
    onSuccess(suc) {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      setOpen({ state: false, id: null });
      refetchInsuranceList();
    },
    onError(err) {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });
  async function postData(payload) {
    if (data?.id) {
      await axios.put(`${API_URL}/insurance/${payload?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/insurance`, payload);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      ...data,
      firstName: data?.name,
      child: childName,
      cost: Number(data?.cost),
    });
  };

  const addMoreBonuses = () => {
    setBonusEntries([
      ...bonusEntries,
      { index: bonusEntries?.length + 1, bonus: 0 },
    ]);
  };

  const handleDeleteBonusEntries = (index) => {
    setBonusEntries([...bonusEntries.filter((b, i) => i !== index)]);
  };

  return (
    <div>
      <BootstrapDialog onClose={handleClose} open={open?.state} maxWidth="xl">
        <form action="" onSubmit={handleSubmit}>
          <BootstrapDialogTitle onClose={handleClose}>
            Admission More Information
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-3 justify-end items-end min-w-[700px] px-4">
              <div className="relative w-full mb-3 flex gap-3 items-center justify-start">
                Commission:
                <InputField
                  placeholder="Commission"
                  name="commission"
                  required
                  type="text"
                  value={data?.commission}
                  className={"w-[190px]"}
                />
              </div>

              {bonusEntries?.length > 1 &&
                bonusEntries?.map((item, index) => (
                  <div className="relative w-full mb-3 flex gap-3 items-center justify-start">
                    {index === 0 ? "Bonus:" : <div className="w-[50px]"></div>}
                    <span>
                      <InputField
                        placeholder="Number"
                        name="bonus"
                        required
                        type="text"
                        value={data?.bonus}
                        className={"w-[100px]"}
                      />
                    </span>
                    <InputField
                      placeholder="Bonus"
                      name="bonus"
                      required
                      type="number"
                      value={data?.bonus}
                      className={"w-[190px]"}
                    />
                    <DeleteIcon
                      onClick={() => handleDeleteBonusEntries(index)}
                    />
                  </div>
                ))}
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
