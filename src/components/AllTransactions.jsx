import { useEffect, useState } from 'react';
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
import { Update_Account_Balance_On_Txn, Update_Account_Balance_On_Txn_Edit, Delete_Txn, } from '../txn';

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

  useEffect(() => {
    console.log((transactions))
  }, [transactions])

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
    setIsEditTxn(false)
    setNewTxn(emptyTxn)
    setTxnError(txnErrorState)
  }
  const addNewTxn = () => {
    const txns = transactions;
    newTxn.id = uuidv4();
    newTxn.createdAt = (new Date()).getTime();
    txns.push(newTxn)
    if (Update_Account_Balance_On_Txn(accounts, setAccounts, newTxn)) {
      txns.sort((a, b) => b.createdAt - a.createdAt)
      setTransactions(txns)
    } else {
      console.log("Error: Unable to add transaction")
    }
    setNewTxn(emptyTxn)
    setTxnError(txnErrorState)
  }
  const editTxn = () => {
    const allTxns = transactions;
    let idx = allTxns.findIndex(val => val.id === newTxn.id);
    if (Update_Account_Balance_On_Txn_Edit(accounts, setAccounts, newTxn, allTxns[idx])) {
      allTxns[idx] = newTxn;
      allTxns[idx].updatedAt = (new Date()).getTime();
      setTransactions(allTxns);
    } else {
      console.log("Error: Unable to edit transaction")
    }
    setNewTxn(emptyTxn);
    setIsEditTxn(false);
  }
  const deleteTxn = (txnId) => {
    if (Delete_Txn(accounts, setAccounts, transactions, setTransactions, txnId)) {
      CloseTxnDialog()
      console.log("Transaction deleted")
    } else {
      console.log("Error deleting transaction")
    }
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2, marginBottom: '60px' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="p" gutterBottom component="p">
          {MY_TRANSACTIONS}
        </Typography>
        <Button
          size='small'
          variant='contained'
          sx={{ textTransform: "none", background: "orange", fontSize: { xs: 14, md: 18 } }}
          onClick={() => OpenTxnDialog(null)}
        >
          {ADD_TRANSACTION}
        </Button>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        {((transactions)).map((val, idx) => (
          val.type === 1 || val.type === 3 ?
            <ExpenseCard OpenTxnDialog={OpenTxnDialog} data={val} key={idx} />
            :
            val.type === 2 ?
              <TransferCard OpenTxnDialog={OpenTxnDialog} data={val} key={idx} />
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
          deleteTxn={deleteTxn}
          txnError={txnError}
          setTxnError={setTxnError}
        />
      </Box>
    </Container>
  )
}

export default Transactions;