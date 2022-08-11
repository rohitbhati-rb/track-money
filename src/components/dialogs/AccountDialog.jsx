import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"


const AccountDialog = ({ open, handleClose }) => {
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
          error={false}
          fullWidth
          sx={{ marginTop: 2 }}
          helperText=""
        />
        <TextField
          id="outlined-error-helper-text"
          label="Balance"
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
        <Button onClick={handleClose} autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AccountDialog