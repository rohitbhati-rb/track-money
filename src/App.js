import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import "@fontsource/roboto";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import AllTransactions from "./components/AllTransactions";
import ManageAccounts from "./components/ManageAccounts";
import Reports from "./components/Reports";

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
        <Route path="/" element={<AllTransactions />} />
        <Route path="/accounts" element={<ManageAccounts />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
      {smallScreen ? <BottomNav /> : ""}
    </ThemeProvider>
  );
}

export default App;
