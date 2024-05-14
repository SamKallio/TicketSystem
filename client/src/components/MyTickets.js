import React from "react";
import Ticket from "./Ticket";
import Grid from "@mui/material/Unstable_Grid2";

function MyTickets({ ticketData, dispatch }) {
  return (
    <>
      <h2 className="headers" style={{ textAlign: "center" }}>
        My Tickets
      </h2>
      <Grid
        sx={{
          flexGrow: 1,
          gap: 4,
          margin: 4,
        }}
        margin="auto"
        container
        justifyContent="center"
        spacing={8}
      >
        {ticketData.length > 0 ? (
          ticketData.map((ticket, index) => (
            <Ticket key={index} ticket={ticket} dispatch={dispatch} />
          ))
        ) : (
          <p>No tickets</p>
        )}
      </Grid>
    </>
  );
}

export default MyTickets;
