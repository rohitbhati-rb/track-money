import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Tab, Tabs, Box
} from '@mui/material';

import TxnForm from './TxnForm';
import {
  ADD_TRANSACTION,
  TxnTabs,
  emptyTxn,
  txnErrorState as emptyTxnError
} from '../../constants';
import { TxnTabProps } from '../../helpers';

const TransactionDialog = ({ open, handleClose, newTxn, setNewTxn, addNewTxn, txnError, setTxnError }) => {
  const [txnTabValue, setTxnTabValue] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const txnTabValueChange = (e, val) => {
    setTxnTabValue(val);
    setNewTxn(({ ...emptyTxn, type: val + 1 }))
    setTxnError(emptyTxnError)
  };
  const handleAddTxn = (e) => {
    e.preventDefault();
    validateTxnForm()
    if (formValid) {
      addNewTxn()
      setTxnTabValue(0)
      handleClose()
    }
  };
  const handleCloseTxn = (e) => {
    setTxnTabValue(0)
    handleClose()
  };
  const validateTxnForm = () => {
    let isFormValid = false
    switch (newTxn.type) {
      case 1:
        isFormValid = newTxn.amount && newTxn.account && (newTxn.tags !== [] || newTxn.payee)
        isFormValid = isFormValid && !txnError.amount && !txnError.account && !txnError.tags && !txnError.payee
        break
      case 2:
        isFormValid = newTxn.amount && newTxn.fromAcc && newTxn.toAcc
        isFormValid = isFormValid && !txnError.amount && !txnError.fromAcc && !txnError.toAcc
        break
      case 3:
        isFormValid = newTxn.amount && newTxn.account && (newTxn.tags !== [] || newTxn.payer)
        isFormValid = isFormValid && !txnError.amount && !txnError.account && !txnError.tags && !txnError.payer
        break
      default: break
    }
    setFormValid(isFormValid)
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {ADD_TRANSACTION}
      </DialogTitle>
      <form noValidate autoComplete="off">
        <DialogContent sx={{ padding: "5 1", width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={txnTabValue} onChange={txnTabValueChange} aria-label="basic tabs example">
              <Tab label={TxnTabs[0]} {...TxnTabProps(0)} />
              <Tab label={TxnTabs[1]} {...TxnTabProps(1)} />
              <Tab label={TxnTabs[2]} {...TxnTabProps(2)} />
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
              Add
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default TransactionDialog