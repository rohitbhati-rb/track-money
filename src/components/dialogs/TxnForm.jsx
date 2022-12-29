import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Chip,
  OutlinedInput
} from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useTheme from "@mui/material/styles/useTheme";

import { allAccounts, allTags } from "../../appState";
import { TxnTagsMenuProps } from "../../constants";
import { getTagStyles, TxnFormProps } from "../../helpers";

const TxnForm = ({ newTxn, setNewTxn }) => {
  const theme = useTheme();
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNewTxn((prev) => ({ ...prev, [name]: value }))
  }
  const onTagsChange = (event) => {
    const { target: { value }, } = event;
    setNewTxn(
      (prev) => ({ ...prev, tags: typeof value === 'string' ? value.split(',') : value })
    );
  };
  return (
    <Box sx={{ padding: "1em 0.5em" }}>
      {newTxn.type !== 2 && <TextField
        {...TxnFormProps(`${newTxn.type === 1 ? "payee" : "payer"}`, onInputChange)}
        label={newTxn.type === 1 ? "To / Payee" : "From / Payer"}
        value={newTxn.type === 1 ? newTxn.payee : newTxn.payer}
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
          {...TxnFormProps("amount", onInputChange)}
          value={newTxn.amount}
          sx={{ my: 1.25 }}
          error={false}
          helperText=""
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            name="dateTime"
            value={newTxn.dateTime}
            onChange={(v) => setNewTxn((prev) => ({ ...prev, dateTime: v }))}
            renderInput={(params) => <TextField {...params} sx={{ my: 1.25 }} fullWidth />}
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
      <FormControl sx={{ my: 1.25, width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={newTxn.tags}
          onChange={onTagsChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))}
            </Box>
          )}
          MenuProps={TxnTagsMenuProps}
        >
          {allTags.map((val) => (
            <MenuItem
              key={val.id}
              value={val}
              style={getTagStyles(val, newTxn.tags, theme)}
            >
              {val.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        {...TxnFormProps("description", onInputChange, false)}
        value={newTxn.description}
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
        labelId="demo-simple-select-helper-label"
        {...TxnFormProps(name, onInputChange, "demo-simple-select-helper")}
        label={label}
        value={newTxn[name]}
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