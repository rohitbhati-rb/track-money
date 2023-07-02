import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import "@fontsource/roboto";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import AllTransactions from "./components/main/AllTransactions";
import ManageAccounts from "./components/main/ManageAccounts";
import Reports from "./components/main/Reports";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const changeTheme = () => { setIsDarkTheme(!isDarkTheme); };

  const smallScreen = useMediaQuery('(max-width:900px)');

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <Navbar isDarkTheme={isDarkTheme} changeTheme={changeTheme} />
      <Routes>
        {/* <Route exact path="/" element={<Navigate to="/transactions" replace={false} />} /> */}
        <Route path="/" element={<Navigate to="/transactions" replace={false} />} />
        <Route path="/transactions" element={<AllTransactions />} />
        <Route path="/accounts" element={<ManageAccounts />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
      {smallScreen ? <BottomNav /> : ""}
    </ThemeProvider>
  );
}

export default App;
