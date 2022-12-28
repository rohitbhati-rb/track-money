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

const allAccounts = [
  {
    id: uuidv4(),
    name: "SBI",
    balance: 111523,
    createdAt: Date()
  },
  {
    id: uuidv4(),
    name: "HDFC",
    balance: 99923,
    createdAt: Date()
  },
  {
    id: uuidv4(),
    name: "ICICI",
    balance: 14523,
    createdAt: Date()
  },
  {
    id: uuidv4(),
    name: "Paytm Wallet",
    balance: 523,
    createdAt: Date()
  }
];
const emptyAccount = { id: '', name: '', balance: '', createdAt: '' };

const ManageAccounts = () => {
  const [accDialogOpen, setAccDialogOpen] = useState(false);
  const [isEditAccount, setIsEditAccount] = useState(false);
  const [accDeleteDialogOpen, setDeleteAccDialogOpen] = useState({ open: false, id: undefined });
  const [accounts, setAccounts] = useState(allAccounts);
  const [newAccount, setNewAccount] = useState(emptyAccount);

  const OpenAccDialog = (acc) => {
    if (acc !== null) {
      setNewAccount(acc);
      setIsEditAccount(true);
    }
    setAccDialogOpen(true);
  };

  const CloseAccDialog = () => {
    setAccDialogOpen(false);
  };

  const OpenAccDeleteDialog = (id) => {
    setDeleteAccDialogOpen({ open: true, id: id });
  };

  const CloseAccDeleteDialog = () => {
    setDeleteAccDialogOpen({ open: false, id: undefined });
  };
  const addNewAccount = () => {
    const newAccounts = accounts;
    newAccounts.push(newAccount);
    setAccounts(newAccounts);
    setNewAccount(emptyAccount);
  }
  const editAccount = () => {
    const allAccounts = accounts;
    let idx = allAccounts.findIndex(val => val.id === newAccount.id);
    allAccounts[idx].name = newAccount.name;
    allAccounts[idx].balance = newAccount.balance;
    setAccounts(allAccounts);
    setNewAccount(emptyAccount);
    setIsEditAccount(false);
  }
  const deleteAccount = (id) => {
    const newAccounts = accounts.filter(acc => acc.id !== id)
    setAccounts(newAccounts)
  }
  return (
    <Container maxWidth="xl" sx={{ marginTop: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ marginBottom: 2 }}>
          My Accounts
        </Typography>
        <Button
          size='small'
          variant='contained'
          sx={{ textTransform: "none", background: "orange", fontSize: 18 }}
          onClick={() => OpenAccDialog(null)}
        >
          Add Account
        </Button>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        {accounts.map((val, idx) => (
          <Card sx={{ margin: "15px 0", display: "flex", justifyContent: "space-between" }} key={idx}>
            <CardContent>
              <Typography variant="h5" component="div">
                {val.name}
              </Typography>
              <Typography sx={{ fontSize: 18, letterSpacing: 0.8 }} color="text.secondary" variant="p" component="div">
                Balance:&nbsp;
                <Typography variant='p' sx={{ display: "inline", letterSpacing: 0.8 }} color="text.primary">
                  ₹{val.balance}
                </Typography>
              </Typography>
              <Typography component='span' sx={{ fontSize: 12 }} color="text.secondary">
                Date Added: {getFormattedDate(val.createdAt)}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
              <Button size="small" onClick={() => OpenAccDialog(val)}>Edit</Button>
              <Button size="small" onClick={() => OpenAccDeleteDialog(val.id)}>Delete</Button>
            </CardActions>
          </Card>
        ))}
        <AccountDialog
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