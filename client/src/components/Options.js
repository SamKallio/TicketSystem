import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import GridViewIcon from "@mui/icons-material/GridView";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { sections } from "../models/TicketModel";
import { ActionTypes } from "./TicketSystem";

export default function Options({ accessLevel, dispatch }) {
  const [open, setOpen] = React.useState(false);

  const filteredSections = sections.filter(
    (value) => value.access <= accessLevel
  );

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const GetIcon = (text) => {
    switch (text) {
      case "New Ticket":
        return <MailIcon />;
      case "My Tickets":
        return <AllInboxIcon />;
      case "About":
        return <InfoIcon />;
      case "Help":
        return <HelpIcon />;
      case "Tickets":
        return <GridViewIcon />;
      case "Assigned":
        return <AssignmentTurnedInIcon />;
      default:
        return <MailIcon />;
    }
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <div style={{ margin: "8px", padding: "4px" }}>
        <List>
          <h2>{accessLevel === 1 ? "Admin View" : "Client View"}</h2>
          <Divider />
          {filteredSections.map((value, index) => (
            <ListItem key={value.name} disablePadding>
              <ListItemButton
                value={value.name}
                onClick={() =>
                  dispatch({
                    type: ActionTypes.SELECT_OPTION,
                    payload: value.name,
                  })
                }
              >
                <ListItemIcon>{GetIcon(value.name)}</ListItemIcon>
                <ListItemText primary={value.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
