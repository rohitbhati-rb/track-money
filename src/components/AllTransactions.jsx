import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Container,
  Typography
} from '@mui/material';
import TransactionDialog from './dialogs/TransactionDialog';
import ExpenseCard from './cards/ExpenseCard';
import TransferCard from './cards/TransferCard';
import { ADD_TRANSACTION, MY_TRANSACTIONS, emptyTxn, txnErrorState, TRANSACTIONS_KEY, ACCOUNTS_KEY } from '../constants';
import { useLocalStorage } from '../hooks';
import { UpdateAccountBalance } from '../txn';

// transaction types
// 1 -> Expense
// 2 -> Transfer
// 3 -> Income

const Transactions = () => {
  const [transactions, setTransactions] = useLocalStorage(TRANSACTIONS_KEY, []);
  const [accounts, setAccounts] = useLocalStorage(ACCOUNTS_KEY, [])
  const [isEditTxn, setIsEditTxn] = useState(false);
  const [txnDialogOpen, setTxnDialogOpen] = useState(false);
  const [newTxn, setNewTxn] = useState(emptyTxn);
  const [txnError, setTxnError] = useState(txnErrorState);

  const OpenTxnDialog = (txn) => {
    if (txn !== null) {
      setNewTxn(txn)
      setIsEditTxn(true)
      setTxnError(txnErrorState)
    }
    setTxnDialogOpen(true)
  }
  const CloseTxnDialog = () => {
    setTxnDialogOpen(false)
    setNewTxn(emptyTxn)
    setTxnError(txnErrorState)
  }
  const addNewTxn = () => {
    const txns = transactions;
    newTxn.id = uuidv4();
    newTxn.createdAt = Date();
    txns.push(newTxn)
    if (UpdateAccountBalance(accounts, setAccounts, newTxn)) {
      setTransactions(txns)
      setNewTxn(emptyTxn)
      setTxnError(txnErrorState)
    } else {
      console.log("Error: Unable to add transaction")
    }
  }
  const editTxn = () => {
    const allTxns = transactions;
    let idx = allTxns.findIndex(val => val.id === newTxn.id);
    allTxns[idx] = newTxn;
    allTxns[idx].updatedAt = Date();
    setTransactions(allTxns);
    setNewTxn(emptyTxn);
    setIsEditTxn(false);
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" gutterBottom component="div" sx={{ marginBottom: 2 }}>
          {MY_TRANSACTIONS}
        </Typography>
        <Button
          size='small'
          variant='contained'
          sx={{ textTransform: "none", background: "orange", fontSize: 18 }}
          onClick={() => OpenTxnDialog(null)}
        >
          {ADD_TRANSACTION}
        </Button>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        {transactions.map((val, idx) => (
          val.type === 1 || val.type === 3 ?
            <ExpenseCard OpenTxnDialog={OpenTxnDialog} data={val} key={idx} />
            :
            val.type === 2 ?
              <TransferCard data={val} key={idx} />
              :
              ""
        ))}
        <TransactionDialog
          open={txnDialogOpen}
          handleClose={CloseTxnDialog}
          isEditTxn={isEditTxn}
          newTxn={newTxn}
          setNewTxn={setNewTxn}
          addTxn={isEditTxn ? editTxn : addNewTxn}
          txnError={txnError}
          setTxnError={setTxnError}
        />
      </Box>
    </Container>
  )
}

export default Transactions;