import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Options from "./Options";
import { ActionTypes } from "./TicketSystem";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { btnStyle } from "../models/StyleModel";

function Navbar({ accessLevel, dispatch }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Options accessLevel={accessLevel} dispatch={dispatch} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ticket System
          </Typography>
          <ArrowCircleRightIcon sx={{ mr: 2, mt: 1 }} />
          {accessLevel === 0 ? (
            <Button
              sx={{ ...btnStyle, backgroundColor: "secondary.main" }}
              onClick={() =>
                dispatch({
                  type: ActionTypes.SET_CURRENT_USER,
                  payload: { name: "Admin", accessLevel: 1 },
                })
              }
            >
              Client View
            </Button>
          ) : (
            <Button
              sx={{ ...btnStyle, backgroundColor: "third.main" }}
              onClick={() =>
                dispatch({
                  type: ActionTypes.SET_CURRENT_USER,
                  payload: { name: "DefaultUser", accessLevel: 0 },
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
