import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Tab, Tabs, Box
} from '@mui/material';
import TxnForm from './TxnForm';
import { TxnTabs } from '../../constants';
import { TxnTabProps } from '../../helpers';

const TransactionDialog = ({ open, handleClose, newTxn, setNewTxn, addNewTxn }) => {
  const [txnTabValue, setTxnTabValue] = useState(0);
  const txnTabValueChange = (e, val) => {
    setTxnTabValue(val);
    setNewTxn((prev) => ({ ...prev, type: val + 1 }))
  };
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddTxn}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TransactionDialog