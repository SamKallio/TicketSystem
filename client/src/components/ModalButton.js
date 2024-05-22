import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { ActionTypes } from "./TicketSystem";
import { priorityOptions } from "../models/TicketModel";

export default function ModalButton({
  dispatch,
  ticketId,
  currentValue,
  options,
  header,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(currentValue);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, value, index) => {
    if (header) {
      setSelected(value);
      setAnchorEl(null);

      const field = header.toLowerCase();

      dispatch({
        type: ActionTypes.UPDATE_FIELD,
        payload: {
          id: ticketId,
          value: field === "priority" ? index : value,
          fieldName: field,
        },
      });
    }
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
          borderRadius: 4,
          border: "2px solid green",
          padding: 0,
          maxWidth: "100px",
          maxHeight: "70px",
          boxShadow: 2,
        }}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label={header}
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
          disabled={currentValue === "Protected"}
        >
          <ListItemText
            primary={header + ":" || ""}
            secondary={priorityOptions[selected] || selected || "-"}
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
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={option === selected}
            onClick={(event) => handleMenuItemClick(event, option, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
