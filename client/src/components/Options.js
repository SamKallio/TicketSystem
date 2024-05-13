import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { userSections } from "../models/TicketModel";

export default function Options({ view, openContent }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      {view === "DefaultUser" ? (
        <div style={{ margin: "8px", padding: "4px" }}>
          <List>
            <h2>Client View</h2>
            <Divider />
            {userSections.USER.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={openContent} data-value={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      ) : (
        <div style={{ margin: "6px", padding: "4px" }}>
          <h2>Admin View</h2>
          <Divider />
          <List>
            {userSections.ADMIN.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={openContent} data-value={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      )}
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
