import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

import "./index.css";
import App from "./App";
import { store } from "./redux/store";

function Root() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Provider store={store}>
        <BrowserRouter>
          <App
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);