import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Unstable_DateField as DateField } from '@mui/x-date-pickers/DateField';
import { v4 as uuidv4 } from 'uuid';

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
const TxnForm = ({ newTxn, setNewTxn }) => {
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNewTxn((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <Box sx={{ padding: "1em 0.5em" }}>
      {newTxn.type !== 2 && <TextField
        id="outlined-error-helper-text"
        label={newTxn.type === 1 ? "To / Payee" : "From / Payer"}
        name={newTxn.type === 1 ? "payee" : "payer"}
        value={newTxn.type === 1 ? newTxn.payee : newTxn.payer}
        onChange={onInputChange}
        fullWidth
        required
        sx={{ my: 1.25 }}
        error={false}
        helperText=""
      />}
      {newTxn.type !== 2 && <AccountDropDown
        label="Bank Account"
        newTxn={newTxn}
        name="account"
        onInputChange={onInputChange}
      />}
      <div>
        <TextField
          id="outlined-error-helper-text"
          label="Amount"
          name="amount"
          value={newTxn.amount}
          onChange={onInputChange}
          required
          fullWidth
          sx={{ my: 1.25 }}
          error={false}
          helperText=""
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            label="Date"
            fullWidth
            sx={{ my: 1.25 }}
            value={newTxn.dateTime}
            onChange={onInputChange}
            format="LL"
          />
        </LocalizationProvider>
      </div>
      {newTxn.type === 2
        &&
        <>
          <AccountDropDown
            label="From"
            newTxn={newTxn}
            name="fromAcc"
            onInputChange={onInputChange}
          />
          <AccountDropDown
            label="To"
            newTxn={newTxn}
            name="toAcc"
            onInputChange={onInputChange}
          />
        </>
      }
      <TextField
        id="outlined-error-helper-text"
        label="Description"
        name="description"
        value={newTxn.description}
        onChange={onInputChange}
        fullWidth
        sx={{ my: 1.25 }}
        error={false}
        helperText=""
      />
    </Box>
  )
}

const AccountDropDown = ({ label, newTxn, name, onInputChange }) => {
  return (
    <FormControl fullWidth required sx={{ my: 1.25 }}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        id="demo-simple-select-helper"
        labelId="demo-simple-select-helper-label"
        label={label}
        name={name}
        value={newTxn[name]}
        onChange={onInputChange}
        // onChange={(e) => setNewTxn({ ...newTxn, [name]: e.target.value })}
        fullWidth
        error={false}
        renderValue={(val) => val.name}
      >
        {allAccounts.map((val) => (
          <MenuItem key={val.id} value={val} >{val.name}</MenuItem>
        ))}
      </Select>
      {<FormHelperText></FormHelperText>}
    </FormControl>
  )
}

export default TxnForm;