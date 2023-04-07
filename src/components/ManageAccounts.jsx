import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import AccountDialog from './dialogs/AccountDialog';
import DeleteDialog from './dialogs/DeleteDialog';
import { getFormattedDate } from '../helpers';
import {
  ACCOUNTS_KEY,
  ADD_ACCOUNT,
  MY_ACCOUNTS,
  TRANSACTIONS_KEY,
  accErrorState,
  emptyAccount,
  noErrObj
} from '../constants';
import { useLocalStorage } from '../hooks';
import { DeleteAcc_and_UpdateTxns } from '../txn';

const ManageAccounts = () => {
  const [accDialogOpen, setAccDialogOpen] = useState(false);
  const [isEditAccount, setIsEditAccount] = useState(false);
  const [accDeleteDialogOpen, setDeleteAccDialogOpen] = useState({ open: false, id: undefined });
  const [accounts, setAccounts] = useLocalStorage(ACCOUNTS_KEY, [])
  const [transactions, setTransactions] = useLocalStorage(TRANSACTIONS_KEY, []);
  const [newAccount, setNewAccount] = useState(emptyAccount);
  const [accError, setAccError] = useState(accErrorState);

  const OpenAccDialog = (acc) => {
    if (acc !== null) {
      setNewAccount(acc);
      setIsEditAccount(true);
      setAccError({
        name: noErrObj,
        creditLimit: noErrObj,
        openingBalance: noErrObj,
        creditBalance: noErrObj
      })
    }
    setAccDialogOpen(true);
  };

  const CloseAccDialog = () => {
    setAccDialogOpen(false);
    setNewAccount(emptyAccount)
    setAccError(accErrorState)
  };

  const OpenAccDeleteDialog = (id) => {
    setDeleteAccDialogOpen({ open: true, id: id });
  };

  const CloseAccDeleteDialog = () => {
    setDeleteAccDialogOpen({ open: false, id: undefined });
  };
  const addNewAccount = () => {
    newAccount.id = uuidv4();
    newAccount.createdAt = Date();
    newAccount.balance = newAccount.openingBalance;
    const newAccounts = accounts;
    newAccounts.push(newAccount);
    setAccounts(newAccounts);
    setNewAccount(emptyAccount);
  }
  const editAccount = () => {
    const allAccounts = accounts;
    let idx = allAccounts.findIndex(val => val.id === newAccount.id);
    allAccounts[idx] = newAccount;
    allAccounts[idx].updatedAt = Date();
    setAccounts(allAccounts);
    setNewAccount(emptyAccount);
    setIsEditAccount(false);
  }
  const deleteAccount = (accId) => {
    DeleteAcc_and_UpdateTxns(accounts, setAccounts, transactions, setTransactions, accId)
  }
  return (
    <Container maxWidth="xl" sx={{ marginTop: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" gutterBottom component="div" sx={{ marginBottom: 2 }}>
          {MY_ACCOUNTS}
        </Typography>
        <Button
          size='small'
          variant='contained'
          sx={{ textTransform: "none", background: "orange", fontSize: 18 }}
          onClick={() => OpenAccDialog(null)}
        >
          {ADD_ACCOUNT}
        </Button>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        {accounts.map((val, idx) => (
          <Card sx={{ margin: "15px 0", display: "flex", justifyContent: "space-between" }} key={idx}>
            <CardContent>
              <Typography sx={{ fontSize: 16 }} variant="p" component="div">
                {val.name}
                <Typography sx={{ fontSize: 10 }} color="text.secondary" variant="p" component="span">
                  {val.isCreditCard ? " Credit Card" : ""}
                </Typography>
              </Typography>

              <Typography sx={{ fontSize: 14 }} color="text.secondary" variant="p" component="div">
                {val.isCreditCard ? "Credit Limit: " : "Opening Balance: "}
                <Typography variant='p' sx={{ display: "inline" }} color="text.primary">
                  ₹ {val.isCreditCard ? val.creditLimit : val.openingBalance}
                </Typography>
              </Typography>

              <Typography sx={{ fontSize: 14 }} color="text.secondary" variant="p" component="div">
                {val.isCreditCard ? "Credit Balance: " : "Current Balance: "}
                <Typography variant='p' sx={{ display: "inline" }} color="text.primary">
                  ₹ {val.isCreditCard ? val.creditBalance : val.balance}
                </Typography>
              </Typography>

              <Typography component='span' sx={{ fontSize: 12 }} color="text.secondary">
                Date Added: {getFormattedDate(val.createdAt)}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
              <Button variant='text' size="small" onClick={() => OpenAccDialog(val)}>Edit</Button>
              <Button variant='text' size="small" onClick={() => OpenAccDeleteDialog(val.id)}>Delete</Button>
            </CardActions>
          </Card>
        ))}
        <AccountDialog
          accError={accError}
          setAccError={setAccError}
          isEditAccount={isEditAccount}
          newAccount={newAccount}
          setNewAccount={setNewAccount}
          addAccount={isEditAccount ? editAccount : addNewAccount}
          open={accDialogOpen}
          handleClose={CloseAccDialog}
        />
        <DeleteDialog
          id={accDeleteDialogOpen.id}
          open={accDeleteDialogOpen.open}
          handleClose={CloseAccDeleteDialog}
          deleteAccount={deleteAccount}
        />
      </Box>
    </Container>
  )
}

export default ManageAccounts;