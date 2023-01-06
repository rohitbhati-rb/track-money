import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Tab, Tabs, Box
} from '@mui/material';
import TxnForm from './TxnForm';
import { ADD_TRANSACTION, TxnTabs } from '../../constants';
import { TxnTabProps, validateTxnForm } from '../../helpers';
import { emptyTxn, txnErrorState as emptyTxnError } from '../../appState';

const TransactionDialog = ({ open, handleClose, newTxn, setNewTxn, addNewTxn, txnError, setTxnError }) => {
  const [txnTabValue, setTxnTabValue] = useState(0);
  const txnTabValueChange = (e, val) => {
    setTxnTabValue(val);
    setNewTxn(({ ...emptyTxn, type: val + 1 }))
    setTxnError(emptyTxnError)
  };
  const handleAddTxn = () => {
    if (validateTxnForm(txnError)) {
      addNewTxn()
      setTxnTabValue(0)
      handleClose()
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {ADD_TRANSACTION}
      </DialogTitle>
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
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
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
    </Dialog>
  );
}

export default TransactionDialog