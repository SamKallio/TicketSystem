import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Options from "./Options";
import { ActionTypes } from "./TicketSystem";

function Navbar({ view, dispatch }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Options view={view} dispatch={dispatch} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ticket System
          </Typography>
          {view === "DefaultUser" ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                dispatch({
                  type: ActionTypes.SET_CURRENT_USER,
                  payload: "Admin",
                })
              }
            >
              Client View
            </Button>
          ) : (
            <Button
              variant="contained"
              color="third"
              onClick={() =>
                dispatch({
                  type: ActionTypes.SET_CURRENT_USER,
                  payload: "DefaultUser",
                })
              }
            >
              Admin View
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
