import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material"

const DeleteDialog = ({ open, handleClose, deleteData, id, isTxn = false }) => {
  const handleDelete = () => {
    deleteData(id)
    handleClose()
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {isTxn ? "Delete Transaction" : "Delete Account"}
      </DialogTitle>
      <DialogContent sx={{ padding: "5 1" }}>
        {"Are you sure you want to delete this "}
        {isTxn ? "transaction ?" : "account ?"}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog