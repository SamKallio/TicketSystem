import React from "react";
import Ticket from "./Ticket";
import Grid from "@mui/material/Unstable_Grid2";

function MyTickets({ tickets, username, editTicket, deleteTicket }) {
  const currentTickets = tickets.filter(
    (ticket) => ticket.username === username
  );

  return (
    <>
      <h2 className="headers" style={{ textAlign: "center" }}>
        My Tickets
      </h2>
      <Grid
        sx={{ flexGrow: 1, maxWidth: "100%" }}
        margin="auto"
        container
        justifyContent="center"
        spacing={8}
      >
        {currentTickets.length > 0 ? (
          currentTickets.map((ticket, index) => (
            <Grid xs={2.5} key={index}>
              <Ticket
                ticket={ticket}
                editTicket={editTicket}
                deleteTicket={deleteTicket}
              />
            </Grid>
          ))
        ) : (
          <p>No tickets</p>
        )}
      </Grid>
    </>
  );
}

export default MyTickets;
