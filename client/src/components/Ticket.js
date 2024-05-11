import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Ticket({ ticket, editTicket }) {
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
        <p>{ticket.id}</p>
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          InputLabelProps={{
            style: { color: "black" },
          }}
          value={ticket.title}
          disabled
        />
        <TextField
          id="outlined-basic"
          label="Category"
          variant="outlined"
          InputLabelProps={{
            style: { color: "black" },
          }}
          value={ticket.category}
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
          value={ticket.description}
          disabled
        />

        <p>Date: {ticket.date}</p>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => editTicket(ticket)}
        >
          Edit Ticket
        </Button>
      </Box>
    </>
  );
}

export default Ticket;
