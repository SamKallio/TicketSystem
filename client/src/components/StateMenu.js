import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { ActionTypes } from "./TicketSystem";
import { ticketState } from "../models/TicketModel";

export default function StateMenu({ dispatch, ticketId, currentState }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedState, setSelectedState] = React.useState(currentState);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, state) => {
    setSelectedState(state);
    setAnchorEl(null);

    dispatch({
      type: ActionTypes.UPDATE_STATE,
      payload: {
        id: ticketId,
        state: state,
      },
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{
          bgcolor: "secondary.main",
          borderRadius: 2,
          padding: 0,
          maxWidth: "180px",
          maxHeight: "90px",
          boxShadow: 1,
        }}
      >
        <ListItemButton
          disabled={currentState === "Protected"}
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Assigned to"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Current State:"
            secondary={selectedState || "-"}
            sx={{
              "& .MuiTypography-root": {
                color: "white",
              },
            }}
          />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {ticketState.map((option, index) => (
          <MenuItem
            key={option}
            selected={option === selectedState}
            onClick={(event) => handleMenuItemClick(event, option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
