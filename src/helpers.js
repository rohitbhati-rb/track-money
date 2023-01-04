export const getFormattedDate = (s) => {
  let d = new Date(s);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

export const TxnTabProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const getTagStyles = (name, personName, theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const TxnFormProps = (fieldName, onInputChange, id_value = "", req = true) => {
  return {
    id: `${id_value ? id_value : "outlined-error-helper-text"}`,
    label: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
    name: fieldName,
    fullWidth: true,
    required: req,
    onChange: onInputChange
  };
}
export const validateTxnFormData = (name, value, newTxn, setTxnError) => {
  if (name === "amount") {
    if (isNaN(Number(value)))
      setTxnError((prev) => ({ ...prev, [name]: "Amount must be a number" }))
    else if (Number(value) <= 0)
      setTxnError((prev) => ({ ...prev, [name]: "Amount must be greater than 0" }))
    else
      setTxnError((prev) => ({ ...prev, [name]: "" }))
  }
  if (name === "payee" || name === "payer") {
    let msgPrefix = name === "payee" ? "Payee" : "Payer"
    if (value !== "" && !isNaN(Number(value)))
      setTxnError((prev) => ({ ...prev, [name]: msgPrefix + " can't be a number" }))
    else if (value === "" && newTxn.tags.length === 0)
      setTxnError((prev) => ({ ...prev, [name]: msgPrefix + " and Tags both can't be empty" }))
    else if (isNaN(value) && newTxn.tags.length === 0)
      setTxnError((prev) => ({ ...prev, [name]: "", tags: "" }))
    else
      setTxnError((prev) => ({ ...prev, [name]: "" }))
  }
  if (name === "tags") {
    if (value.length === 0) {
      if (newTxn.type === 1 && newTxn.payee === "")
        setTxnError((prev) => ({ ...prev, tags: "Payee and Tags both can't be empty" }))
      else if (newTxn.type === 3 && newTxn.payer === "")
        setTxnError((prev) => ({ ...prev, tags: "Payer and Tags both can't be empty" }))
      else
        setTxnError((prev) => ({ ...prev, tags: "", payee: "", payer: "" }))
    } else {
      setTxnError((prev) => ({ ...prev, tags: "", payee: "", payer: "" }))
    }
  }
}
export const validateTxnForm = (txnError) => {
  if (txnError.amount === "" && txnError.tags === "")
    if (txnError.payee === "" || txnError.payer === "")
      return true
  return false
}