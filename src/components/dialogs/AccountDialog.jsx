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
import { emptyErrObj } from "../../constants";
import { TxnFormProps } from "../../helpers";


const AccountDialog = ({ accError, setAccError, isEditAccount, newAccount, setNewAccount, addAccount, open, handleClose }) => {
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
          fieldErrors.name = { err: true, msg: "Account Name is invalid" }
        else
          fieldErrors.name = { err: false, msg: '' };
        break;
      default: break;
    }
    setAccError((prev) => ({ ...prev, ...fieldErrors }))
  }
  let isFormValidated = accError.name.err !== null &&
    (accError.openingBalance.err !== null || (accError.creditLimit.err !== null && accError.creditBalance.err !== null)) &&
    !accError.name.err &&
    (!accError.openingBalance.err || (!accError.creditLimit.err !== null && !accError.creditBalance.err !== null))
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
  )
}

export default AccountDialog;