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
import Tickets from "../../src/SampleTickets.json";

export const ActionTypes = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SELECT_OPTION: "SELECT_OPTION",
  EDITING_TICKET: "EDITING_TICKET",
  ADD_TICKET: "ADD_TICKET",
  DELETE_TICKET: "DELETE_TICKET",
  EDIT_TICKET: "EDIT_TICKET",
  SEND_COMMENT: "SEND_COMMENT",
  UPDATE_FIELD: "UPDATE_FIELD",
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
    case ActionTypes.UPDATE_FIELD:
      return {
        ...state,
        myTickets:
          findAndUpdateTicket(
            state.myTickets,
            action.payload,
            (ticket, payload) => {
              return { ...ticket, [payload.fieldName]: payload.value };
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
  myTickets: Tickets,
};

//Conditional rendering of components, but should use Routing if this was a real project. For this scope and purpose its "ok".
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
