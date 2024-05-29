import React from "react";
import Ticket from "./Ticket";
import { Box, useMediaQuery, useTheme } from "@mui/material";

function MyTickets({ ticketData, dispatch, currentUser }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
      }}
    >
      {ticketData.length > 0 ? (
        ticketData.map((ticket, index) => (
          <Ticket
            key={ticket.comments + index}
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
