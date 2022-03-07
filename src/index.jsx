import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import createTheme from "styles/createTheme";
import App from "./App";

const theme = createMuiTheme({
  topbar: { height: 64 },
});

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById("root")
);
