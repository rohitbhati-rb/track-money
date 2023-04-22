import { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField
} from "@mui/material";
import { Delete_Dialog_Button_Props, Dialog_Title_Props, emptyErrObj } from "../../constants";
import { TxnFormProps } from "../../helpers";
import DeleteDialog from "./DeleteDialog";


const AccountDialog = ({
  accError,
  setAccError,
  isEditAccount,
  newAccount,
  setNewAccount,
  addAccount,
  deleteAccount,
  open,
  handleClose
}) => {
  const [accDeleteDialogOpen, setDeleteAccDialogOpen] = useState({ open: false, id: undefined });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }))
    validateAccFormData(name, value)
  }
  const onCheckBoxChange = (e) => {
    setNewAccount((prev) => ({
      ...prev,
      isCreditCard: e.target.checked,
      openingBalance: '',
      creditLimit: '',
      creditBalance: ''
    }))
    setAccError((prev) => ({
      ...prev,
      creditLimit: emptyErrObj,
      openingBalance: emptyErrObj,
      creditBalance: emptyErrObj
    }))
  }
  const handleAddAccount = () => {
    addAccount()
    handleClose()
  }
  const OpenAccDeleteDialog = (id) => {
    setDeleteAccDialogOpen({ open: true, id: id });
  };
  const CloseAccDeleteDialog = () => {
    setDeleteAccDialogOpen({ open: false, id: undefined });
  };

  const validateAccFormData = (name, value) => {
    let fieldErrors = accError;
    switch (name) {
      case "openingBalance":
        if (value !== '' && Number(value) >= 0)
          fieldErrors.openingBalance = { err: false, msg: '' }
        else
          fieldErrors.openingBalance = { err: true, msg: "Opening Balance must be a non-negative number" }
        break;
      case "creditLimit":
        if (value !== '' && Number(value) >= 0)
          fieldErrors.creditLimit = { err: false, msg: '' }
        else
          fieldErrors.creditLimit = { err: true, msg: "Credit Limit must be a non-negative number" }
        break;
      case "creditBalance":
        if (!isNaN(Number(value)))
          fieldErrors.creditBalance = { err: false, msg: '' }
        else
          fieldErrors.creditBalance = { err: true, msg: "Amount must be a number" }
        break;
      case "name":
        if (value === "" || !value.match(/^[a-zA-Z0-9_ ]+$/))
          fieldErrors.name = { err: true, msg: "Only alphabets, numbers and underscores are allowed." }
        else
          fieldErrors.name = { err: false, msg: '' };
        break;
      default: break;
    }
    setAccError((prev) => ({ ...prev, ...fieldErrors }))
  }
  let isFormValidated = accError.name.err === false && accError.name.msg === ''
    && accError.openingBalance.msg === '' && accError.creditLimit.msg === '' && accError.creditBalance.msg === ''
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }} >
          <DialogTitle {...Dialog_Title_Props}>
            {isEditAccount ? "Edit Account" : "Add New Account"}
          </DialogTitle>
          {isEditAccount &&
            <Button
              {...Delete_Dialog_Button_Props}
              onClick={() => OpenAccDeleteDialog(newAccount.id)}>
              Delete
            </Button>}
        </div>
        <DialogContent sx={{ padding: "5 1" }}>
          <TextField
            {...TxnFormProps("name", onInputChange)}
            value={newAccount.name}
            sx={{ marginTop: 1 }}
            type="text"
            error={accError.name.err === null ? false : accError.name.err}
            helperText={accError.name.msg}
          />
          <FormControlLabel
            sx={{ marginTop: 1 }}
            control={
              <Checkbox
                disabled={isEditAccount}
                checked={newAccount.isCreditCard}
                onChange={onCheckBoxChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Credit Card"
          />
          {newAccount.isCreditCard ?
            <TextField
              {...TxnFormProps("creditLimit", onInputChange)}
              label={"Credit Limit"}
              value={newAccount.creditLimit}
              sx={{ marginTop: 1 }}
              type="tel"
              error={accError.creditLimit.err === null ? false : accError.creditLimit.err}
              helperText={accError.creditLimit.msg}
            />
            :
            <TextField
              {...TxnFormProps("openingBalance", onInputChange)}
              label="Opening Balance"
              value={newAccount.openingBalance}
              sx={{ marginTop: 1 }}
              type="tel"
              error={accError.openingBalance.err === null ? false : accError.openingBalance.err}
              helperText={accError.openingBalance.msg}
            />}
          {newAccount.isCreditCard ?
            <TextField
              {...TxnFormProps("creditBalance", onInputChange)}
              label="Credit Balance"
              value={newAccount.creditBalance}
              sx={{ marginTop: 2 }}
              type="tel"
              error={accError.creditBalance.err === null ? false : accError.creditBalance.err}
              helperText={accError.creditBalance.msg}
            />
            :
            ""
          }
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            sx={{ textTransform: "none" }}
          >
            {"Cancel"}
          </Button>
          <Button
            autoFocus
            onClick={handleAddAccount}
            sx={{ textTransform: "none" }}
            disabled={!isFormValidated}
          >
            {isEditAccount ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteDialog
        id={accDeleteDialogOpen.id}
        open={accDeleteDialogOpen.open}
        handleClose={CloseAccDeleteDialog}
        deleteData={deleteAccount}
      />
    </>
  )
}

export default AccountDialog;