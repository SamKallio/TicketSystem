import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { ActionTypes } from "./TicketSystem";

const supportUsers = ["Admin", "Support Dave", "Support Andy"];

export default function AssignMenu({ dispatch, ticketId, assignedUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(assignedUser);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, user) => {
    setSelectedUser(user);
    setAnchorEl(null);

    dispatch({
      type: ActionTypes.ASSIGN_TICKET,
      payload: {
        id: ticketId,
        assignedUser: user,
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
          bgcolor: "primary.highlight",
          borderRadius: 2,
          padding: 0,
          maxWidth: "180px",
          maxHeight: "90px",
          boxShadow: 1,
        }}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Assigned to"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Assigned to:"
            secondary={selectedUser || "-"}
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
        {supportUsers.map((option, index) => (
          <MenuItem
            key={option}
            selected={option === selectedUser}
            onClick={(event) => handleMenuItemClick(event, option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
