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
  const [openModal, setOpenModal] = useState(false);
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        borderRadius: 2,
        boxShadow: 2,
        padding: 3,
        gap: 1.75,
        maxWidth: "fit-content",
        minWidth: 260,
        display: "flex",
        flexDirection: "column",
        margin: 1,
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
          justifyContent: "center",
        }}
      >
        <TicketModal
          ticket={currentTicket}
          dispatch={dispatch}
          currentUser={currentUser}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <Button
          onClick={() => setOpenModal(true)}
          sx={{ ...btnStyle, border: "1px solid black" }}
        >
          Open Ticket
        </Button>
        <Button
          sx={{
            ...btnStyle,
            backgroundColor: "primary.main",
            border: "1px solid black",
          }}
          onClick={() =>
            dispatch({
              type: ActionTypes.EDITING_TICKET,
              payload: currentTicket,
            })
          }
        >
          Edit Ticket
        </Button>
        {currentTicket.state !== ticketState[2] && (
          <Button
            sx={{
              ...btnStyle,
              backgroundColor: "third.main",
              border: "1px solid black",
            }}
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
