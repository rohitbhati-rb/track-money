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
import AccountDialog from '../dialogs/AccountDialog';
import { getFormattedDate } from '../../helpers';
import {
  ACCOUNTS_KEY,
  ADD_ACCOUNT,
  MY_ACCOUNTS,
  TRANSACTIONS_KEY,
  accErrorState,
  emptyAccount,
  noErrObj
} from '../../constants';
import { useLocalStorage } from '../../hooks';
import { Delete_Account_And_Related_Txn, Get_Updated_Current_Balance } from '../../txn';

const ManageAccounts = () => {
  const [accDialogOpen, setAccDialogOpen] = useState(false);
  const [isEditAccount, setIsEditAccount] = useState(false);
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
    setAccDialogOpen(false)
    setIsEditAccount(false)
    setNewAccount(emptyAccount)
    setAccError(accErrorState)
  };

  const addNewAccount = () => {
    newAccount.id = uuidv4();
    newAccount.createdAt = Date();
    newAccount.balance = Number(newAccount.openingBalance);
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
    if (!newAccount.isCreditCard)
      allAccounts[idx].balance = Get_Updated_Current_Balance(transactions, newAccount);
    setAccounts(allAccounts);
    setNewAccount(emptyAccount);
    setIsEditAccount(false);
  }
  const deleteAccount = (accId) => {
    if (Delete_Account_And_Related_Txn(accounts, setAccounts, transactions, setTransactions, accId)) {
      console.log("Account deleted")
      CloseAccDialog()
    } else {
      console.log("Error deleting account")
    }
  }
  return (
    <Container maxWidth="xl" sx={{ marginTop: 2, marginBottom: '60px' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="p" gutterBottom component="p">
          {MY_ACCOUNTS}
        </Typography>
        <Button
          size='small'
          variant='contained'
          sx={{ textTransform: "none", background: "orange", fontSize: { xs: 14, md: 18 } }}
          onClick={() => OpenAccDialog(null)}
        >
          {ADD_ACCOUNT}
        </Button>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        {accounts.map((val, idx) => (
          <Card onClick={() => OpenAccDialog(val)} sx={{ margin: "15px 0", display: "flex", justifyContent: "space-between" }} key={idx}>
            <CardContent sx={{ paddingY: 1 }}>
              <Typography sx={{ fontSize: { xs: 14, md: 16 } }} variant="p" component="div">
                {val.name}
                <Typography sx={{ fontSize: 10 }} color="text.secondary" variant="p" component="span">
                  {val.isCreditCard ? " Credit Card" : ""}
                </Typography>
              </Typography>

              <Typography sx={{ fontSize: { xs: 12, md: 14 } }} color="text.secondary" variant="p" component="div">
                {val.isCreditCard ? "Credit Limit: " : "Opening Balance: "}
                <Typography variant='p' sx={{ display: "inline" }} color="text.primary">
                  ₹ {val.isCreditCard ? val.creditLimit : val.openingBalance}
                </Typography>
              </Typography>

              <Typography sx={{ fontSize: { xs: 12, md: 14 } }} color="text.secondary" variant="p" component="div">
                {val.isCreditCard ? "Credit Balance: " : "Current Balance: "}
                <Typography variant='p' sx={{ display: "inline" }} color="text.primary">
                  ₹ {val.isCreditCard ? val.creditBalance : val.balance}
                </Typography>
              </Typography>

              <Typography component='span' sx={{ fontSize: { xs: 11, md: 12 } }} color="text.secondary">
                Date Added: {getFormattedDate(val.createdAt)}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
              {/* <Button sx={{ textTransform: 'none' }} variant='text' size="small" onClick={() => OpenAccDeleteDialog(val.id)}>Delete</Button> */}
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
          deleteAccount={deleteAccount}
          open={accDialogOpen}
          handleClose={CloseAccDialog}
        />
      </Box>
    </Container>
  )
}

export default ManageAccounts;