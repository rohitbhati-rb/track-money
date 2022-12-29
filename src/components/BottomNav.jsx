import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { ROUTES, NAV_BUTTONS } from '../constants';

export default function BottomNav() {
  let navigate = useNavigate();
  let location = useLocation();
  let navValue = location?.pathname === ROUTES[0] ? 0 : location?.pathname === ROUTES[1] ? 1 : location?.pathname === ROUTES[2] ? 2 : 3;
  const [value, setValue] = useState(navValue);

  useEffect(() => {
    if (location?.pathname === ROUTES[0]) {
      setValue(0)
    } else if (location?.pathname === ROUTES[1]) {
      setValue(1)
    } else if (location?.pathname === ROUTES[2]) {
      setValue(2)
    }
  }, [location])

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
          navigate(ROUTES[newValue], { replace: false });
        }}
      >
        <BottomNavigationAction label={NAV_BUTTONS[0]} icon={<PaymentsIcon />} />
        <BottomNavigationAction label={NAV_BUTTONS[1]} icon={<AccountBalanceIcon />} />
        <BottomNavigationAction label={NAV_BUTTONS[2]} icon={<AssessmentIcon />} />
      </BottomNavigation>
    </Box>
  );
}
