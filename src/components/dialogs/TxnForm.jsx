import { Box, TextField } from "@mui/material";

const TxnForm = ({ newTxn, setNewTxn }) => {
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNewTxn((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <Box sx={{ padding: "1em 0.5em" }}>
      {newTxn.type !== 2
        &&
        <>
          <TextField
            id="outlined-error-helper-text"
            label={newTxn.type === 1 ? "Payee" : "Payer"}
            name={newTxn.type === 1 ? "payee" : "payer"}
            value={newTxn.type === 1 ? newTxn.payee : newTxn.payer}
            onChange={onInputChange}
            error={false}
            fullWidth
            sx={{ marginTop: 2 }}
            helperText=""
          />
          acc dropdown
        </>
      }
      <TextField
        id="outlined-error-helper-text"
        label="Amount"
        name="amount"
        value={newTxn.amount}
        onChange={onInputChange}
        error={false}
        fullWidth
        sx={{ marginTop: 2 }}
        helperText=""
      />
      <TextField
        id="outlined-error-helper-text"
        label="Description"
        name="description"
        value={newTxn.description}
        onChange={onInputChange}
        error={false}
        fullWidth
        sx={{ marginTop: 2 }}
        helperText=""
      />
      {newTxn.type === 2
        &&
        <>
          "from and to acc dropdowns"
        </>
      }
    </Box>
  )
}

export default TxnForm;