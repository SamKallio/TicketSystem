import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewTicket from "./NewTicket";
import MyTickets from "./MyTickets";
import Container from "@mui/material/Container";
import About from "./About";
import ViewAllTickets from "./ViewAllTickets";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", //Blue
      highlight: "#4298d9", //Highlight
    },
    secondary: {
      main: "#109612", //Green
    },
    third: {
      main: "#dc001e", //Red
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

const allTickets = [
  {
    id: 1,
    date: "09/05/2024, 10:35",
    username: "Andy",
    title: "Test Ticket_1",
    category: "Billing",
    description: "This ticket is marked as Protected and cannot be modified",
    priority: 2,
    state: "Protected",
  },
  {
    id: 2,
    date: "09/05/2024, 11:01",
    username: "John",
    title: "Protected Ticket",
    category: "Technical issue",
    description: "This ticket is marked as Protected and cannot be modified",
    priority: 1,
    state: "Protected",
  },
  {
    id: 3,
    date: "13/05/2024, 13:02",
    username: "David",
    title: "Protected Ticket",
    category: "Account",
    description: "This ticket is marked as Protected and cannot be modified",
    priority: 0,
    state: "Protected",
  },
  {
    id: 3,
    date: "13/05/2024, 15:37",
    username: "DefaultUser",
    title: "Protected Ticket",
    category: "Account",
    description: "This ticket is marked as Protected and cannot be modified",
    priority: 0,
    state: "Protected",
  },
];

function TicketSystem() {
  const [currentUser, setCurrentUser] = useState("DefaultUser");
  const [selectedOption, setSelectedOption] = useState("About");
  const [myTickets, setMyTickets] = useState(allTickets);
  const [editingTicket, setEditingTicket] = useState(0);

  const toggleView = (v) => {
    setSelectedOption("");
    setCurrentUser(v);
  };

  const openContent = (event) => {
    const data = event.currentTarget.dataset.value;
    setSelectedOption(data);
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

      setSelectedOption("My Tickets");
    }
  };

  const editTicket = (ticket) => {
    if (ticket) {
      setEditingTicket(ticket);
      setSelectedOption("New Ticket");
    }
  };

  const deleteTicket = (ticket) => {
    if (ticket) {
      const updatedTickets = myTickets.filter(
        (oldTicket) => oldTicket.id !== ticket.id
      );
      setMyTickets(updatedTickets);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar
        view={currentUser}
        toggleView={toggleView}
        openContent={openContent}
      ></Navbar>
      <Container
        maxWidth="fullWidth"
        sx={{
          marginTop: 4,
        }}
      >
        {selectedOption === "About" && <About />}
        {selectedOption === "Tickets" && (
          <ViewAllTickets tickets={allTickets} />
        )}
        {selectedOption === "New Ticket" && (
          <NewTicket
            username={currentUser}
            addTicket={addTicket}
            ticket={editingTicket ? editingTicket : false}
          />
        )}
        {selectedOption === "My Tickets" && (
          <MyTickets
            tickets={myTickets}
            username={currentUser}
            editTicket={editTicket}
            deleteTicket={deleteTicket}
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
