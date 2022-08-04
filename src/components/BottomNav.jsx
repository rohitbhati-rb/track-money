import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function BottomNav() {
  let navigate = useNavigate();
  let location = useLocation();
  let navValue = location?.pathname === '/' ? 0 : location?.pathname === '/accounts' ? 1 : 2;
  const [value, setValue] = useState(navValue);
  const routes = ["/", "/accounts", "/reports"];
  useEffect(() => {
    if (location?.pathname === '/') {
      setValue(0)
    } else if (location?.pathname === '/accounts') {
      setValue(1)
    } else {
      setValue(2)
    }
  }, [location])

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(routes[newValue], { replace: false });
        }}
      >
        <BottomNavigationAction label="All Transactions" icon={<PaymentsIcon />} />
        <BottomNavigationAction label="Manage Accounts" icon={<AccountBalanceIcon />} />
        <BottomNavigationAction label="Reports" icon={<AssessmentIcon />} />
      </BottomNavigation>
    </Box>
  );
}
