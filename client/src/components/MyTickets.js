import React from "react";
import Ticket from "./Ticket";
import { useState } from "react";
import TicketModal from "./TicketModal";
import { Box, useMediaQuery, useTheme } from "@mui/material";

function MyTickets({ ticketData, dispatch, currentUser }) {
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(false);

  const openTicket = (ticket) => {
    setSelected(ticket);
    setOpenModal(true);
  };

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
      {openModal && selected && (
        <TicketModal
          ticket={selected}
          dispatch={dispatch}
          currentUser={currentUser}
          setOpenModal={setOpenModal}
        />
      )}
      {ticketData.length > 0 ? (
        ticketData.map((ticket, index) => (
          <Ticket
            key={ticket.comments + index}
            ticket={ticket}
            dispatch={dispatch}
            openTicket={openTicket}
          />
        ))
      ) : (
        <p>No tickets</p>
      )}
    </Box>
  );
}

export default MyTickets;
