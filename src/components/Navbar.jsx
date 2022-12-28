import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Switch,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';

import {
  APP_NAME,
  COMMON_NAVBAR_SETTINGS,
  NAV_BUTTONS,
  ROUTES,
  SETTINGS
} from '../constants';

const originObject = {
  vertical: 'top',
  horizontal: 'right',
}

const Navbar = (props) => {
  let navigate = useNavigate();
  let location = useLocation();

  const { isDarkTheme, changeTheme } = props;
  const [anchorElUser, setAnchorElUser] = useState(null);

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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavClick = (val) => {
    navigate(ROUTES[val], { replace: false });
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate(ROUTES[0], { replace: false })}
            sx={{
              ...COMMON_NAVBAR_SETTINGS,
              display: { xs: 'none', md: 'flex' },
              fontSize: 32,
              cursor: "pointer"
            }}
          >
            {APP_NAME}
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={ROUTES[0]}
            sx={{
              ...COMMON_NAVBAR_SETTINGS,
              ml: 0.5,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontSize: 26,
            }}
          >
            {APP_NAME}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {NAV_BUTTONS.map((val, idx) => (
              <Button
                key={idx}
                onClick={() => handleNavClick(idx)}
                sx={{
                  my: 2,
                  display: 'block',
                  textTransform: "none",
                  color: value === idx ? '#90caf9' : 'white',
                  fontWeight: value === idx ? "900" : "400",
                  fontSize: value === idx ? 22 : 18,
                }}
              >
                {val}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open SETTINGS">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={originObject}
              keepMounted
              transformOrigin={originObject}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {SETTINGS.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseUserMenu}>
                <MaterialUISwitch checked={isDarkTheme} onChange={changeTheme} sx={{ m: 1 }} />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default Navbar;