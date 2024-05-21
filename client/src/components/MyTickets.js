import React from "react";
import Ticket from "./Ticket";
import Box from "@mui/material/Box";

function MyTickets({ ticketData, dispatch, currentUser }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 4,
        margin: "auto",
      }}
    >
      {ticketData.length > 0 ? (
        ticketData.map((ticket, index) => (
          <Ticket
            key={index}
            ticket={ticket}
            dispatch={dispatch}
            currentUser={currentUser}
          />
        ))
      ) : (
        <p>No tickets</p>
      )}
    </Box>
  );
}

export default MyTickets;
