import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

//Custom palette
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Example primary color (blue)
    },
    secondary: {
      main: "#109612", // Example primary color (blue)
    },
    third: {
      main: "#dc004e", // Example secondary color (red)
    },
    background: {
      default: "#f5f5f5", // Default background color
    },
    text: {
      primary: "#333", // Primary text color
    },
  },
});

function TicketSystem() {
  const [currentView, setCurrentView] = useState(0);

  const openContent = (event) => {
    const data = event.currentTarget.dataset.value;
    console.log("Data: ", data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar
        view={currentView}
        toggleView={setCurrentView}
        openContent={openContent}
      ></Navbar>
    </ThemeProvider>
  );
}

export default TicketSystem;
