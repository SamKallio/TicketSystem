import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ActionTypes } from "./TicketSystem";
import { ticketState } from "../models/TicketModel";

function Ticket({ ticket, dispatch }) {
  const [currentTicket, setCurrentTicket] = useState(ticket);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          borderRadius: 2,
          boxShadow: 2,
          textAlign: "center",
          "&:hover": {
            bgcolor: "background.highlight",
          },
        }}
        p={2}
        display="flex"
        flexDirection="column"
        gap={2}
        width={250}
      >
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          InputLabelProps={{
            style: { color: "black" },
          }}
          value={currentTicket.title}
          onChange={(e) =>
            setCurrentTicket({ ...currentTicket, title: e.target.value })
          }
          disabled
        />
        <TextField
          id="outlined-basic"
          label="Category"
          variant="outlined"
          InputLabelProps={{
            style: { color: "black" },
          }}
          value={currentTicket.category}
          onChange={(e) =>
            setCurrentTicket({ ...currentTicket, category: e.target.value })
          }
          disabled
        />
        <TextField
          id="standard-multiline-flexible"
          label="Description"
          InputLabelProps={{
            style: { color: "black" },
          }}
          multiline
          maxRows={4}
          value={currentTicket.description}
          onChange={(e) =>
            setCurrentTicket({ ...currentTicket, description: e.target.value })
          }
          disabled
        />

        <p>Date: {currentTicket.date}</p>
        <Button
          color="secondary"
          variant="contained"
          onClick={() =>
            dispatch({
              type: ActionTypes.EDITING_TICKET,
              payload: currentTicket,
            })
          }
        >
          Edit Ticket
        </Button>
        <Button
          color="third"
          variant="contained"
          onClick={() =>
            dispatch({
              type: ActionTypes.DELETE_TICKET,
              payload: currentTicket,
            })
          }
          disabled={
            currentTicket.state === ticketState.PROTECTED ? true : false
          }
        >
          Delete Ticket
        </Button>
      </Box>
    </>
  );
}

export default Ticket;
