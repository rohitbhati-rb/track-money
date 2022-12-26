import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import TransactionDialog from './dialogs/TransactionDialog';
import ExpenseCard from './cards/ExpenseCard';
import TransferCard from './cards/TransferCard';

// transaction types
// 1 -> Expense
// 2 -> Transfer
// 3 -> Income

const allTransactions = [
  {
    id: uuidv4(),
    type: 1,
    payee: "Dominos Pizza",
    description: "Bought 5 pizzas for saturday night and my birthday",
    amount: 785,
    account: { id: uuidv4(), name: "Paytm Wallet" },
    tags: [{ id: uuidv4(), value: "food" }, { id: uuidv4(), value: "party" }],
    createdAt: Date(),
    updatedAt: Date()
  },
  {
    id: uuidv4(),
    type: 1,
    payee: "boat Headphones",
    description: "Bought airdopes for dad",
    amount: 1499,
    account: { id: uuidv4(), name: "SBI" },
    tags: [{ id: uuidv4(), value: "electronics" }, { id: uuidv4(), value: "gift" }],
    createdAt: Date(),
    updatedAt: Date()
  },
  {
    id: uuidv4(),
    type: 3,
    payer: "Deloitte",
    amount: 50000,
    account: { id: uuidv4(), name: "HDFC" },
    description: "monthly salary",
    tags: [{ id: uuidv4(), value: "income" }],
    createdAt: Date(),
    updatedAt: Date()
  },
  {
    id: uuidv4(),
    type: 2,
    description: "transfer to hdfc",
    amount: 4500,
    fromAcc: { id: uuidv4(), name: "SBI" },
    toAcc: { id: uuidv4(), name: "HDFC" },
    tags: [{ id: uuidv4(), value: "transfer" }],
    createdAt: Date(),
    updatedAt: Date()
  }
];
const emptyTxn = {
  id: '',
  type: 1,
  description: '',
  amount: '',
  payee: '',//1
  payer: '',//3
  account: '', // { id: '', name: '' }, 1 & 3
  fromAcc: '', // { id: '', name: '' }, 2
  toAcc: '', // { id: '', name: '' }, 2
  tags: '', //[{ id: '', value: '' }],
  dateTime: Date(),
  createdAt: '',
  updatedAt: ''
};

const Transactions = () => {
  const [transactions, setTransactions] = useState(allTransactions);
  const [txnDialogOpen, setTxnDialogOpen] = useState(false);
  const [newTxn, setNewTxn] = useState(emptyTxn);

  const OpenTxnDialog = () => {
    setTxnDialogOpen(true)
  }
  const CloseTxnDialog = () => {
    setTxnDialogOpen(false)
  }
  const addNewTxn = () => {
    const txns = transactions;
    txns.push(newTxn)
    console.log(newTxn)
    setTransactions(txns)
    setNewTxn(emptyTxn)
    console.log(newTxn)
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ marginBottom: 2 }}>
          My Transactions
        </Typography>
        <Button
          size='small'
          variant='contained'
          sx={{ textTransform: "none", background: "orange", fontSize: 18 }}
          onClick={OpenTxnDialog}
        >
          Add Transaction
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
        />
      </Box>
    </Container>
  )
}

export default Transactions;