export const getFormattedDate = (date) => {
  // Get the current date
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });

  // Get the date passed as argument
  const passedDate = new Date(date);
  const passedDay = passedDate.toLocaleString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });

  // If the time difference is less than one day
  if (passedDay <= currentDay) {
    // Check if it's today
    if (passedDay === currentDay) {
      return 'Today';
    }

    // Check if it's yesterday
    const yesterday = new Date();
    yesterday.setDate(currentDate.getDate() - 1);
    const yesterdayDay = yesterday.toLocaleString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
    if (passedDay === yesterdayDay) {
      return 'Yesterday';
    }

    // If it's not today or yesterday, return the formatted date
    return passedDay;
  } else {
    // If it's more than one day, return the formatted date
    return passedDay;
  }
};

export const TxnTabProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
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