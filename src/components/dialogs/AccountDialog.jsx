import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material"


const AccountDialog = ({ newAccount, setNewAccount, addAccount, open, handleClose }) => {
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }))
    setNewAccount((prev) => ({ ...prev, id: 457, createdAt: Date() }))
  }
  const handleAddAccount = () => {
    addAccount()
    handleClose()
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Add New Account"}
      </DialogTitle>
      <DialogContent sx={{ padding: "5 1" }}>
        <TextField
          id="outlined-error-helper-text"
          label="Account Name"
          name="name"
          value={newAccount.name}
          onChange={onInputChange}
          error={false}
          fullWidth
          sx={{ marginTop: 2 }}
          helperText=""
        />
        <TextField
          id="outlined-error-helper-text"
          label="Balance"
          name="balance"
          value={newAccount.balance}
          onChange={onInputChange}
          error={false}
          fullWidth
          sx={{ marginTop: 2 }}
          helperText=""
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleAddAccount} autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AccountDialog