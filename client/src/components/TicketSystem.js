import React from "react";
import { useReducer } from "react";
import Navbar from "./Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewTicket from "./NewTicket";
import MyTickets from "./MyTickets";
import Container from "@mui/material/Container";
import About from "./About";
import ViewAllTickets from "./ViewAllTickets";
import { ticketPriority } from "../models/TicketModel";

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
      darker: "#f1f1f1", // Darker
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
  SEND_COMMENT: "SEND_COMMENT",
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
      const index = state.myTickets.findIndex(
        (ticket) => ticket.id === action.payload.id
      );

      //If we find existing ticket, edit it instead
      if (index !== -1) {
        const updatedTickets = [...state.myTickets];
        updatedTickets[index] = { ...updatedTickets[index], ...action.payload };

        return {
          ...state,
          myTickets: updatedTickets,
          selectedOption: "My Tickets",
        };
      }
      //Else just add ticket
      return {
        ...state,
        myTickets: [...state.myTickets, action.payload],
        selectedOption: "My Tickets",
      };
    case ActionTypes.DELETE_TICKET:
      const updatedTickets = state.myTickets.filter(
        (ticket) => ticket.id !== action.payload.id
      );
      return {
        ...state,
        myTickets: updatedTickets,
      };
    case ActionTypes.SEND_COMMENT:
      const ix = state.myTickets.findIndex(
        (ticket) => ticket.id === action.payload.id
      );

      //If we find existing ticket, edit it
      if (ix !== -1) {
        const updatedTickets = [...state.myTickets];
        const existingTicket = updatedTickets[ix];

        const updatedComments = [...existingTicket.comments];

        // Add new comment
        updatedComments.push(action.payload.comment);

        updatedTickets[ix] = {
          ...existingTicket,
          ...action.payload,
          comments: updatedComments,
        };

        return {
          ...state,
          myTickets: updatedTickets,
        };
      }
      break;
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
      title: "My credit card didn't work?",
      category: "Billing",
      description: "This ticket is marked as Protected and cannot be deleted",
      priority: ticketPriority.MEDIUM,
      state: "Protected",
      assigned: "",
      comments: [
        {
          id: 1,
          content: "I forgot to mention that I have Visa Electron",
          username: "Andy",
          date: "12/05/2024, 11:42",
        },
      ],
    },
    {
      id: 2,
      date: "09/05/2024, 11:01",
      username: "John",
      title: "My browser crashes whenever I try to log in",
      category: "Technical issue",
      description: "This ticket is marked as Protected and cannot be deleted",
      priority: ticketPriority.LOW,
      state: "Protected",
      assigned: "",
      comments: [
        {
          id: 1,
          content: "Any ideas??",
          username: "John",
          date: "11/05/2024, 16:42",
        },
      ],
    },
    {
      id: 3,
      date: "13/05/2024, 13:02",
      username: "David",
      title: "Can I somehow change my account name?",
      category: "Account",
      description: "This ticket is marked as Protected and cannot be deleted",
      priority: ticketPriority.VERYLOW,
      state: "Protected",
      assigned: "",
      comments: [
        {
          id: 1,
          content:
            "Sorry for being pesky, but how long does this process take?",
          username: "David",
          date: "15/05/2024, 18:28",
        },
      ],
    },
    {
      id: 4,
      date: "13/05/2024, 15:37",
      username: "DefaultUser",
      title: "Not sure where this belongs, but..",
      category: "Other",
      description: "This ticket is marked as Protected and cannot be deleted",
      priority: ticketPriority.VERYLOW,
      state: "Protected",
      assigned: "",
      comments: [],
    },
    {
      id: 6,
      date: "16/05/2024, 17:37",
      username: "Admin",
      title: "Internal Ticket Example",
      category: "Technical issue",
      description:
        "Hey our computer is not working properly in sales department. Could you come to take look at it? I think it is the HDMI cable or something to that related.",
      priority: ticketPriority.HIGH,
      state: "Protected",
      assigned: "",
      comments: [],
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
          <ViewAllTickets
            tickets={systemState.myTickets}
            dispatch={dispatch}
            username={systemState.currentUser}
          />
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
          <MyTickets
            ticketData={systemState.myTickets.filter(
              (ticket) => ticket.username === systemState.currentUser
            )}
            dispatch={dispatch}
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
