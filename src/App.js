import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import "@fontsource/roboto";
import Navbar from "./components/Navbar";
import SimpleBottomNavigation from "./components/BottomNavigation";

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
  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  const smallScreen = useMediaQuery('(max-width:900px)');
  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <Navbar isDarkTheme={isDarkTheme} changeTheme={changeTheme} />
      {smallScreen ? <SimpleBottomNavigation /> : ""}
    </ThemeProvider>
  );
}

export default App;
