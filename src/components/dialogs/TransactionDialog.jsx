import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

const TransactionDialog = ({ open, handleClose, newTxn, setNewTxn, addNewTxn }) => {
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNewTxn((prev) => ({ ...prev, [name]: value }))
    // if(!isEditAccount)
    //   setNewAccount((prev) => ({ ...prev, id: uuidv4(), createdAt: Date() }))
  }
  const handleAddTxn = () => {
    addNewTxn()
    handleClose()
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Add Transaction
      </DialogTitle>
      <DialogContent sx={{ padding: "5 1" }}>
        <DialogContentText>
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TransactionDialog