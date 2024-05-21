import React from "react";
import { useReducer } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { theme } from "../models/StyleModel";
import Footer from "./Footer";
import Help from "./Help";
import Navbar from "./Navbar";
import About from "./About";
import NewTicket from "./NewTicket";
import MyTickets from "./MyTickets";
import ViewTickets from "./ViewTickets";

export const ActionTypes = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SELECT_OPTION: "SELECT_OPTION",
  EDITING_TICKET: "EDITING_TICKET",
  GET_MY_TICKETS: "GET_MY_TICKETS",
  ADD_TICKET: "ADD_TICKET",
  DELETE_TICKET: "DELETE_TICKET",
  EDIT_TICKET: "EDIT_TICKET",
  SEND_COMMENT: "SEND_COMMENT",
  UPDATE_STATE: "UPDATE_STATE",
  ASSIGN_TICKET: "ASSIGN_TICKET",
};

const findAndUpdateTicket = (tickets, payload, updateFn) => {
  const index = tickets.findIndex((ticket) => ticket.id === payload.id);
  if (index !== -1) {
    const updatedTickets = [...tickets];
    updatedTickets[index] = updateFn(updatedTickets[index], payload);
    return updatedTickets;
  }
  return null;
};

const addOrUpdateTicket = (tickets, payload) => {
  const updatedTickets = findAndUpdateTicket(
    tickets,
    payload,
    (ticket, payload) => {
      return { ...ticket, ...payload };
    }
  );

  if (updatedTickets) {
    return updatedTickets;
  } else {
    return [...tickets, payload];
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload, selectedOption: "About" };

    case ActionTypes.SELECT_OPTION:
      return { ...state, selectedOption: action.payload, editingTicket: null };

    case ActionTypes.EDITING_TICKET:
      return {
        ...state,
        editingTicket: action.payload,
        selectedOption: "New Ticket",
      };

    case ActionTypes.GET_MY_TICKETS: // Add fetch logic here if needed
      return state;

    case ActionTypes.ADD_TICKET:
      return {
        ...state,
        myTickets: addOrUpdateTicket(state.myTickets, action.payload),
        selectedOption: "My Tickets",
      };

    case ActionTypes.DELETE_TICKET:
      return {
        ...state,
        myTickets: state.myTickets.filter(
          (ticket) => ticket.id !== action.payload.id
        ),
      };

    case ActionTypes.SEND_COMMENT:
      return {
        ...state,
        myTickets:
          findAndUpdateTicket(
            state.myTickets,
            action.payload,
            (ticket, payload) => {
              return {
                ...ticket,
                comments: [...ticket.comments, payload.comment],
              };
            }
          ) || state.myTickets,
      };

    case ActionTypes.ASSIGN_TICKET:
      return {
        ...state,
        myTickets:
          findAndUpdateTicket(
            state.myTickets,
            action.payload,
            (ticket, payload) => {
              return { ...ticket, assigned: payload.assignedUser };
            }
          ) || state.myTickets,
      };
    case ActionTypes.UPDATE_STATE:
      return {
        ...state,
        myTickets:
          findAndUpdateTicket(
            state.myTickets,
            action.payload,
            (ticket, payload) => {
              return { ...ticket, state: payload.state };
            }
          ) || state.myTickets,
      };
    default:
      return state;
  }
};

const initState = {
  currentUser: { name: "DefaultUser", accessLevel: 0 },
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
      priority: 3,
      state: "Protected",
      assigned: "Admin",
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
      priority: 2,
      state: "Protected",
      assigned: "-",
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
      priority: 1,
      state: "Protected",
      assigned: "-",
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
      priority: 0,
      state: "Protected",
      assigned: "-",
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
      priority: 1,
      state: "Protected",
      assigned: "-",
      comments: [],
    },
  ],
};

function TicketSystem() {
  const [systemState, dispatch] = useReducer(reducer, initState);

  return (
    <ThemeProvider theme={theme}>
      <Navbar
        accessLevel={systemState.currentUser.accessLevel}
        dispatch={dispatch}
      ></Navbar>
      <Container maxWidth="fullWidth">
        <Typography sx={{ textAlign: "center", mt: 3, mb: 2 }} variant="h5">
          {systemState.selectedOption === "New Ticket" &&
          systemState.editingTicket
            ? "Edit Ticket"
            : systemState.selectedOption}
        </Typography>
        {systemState.selectedOption === "About" && <About />}
        {systemState.selectedOption === "Help" && <Help />}
        {systemState.selectedOption === "Tickets" && (
          <ViewTickets
            tickets={systemState.myTickets}
            dispatch={dispatch}
            currentUser={systemState.currentUser}
          />
        )}
        {systemState.selectedOption === "New Ticket" && (
          <NewTicket
            username={systemState.currentUser.name}
            dispatch={dispatch}
            editTicket={systemState.editingTicket}
          />
        )}
        {systemState.selectedOption === "My Tickets" && (
          <MyTickets
            ticketData={systemState.myTickets.filter(
              (ticket) => ticket.username === systemState.currentUser.name
            )}
            dispatch={dispatch}
            currentUser={systemState.currentUser}
          />
        )}
        {systemState.selectedOption === "Assigned" && (
          <ViewTickets
            tickets={systemState.myTickets.filter(
              (ticket) => ticket.assigned === systemState.currentUser.name
            )}
            dispatch={dispatch}
            currentUser={systemState.currentUser}
          />
        )}
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default TicketSystem;
