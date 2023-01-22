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

const TxnForm = ({ newTxn, setNewTxn, txnError, setTxnError, setFormValid }) => {
  const theme = useTheme();
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNewTxn((prev) => ({ ...prev, [name]: value }))
    validateTxnFormData(name, value)
  }
  const onTagsChange = (event) => {
    const { target: { value }, } = event;
    setNewTxn(
      (prev) => ({ ...prev, tags: typeof value === 'string' ? value.split(',') : value })
    );
    validateTxnFormData("tags", value)
  };
  const AccountDropDown = ({ label, name }) => {
    return (
      <FormControl fullWidth required sx={{ my: 1.25 }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          {...TxnFormProps(name, onInputChange, "demo-simple-select-helper")}
          label={label}
          value={newTxn[name]}
          renderValue={(val) => val.name}
        >
          {allAccounts.map((val) => (
            <MenuItem key={val.id} value={val} >{val.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  };

  const validateTxnFormData = (name, value) => {
    let fieldErrors = txnError;
    switch (name) {
      case "amount":
        if (isNaN(Number(value)))
          fieldErrors[name] = "Amount must be a number"
        else if (Number(value) <= 0)
          fieldErrors[name] = "Amount must be greater than 0"
        else
          fieldErrors[name] = ""
        break;
      case "payee" || "payer":
        let msgPrefix = name === "payee" ? "Payee" : "Payer"
        if (value !== "" && !isNaN(Number(value)))
          fieldErrors[name] = msgPrefix + " can't be a number"
        else if (value === "" && newTxn.tags.length === 0)
          fieldErrors[name] = msgPrefix + " and Tags both can't be empty"
        else if (isNaN(value) && newTxn.tags.length === 0) { fieldErrors[name] = ""; fieldErrors.tags = ""; }
        else
          fieldErrors[name] = ""
        break;
      case "tags":
        if (value.length === 0) {
          if (newTxn.type === 1 && newTxn.payee === "")
            fieldErrors.tags = "Payee and Tags both can't be empty"
          else if (newTxn.type === 3 && newTxn.payer === "")
            fieldErrors.tags = "Payer and Tags both can't be empty"
          else { fieldErrors.tags = ""; fieldErrors.payee = ""; fieldErrors.payer = "" }
        } else { fieldErrors.tags = ""; fieldErrors.payee = ""; fieldErrors.payer = "" }
        break;
      default: break;
    }
    setTxnError((prev) => ({ ...prev, ...fieldErrors }))
    validateTxnForm()
  }
  const validateTxnForm = () => {
    let isFormValid = false
    switch (newTxn.type) {
      case 1:
        isFormValid = newTxn.amount && newTxn.account && (newTxn.tags !== [] || newTxn.payee)
        isFormValid = isFormValid && !txnError.amount && !txnError.account && !txnError.tags && !txnError.payee
        break
      case 2:
        isFormValid = newTxn.amount && newTxn.fromAcc && newTxn.toAcc
        isFormValid = isFormValid && !txnError.amount && !txnError.fromAcc && !txnError.toAcc
        break
      case 3:
        isFormValid = newTxn.amount && newTxn.account && (newTxn.tags !== [] || newTxn.payer)
        isFormValid = isFormValid && !txnError.amount && !txnError.account && !txnError.tags && !txnError.payer
        break
      default: break
    }
    setFormValid(isFormValid)
  }
  // payer logic is breaking, tags is required anyways
  return (
    <Box sx={{ padding: "1em 0.5em" }}>
      <TextField
        {...TxnFormProps("amount", onInputChange)}
        value={newTxn.amount}
        type="tel"
        sx={{ my: 1.25 }}
        error={txnError.amount !== ""}
        helperText={txnError.amount}
      />
      {newTxn.type !== 2 && <AccountDropDown
        label="Bank Account"
        newTxn={newTxn}
        name="account"
        onInputChange={onInputChange}
      />}
      {newTxn.type !== 2 && <TextField
        {...TxnFormProps(`${newTxn.type === 1 ? "payee" : "payer"}`, onInputChange, "", false)}
        label={newTxn.type === 1 ? "To / Payee" : "From / Payer"}
        value={newTxn.type === 1 ? newTxn.payee : newTxn.payer}
        sx={{ my: 1.25 }}
        required={newTxn.tags.length === 0}
        error={txnError.payee !== "" || txnError.payer !== ""}
        helperText={newTxn.type === 1 ? txnError.payee : txnError.payer}
      />}
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
      <FormControl fullWidth required={(newTxn.type === 1 && !newTxn.payee) || (newTxn.type === 3 && !newTxn.payer)} sx={{ my: 1.25 }}>
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={newTxn.tags}
          onChange={onTagsChange}
          error={txnError.tags !== ""}
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
        <FormHelperText sx={{ color: "red" }}>{txnError.tags}</FormHelperText>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          name="dateTime"
          value={newTxn.dateTime}
          inputFormat="DD/MM/YYYY"
          onChange={(v) => setNewTxn((prev) => ({ ...prev, dateTime: v }))}
          renderInput={(params) => <TextField {...params} sx={{ my: 1.25 }} fullWidth />}
        // renderInput={(params) => {params.inputProps.value = getFormattedDate(params.inputProps.value); return <TextField {...params} sx={{ my: 1.25 }} fullWidth />}}
        />
      </LocalizationProvider>
      <TextField
        {...TxnFormProps("description", onInputChange, "", false)}
        value={newTxn.description}
        sx={{ my: 1.25 }}
      />
    </Box>
  )
}

export default TxnForm;