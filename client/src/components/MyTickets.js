import React from "react";
import Ticket from "./Ticket";
import Grid from "@mui/material/Unstable_Grid2";

function MyTickets({ tickets, username, editTicket }) {
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
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <Grid xs={2.5} key={index}>
              <Ticket
                ticket={ticket}
                username={username}
                editTicket={editTicket}
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
