import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import { TxnFormProps } from "../../helpers";


const AccountDialog = ({ accError, setAccError, isEditAccount, newAccount, setNewAccount, addAccount, open, handleClose }) => {
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }))
    if (!isEditAccount)
      setNewAccount((prev) => ({ ...prev, id: uuidv4(), createdAt: Date() }))
    validateAccFormData(name, value)
  }
  const handleAddAccount = () => {
    addAccount()
    handleClose()
  }
  const validateAccFormData = (name, value) => {
    let fieldErrors = accError;
    switch (name) {
      case "openingBalance":
        if (Number(value) > 0)
          fieldErrors.openingBalance = { err: false, msg: '' }
        else
          fieldErrors.openingBalance = { err: true, msg: "Amount must be non-zero number" }
        break;
      case "name":
        if (value === "" || !value.match(/^[a-zA-Z0-9_ ]+$/))
          fieldErrors.name = { err: true, msg: "Account Name is invalid" }
        else
          fieldErrors.name = { err: false, msg: '' };
        break;
      default: break;
    }
    setAccError((prev) => ({ ...prev, ...fieldErrors }))
  }
  let isFormValidated = accError.name.err !== null &&
    accError.openingBalance.err !== null &&
    !accError.name.err &&
    !accError.openingBalance.err
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {isEditAccount ? "Edit Account" : "Add New Account"}
      </DialogTitle>
      <DialogContent sx={{ padding: "5 1" }}>
        <TextField
          {...TxnFormProps("name", onInputChange)}
          value={newAccount.name}
          sx={{ marginTop: 2 }}
          type="text"
          error={accError.name.err === null ? false : accError.name.err}
          helperText={accError.name.msg}
        />
        <TextField
          {...TxnFormProps("openingBalance", onInputChange)}
          label="Opening Balance"
          value={newAccount.openingBalance}
          sx={{ marginTop: 2 }}
          type="tel"
          error={accError.openingBalance.err === null ? false : accError.openingBalance.err}
          helperText={accError.openingBalance.msg}
        />
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
  )
}

export default AccountDialog;