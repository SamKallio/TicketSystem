import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Options from "./Options";

function Navbar({ view, toggleView, openContent }) {
  const [menu, setMenu] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Options drawer={menu} view={view} openContent={openContent} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ticket System
          </Typography>
          {!view ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => toggleView()}
            >
              Client View
            </Button>
          ) : (
            <Button
              variant="contained"
              color="third"
              onClick={() => toggleView()}
            >
              Support View
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
