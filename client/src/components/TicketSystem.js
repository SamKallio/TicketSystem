import React from "react";
import { useReducer } from "react";
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

export const ActionTypes = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SELECT_OPTION: "SELECT_OPTION",
  EDITING_TICKET: "EDITING_TICKET",
  GET_MY_TICKETS: "GET_MY_TICKETS",
  ADD_TICKET: "ADD_TICKET",
  DELETE_TICKET: "DELETE_TICKET",
  EDIT_TICKET: "EDIT_TICKET",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload, selectedOption: "About" };
    case ActionTypes.SELECT_OPTION:
      return { ...state, selectedOption: action.payload, editingTicket: false };
    case ActionTypes.EDITING_TICKET:
      return {
        ...state,
        editingTicket: action.payload,
        selectedOption: "New Ticket",
      };
    case ActionTypes.GET_MY_TICKETS: //Add fetch here
      return state;
    case ActionTypes.ADD_TICKET:
      return {
        ...state,
        myTickets: [...state.myTickets, action.payload],
        selectedOption: "My Tickets",
      };
    case ActionTypes.EDIT_TICKET:
      const index = state.myTickets.findIndex(
        (ticket) => ticket.id === action.payload.id
      );

      if (index !== -1) {
        const updatedTickets = [...state.myTickets];
        updatedTickets[index] = { ...updatedTickets[index], ...action.payload };

        return { ...state, myTickets: updatedTickets };
      }

      return state;
    case ActionTypes.DELETE_TICKET:
      const updatedTickets = state.myTickets.filter(
        (ticket) => ticket.id !== action.payload.id
      );
      return {
        ...state,
        myTickets: updatedTickets,
      };
    default:
      return state;
  }
};

const initState = {
  currentUser: "DefaultUser",
  selectedOption: "About",
  editingTicket: false,
  myTickets: [
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
      id: 4,
      date: "13/05/2024, 15:37",
      username: "DefaultUser",
      title: "Protected Ticket",
      category: "Account",
      description: "This ticket is marked as Protected and cannot be modified",
      priority: 0,
      state: "Protected",
    },
  ],
};

function TicketSystem() {
  const [systemState, dispatch] = useReducer(reducer, initState);

  return (
    <ThemeProvider theme={theme}>
      <Navbar view={systemState.currentUser} dispatch={dispatch}></Navbar>
      <Container
        maxWidth="fullWidth"
        sx={{
          marginTop: 4,
        }}
      >
        {systemState.selectedOption === "About" && <About />}
        {systemState.selectedOption === "Tickets" && (
          <ViewAllTickets tickets={systemState.myTickets} />
        )}
        {systemState.selectedOption === "New Ticket" && (
          <NewTicket
            username={systemState.currentUser}
            dispatch={dispatch}
            ticket={
              systemState.editingTicket ? systemState.editingTicket : false
            }
          />
        )}
        {systemState.selectedOption === "My Tickets" && (
          <MyTickets ticketData={systemState.myTickets} dispatch={dispatch} />
        )}
        <footer id="footer">
          © Samuli Kalliomäki
          <br />
          Made with React, Material UI and ExpressJS
        </footer>
      </Container>
    </ThemeProvider>
  );
}

export default TicketSystem;
