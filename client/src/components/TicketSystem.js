import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewTicket from "./NewTicket";
import MyTickets from "./MyTickets";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", //Blue
    },
    secondary: {
      main: "#109612", //Green
    },
    third: {
      main: "#dc004e", //Red
    },
    background: {
      default: "#f4f4f4", // Default background color
      dark: "#f8f8f8", // Default background color
    },
    text: {
      primary: "#333", // Primary text color
    },
  },
});

function TicketSystem() {
  const [currentView, setCurrentView] = useState(false);
  const [selected, setSelected] = useState(0);

  const changeView = (v) => {
    setSelected(0);
    setCurrentView(!currentView);
  };

  const openContent = (event) => {
    const data = event.currentTarget.dataset.value;
    setSelected(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar
        view={currentView}
        toggleView={changeView}
        openContent={openContent}
      ></Navbar>
      {selected === "New Ticket" && <NewTicket />}
      {selected === "My Tickets" && <MyTickets />}
      <footer id="footer">
        © Samuli Kalliomäki
        <br />
        Made with React and Material UI
      </footer>
    </ThemeProvider>
  );
}

export default TicketSystem;
