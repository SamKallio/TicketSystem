import * as React from "react";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { categories } from "../models/TicketModel";
import TicketTable from "./TicketTable";
import ViewTicket from "./ViewTicket";
import { ActionTypes } from "./TicketSystem";
import { ticketState } from "../models/TicketModel";

const btnStyle = {
  margin: "4px",
  color: "white",
  borderRadius: "4px",
  boxShadow: 1,
  backgroundColor: "primary.highlight",
  "&:hover": {
    bgcolor: "background.highlight",
    color: "black",
  },
  "&.Mui-selected": {
    bgcolor: "background.highlight",
    color: "black",
  },
};

function ViewAllTickets({ tickets, dispatch }) {
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [currentTickets, setCurrentTickets] = useState(
    tickets.filter((ticket) => ticket.category === currentCategory)
  );

  const showButton = (params) => {
    if (params.value === true) setSelected(null);
    else
      setSelected((prevSelected) =>
        prevSelected && prevSelected.id === params.row.id ? null : params.row
      );
  };

  const changeCategory = (event, newCategory) => {
    setCurrentCategory(newCategory);
    setCurrentTickets(
      tickets.filter((ticket) => ticket.category === newCategory)
    );
    setSelected(null);
  };

  const deleteTicket = () => {
    if (selected && selected.state !== ticketState.PROTECTED) {
      dispatch({ type: ActionTypes.DELETE_TICKET, payload: selected });
      setCurrentTickets(
        tickets.filter(
          (ticket) =>
            ticket.category === currentCategory && ticket.id !== selected.id
        )
      );
      setSelected(null);
    }
  };

  return (
    <>
      {selected && (
        <ViewTicket
          open={openModal}
          setModal={setOpenModal}
          ticket={selected}
        />
      )}
      <Box
        sx={{
          margin: "auto",
          maxWidth: { xs: 320, sm: 480, md: 560 },
          borderRadius: "4px",
          padding: "10px",
        }}
      >
        <Tabs
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          value={currentCategory}
          onChange={changeCategory}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          {categories.map((v, index) => (
            <Tab sx={btnStyle} value={v} label={v} key={index} />
          ))}
        </Tabs>
      </Box>
      <TicketTable
        rows={currentTickets}
        selected={selected}
        setSelected={setSelected}
        showButton={showButton}
      />
      {selected ? (
        <Box mt={2}>
          <Button
            onClick={() => setOpenModal(true)}
            sx={{ ...btnStyle, backgroundColor: "secondary.main" }}
          >
            Reply
          </Button>
          <Button onClick={() => setOpenModal(true)} sx={btnStyle}>
            Assign
          </Button>
          <Button onClick={() => setOpenModal(true)} sx={btnStyle}>
            View
          </Button>
          <Button
            onClick={() => deleteTicket()}
            sx={{
              ...btnStyle,
              backgroundColor:
                selected.state === ticketState.PROTECTED
                  ? "grey"
                  : "third.main",
            }}
            disabled={selected.state === ticketState.PROTECTED}
          >
            Delete
          </Button>
        </Box>
      ) : (
        <p></p>
      )}
    </>
  );
}

export default ViewAllTickets;
