import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography
} from '@mui/material';
import TransactionDialog from './dialogs/TransactionDialog';
import ExpenseCard from './cards/ExpenseCard';
import TransferCard from './cards/TransferCard';
import { ADD_TRANSACTION, MY_TRANSACTIONS,emptyTxn, txnErrorState, TRANSACTIONS_KEY } from '../constants';
import {useLocalStorage} from '../hooks';

// transaction types
// 1 -> Expense
// 2 -> Transfer
// 3 -> Income

const Transactions = () => {
  const [transactions, setTransactions] = useLocalStorage(TRANSACTIONS_KEY, []);
  const [txnDialogOpen, setTxnDialogOpen] = useState(false);
  const [newTxn, setNewTxn] = useState(emptyTxn);
  const [txnError, setTxnError] = useState(txnErrorState);

  const OpenTxnDialog = () => {
    setTxnDialogOpen(true)
  }
  const CloseTxnDialog = () => {
    setTxnDialogOpen(false)
    setNewTxn(emptyTxn)
    setTxnError(txnErrorState)
  }
  const addNewTxn = () => {
    const txns = transactions;
    txns.push(newTxn)
    setTransactions(txns)
    setNewTxn(emptyTxn)
    setTxnError(txnErrorState)
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ marginBottom: 2 }}>
          {MY_TRANSACTIONS}
        </Typography>
        <Button
          size='small'
          variant='contained'
          sx={{ textTransform: "none", background: "orange", fontSize: 18 }}
          onClick={OpenTxnDialog}
        >
          {ADD_TRANSACTION}
        </Button>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        {transactions.map((val, idx) => (
          val.type === 1 || val.type === 3 ?
            <ExpenseCard data={val} key={idx} />
            :
            val.type === 2 ?
              <TransferCard data={val} key={idx} />
              :
              ""
        ))}
        <TransactionDialog
          open={txnDialogOpen}
          handleClose={CloseTxnDialog}
          newTxn={newTxn}
          setNewTxn={setNewTxn}
          addNewTxn={addNewTxn}
          txnError={txnError}
          setTxnError={setTxnError}
        />
      </Box>
    </Container>
  )
}

export default Transactions;