import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewTicket from "./NewTicket";
import MyTickets from "./MyTickets";
import Container from "@mui/material/Container";
import About from "./About";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", //Blue
      highlight: "#2986d4", //Highlight
    },
    secondary: {
      main: "#109612", //Green
    },
    third: {
      main: "#dc004e", //Red
    },
    background: {
      default: "#f4f4f4", // Default background color (White)
      highlight: "#f8f8f8",
    },
    text: {
      primary: "#333", // Primary text color
    },
  },
});

const tickets = [
  {
    id: 1,
    date: "09/05/2024, 10:07",
    username: "Andy",
    title: "Test Ticket_1",
    category: "Billing",
    description: "Here you can describe your reason for sending a ticket",
    priority: "Normal",
  },
  {
    id: 2,
    date: "09/05/2024, 11:07",
    username: "John",
    title: "Test Ticket_2",
    category: "Technical issue",
    description: "Here you can describe your reason for sending a ticket",
    priority: "High",
  },
];

function TicketSystem() {
  const [currentView, setCurrentView] = useState(false);
  const [selected, setSelected] = useState("About");
  const [myTickets, setMyTickets] = useState(tickets);
  const [editingTicket, setEditingTicket] = useState(0);

  const changeView = (v) => {
    setSelected("");
    setCurrentView(!currentView);
  };

  const openContent = (event) => {
    const data = event.currentTarget.dataset.value;
    setSelected(data);
    setEditingTicket(0);
  };

  const addTicket = (ticket) => {
    if (ticket) {
      setMyTickets((prevTickets) => {
        let updated = false;
        const newTickets = prevTickets.map((prevTicket) => {
          if (prevTicket.id === ticket.id) {
            updated = true;
            return { ...prevTicket, ...ticket };
          } else {
            return prevTicket;
          }
        });

        if (!updated) {
          newTickets.push(ticket);
        }

        return newTickets;
      });

      setSelected("My Tickets");
    }
  };

  const editTicket = (ticket) => {
    if (ticket) {
      setEditingTicket(ticket);
      setSelected("New Ticket");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar
        view={currentView}
        toggleView={changeView}
        openContent={openContent}
      ></Navbar>
      <Container
        maxWidth="fullWidth"
        sx={{
          marginTop: 4,
        }}
      >
        {selected === "About" && <About />}
        {selected === "New Ticket" && (
          <NewTicket
            username={currentView ? "Admin" : "User1234"}
            addTicket={addTicket}
            ticket={editingTicket ? editingTicket : false}
          />
        )}
        {selected === "My Tickets" && (
          <MyTickets
            tickets={myTickets}
            username={currentView ? "Admin" : "User1234"}
            editTicket={editTicket}
          />
        )}
        <footer id="footer">
          © Samuli Kalliomäki
          <br />
          Made with React and Material UI
        </footer>
      </Container>
    </ThemeProvider>
  );
}

export default TicketSystem;
