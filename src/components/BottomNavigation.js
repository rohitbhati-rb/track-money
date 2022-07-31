import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Add Transaction" icon={<AddBoxIcon />} />
        <BottomNavigationAction label="Manage Accounts" icon={<AccountBalanceIcon />} />
        <BottomNavigationAction label="Reports" icon={<AssessmentIcon />} />
      </BottomNavigation>
    </Box>
  );
}
