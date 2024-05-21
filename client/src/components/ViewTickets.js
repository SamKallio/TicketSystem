import * as React from "react";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TicketTable from "./TicketTable";
import TicketModal from "./TicketModal";
import { ActionTypes } from "./TicketSystem";
import { ticketState, categories } from "../models/TicketModel";
import { btnStyle } from "../models/StyleModel";

function ViewTickets({ tickets, dispatch, currentUser }) {
  const [selected, setSelected] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  const currentTickets = tickets.filter(
    (ticket) => ticket.category === currentCategory
  );

  const showButton = (params) => {
    if (!params) {
      setSelected(null);
      return;
    }
    if (params.value === true) setSelected(null);
    else
      setSelected((prevSelected) =>
        prevSelected && prevSelected.id === params.row.id ? null : params.row
      );
  };

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
        maxWidth: "85%",
      }}
    >
      <Tabs
        value={currentCategory}
        onChange={changeCategory}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {categories.map((v, index) => (
          <Tab
            sx={{
              ...btnStyle,
              backgroundColor: "primary.highlight",
              margin: 1,
            }}
            value={v}
            label={v}
            key={index}
          />
        ))}
      </Tabs>
      <TicketTable rows={currentTickets} showButton={showButton} />
      {selected ? (
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          {selected && (
            <TicketModal
              ticket={selected}
              dispatch={dispatch}
              currentUser={currentUser}
            />
          )}
          {selected.state === ticketState.PROTECTED && (
            <Button
              onClick={() => deleteTicket()}
              sx={{ ...btnStyle, bgcolor: "third.main" }}
            >
              Delete
            </Button>
          )}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default ViewTickets;
