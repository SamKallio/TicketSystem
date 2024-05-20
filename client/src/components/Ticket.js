import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ActionTypes } from "./TicketSystem";
import { ticketState } from "../models/TicketModel";
import ViewTicket from "./ViewTicket";
import { btnStyle } from "../models/StyleModel";

function Ticket({ ticket, dispatch, username }) {
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            ml: 1,
          }}
        >
          <ViewTicket
            ticket={currentTicket}
            dispatch={dispatch}
            username={username}
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
    </>
  );
}

export default Ticket;
