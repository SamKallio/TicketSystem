import * as React from "react";
import { useState } from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import TicketTable from "./TicketTable";
import TicketModal from "./TicketModal";
import { ActionTypes } from "./TicketSystem";
import { ticketState, categories } from "../models/TicketModel";
import { btnStyle, tabStyle } from "../models/StyleModel";

function ViewTickets({ tickets, dispatch, currentUser }) {
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  const currentTickets = tickets.filter(
    (ticket) => ticket.category === currentCategory
  );

  const changeCategory = (event, newCategory) => {
    setCurrentCategory(newCategory);
    setSelected(null);
  };

  const deleteTicket = () => {
    if (selected && selected.state !== ticketState.PROTECTED) {
      dispatch({ type: ActionTypes.DELETE_TICKET, payload: selected });
      setSelected(null);
    }
  };

  return (
    <Box
      sx={{
        margin: "auto",
        maxWidth: "95%",
      }}
    >
      {selected && openModal && (
        <TicketModal
          ticket={selected}
          dispatch={dispatch}
          currentUser={currentUser}
          setOpenModal={setOpenModal}
        />
      )}
      <Tabs
        sx={{ width: "100%", margin: "auto" }}
        value={currentCategory}
        onChange={changeCategory}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {categories.map((v, index) => (
          <Tab sx={tabStyle} value={v} label={v} key={index} />
        ))}
      </Tabs>
      <TicketTable rows={currentTickets} setSelected={setSelected} />
      {selected ? (
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Button
            onClick={() => setOpenModal(true)}
            sx={{ ...btnStyle, border: "1px solid black" }}
          >
            Open Ticket
          </Button>
          <Button
            onClick={() => deleteTicket()}
            sx={{
              ...btnStyle,
              bgcolor: "third.main",
              border: "1px solid black",
            }}
            disabled={selected.state === ticketState[2]}
          >
            Delete
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default ViewTickets;
