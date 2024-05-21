import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ActionTypes } from "./TicketSystem";
import { ticketState } from "../models/TicketModel";
import TicketModal from "./TicketModal";
import { btnStyle } from "../models/StyleModel";

function Ticket({ ticket, dispatch, currentUser }) {
  const [currentTicket, setCurrentTicket] = useState(ticket);
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        borderRadius: 2,
        boxShadow: 2,
        padding: 2,
        gap: 1.75,
        width: 260,
        minWidth: 200,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        "&:hover": {
          bgcolor: "background.highlight",
        },
      }}
    >
      <TextField
        id="standard-basic"
        label="Title"
        value={currentTicket.title}
        onChange={(e) =>
          setCurrentTicket({ ...currentTicket, title: e.target.value })
        }
        disabled
      />
      <TextField
        id="outlined-basic"
        label="Category"
        value={currentTicket.category}
        onChange={(e) =>
          setCurrentTicket({ ...currentTicket, category: e.target.value })
        }
        disabled
      />
      <TextField
        id="standard-multiline-flexible"
        label="Description"
        multiline
        maxRows={4}
        value={currentTicket.description}
        onChange={(e) =>
          setCurrentTicket({ ...currentTicket, description: e.target.value })
        }
        disabled
      />

      <span>Date: {currentTicket.date}</span>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TicketModal
          ticket={currentTicket}
          dispatch={dispatch}
          currentUser={currentUser}
        />
        <Button
          sx={{ ...btnStyle, backgroundColor: "primary.main" }}
          onClick={() =>
            dispatch({
              type: ActionTypes.EDITING_TICKET,
              payload: currentTicket,
            })
          }
        >
          Edit Ticket
        </Button>
        {currentTicket.state === ticketState.PROTECTED && (
          <Button
            sx={{ ...btnStyle, backgroundColor: "third.main" }}
            onClick={() =>
              dispatch({
                type: ActionTypes.DELETE_TICKET,
                payload: currentTicket,
              })
            }
          >
            Delete Ticket
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Ticket;
