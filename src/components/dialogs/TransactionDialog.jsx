import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Tab, Tabs, Box
} from '@mui/material';

import TxnForm from '../forms/TxnForm';
import {
  ADD_TRANSACTION,
  Delete_Dialog_Button_Props,
  Dialog_Title_Props,
  EDIT_TRANSACTION,
  TxnTabs,
  emptyTxn,
  txnErrorState as emptyTxnError
} from '../../constants';
import { TxnTabProps } from '../../helpers';
import DeleteDialog from './DeleteDialog';

const TransactionDialog = ({
  open,
  handleClose,
  isEditTxn,
  newTxn,
  setNewTxn,
  addTxn,
  deleteTxn,
  txnError,
  setTxnError
}) => {
  const [txnTabValue, setTxnTabValue] = useState(isEditTxn ? Number(newTxn.type) - 1 : 0);
  const [formValid, setFormValid] = useState(false);
  const [accDeleteDialogOpen, setDeleteAccDialogOpen] = useState({ open: false, id: undefined });
  const txnTabValueChange = (e, val) => {
    setTxnTabValue(val);
    setNewTxn(({ ...emptyTxn, type: val + 1 }))
    setTxnError(emptyTxnError)
  };
  const handleAddTxn = (e) => {
    e.preventDefault();
    validateTxnForm()
    if (formValid) {
      addTxn()
      setTxnTabValue(0)
      handleClose()
    }
  };
  const handleCloseTxn = (e) => {
    setTxnTabValue(0)
    handleClose()
  };
  const OpenAccDeleteDialog = (id) => {
    setDeleteAccDialogOpen({ open: true, id: id });
  };

  const CloseAccDeleteDialog = () => {
    setDeleteAccDialogOpen({ open: false, id: undefined });
  };
  const validateTxnForm = () => {
    let isFormValid = false
    switch (newTxn.type) {
      case 1:
        isFormValid = newTxn.amount && newTxn.account && (newTxn.tags.length !== 0 || newTxn.payee)
        isFormValid = isFormValid && !txnError.amount && !txnError.account && !txnError.tags && !txnError.payee
        break
      case 2:
        isFormValid = newTxn.amount && newTxn.fromAcc && newTxn.toAcc
        isFormValid = isFormValid && !txnError.amount && !txnError.fromAcc && !txnError.toAcc
        break
      case 3:
        isFormValid = newTxn.amount && newTxn.account && (newTxn.tags.length !== 0 || newTxn.payer)
        isFormValid = isFormValid && !txnError.amount && !txnError.account && !txnError.tags && !txnError.payer
        break
      default: break
    }
    setFormValid(isFormValid)
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }} >
          <DialogTitle {...Dialog_Title_Props}>
            {isEditTxn ? EDIT_TRANSACTION : ADD_TRANSACTION}
          </DialogTitle>
          {isEditTxn &&
            <Button
              {...Delete_Dialog_Button_Props}
              onClick={() => OpenAccDeleteDialog(newTxn.id)}>
              Delete
            </Button>}
        </div>
        <form noValidate autoComplete="off">
          <DialogContent sx={{ paddingY: 0, width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={txnTabValue}
                onChange={txnTabValueChange}
                aria-label="basic tabs example"
              >
                <Tab disabled={isEditTxn} label={TxnTabs[0]} {...TxnTabProps(0)} />
                <Tab disabled={isEditTxn} label={TxnTabs[1]} {...TxnTabProps(1)} />
                <Tab disabled={isEditTxn} label={TxnTabs[2]} {...TxnTabProps(2)} />
              </Tabs>
            </Box>
            <TxnForm
              newTxn={newTxn}
              setNewTxn={setNewTxn}
              txnError={txnError}
              setTxnError={setTxnError}
              setFormValid={setFormValid}
            />
            <DialogActions>
              <Button
                onClick={handleCloseTxn}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddTxn}
                type="submit"
              >
                {isEditTxn ? "Edit" : "Add"}
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
      <DeleteDialog
        id={accDeleteDialogOpen.id}
        open={accDeleteDialogOpen.open}
        handleClose={CloseAccDeleteDialog}
        deleteData={deleteTxn}
        isTxn={true}
      />
    </>
  );
}

export default TransactionDialog