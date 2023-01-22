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