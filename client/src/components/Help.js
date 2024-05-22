import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { divStyle } from "../models/StyleModel";

export default function Help() {
  return (
    <Box
      sx={{
        maxWidth: "70vw",
        margin: "auto",
        mb: 5,
      }}
    >
      <Divider textAlign="left" sx={divStyle}>
        <Typography variant="h6">How to create a Ticket?</Typography>
      </Divider>
      <br />
      <Typography variant="body1" sx={{ mt: 1 }}>
        1. Click the Menu Icon located on the Top left and select
        <b>"New Ticket"</b>
        <br />
        <br />
        2. Fill the Required fields and try to explain how to reproduce your
        issue or bug
        <br />
        <br />
        3. Press <b>"Submit"</b> to send your ticket
      </Typography>
      <Divider textAlign="left" sx={divStyle}>
        <Typography variant="h6">How to edit my Ticket?</Typography>
      </Divider>
      <br />
      <Typography variant="body1" sx={{ mt: 1 }}>
        1. Click the Menu Icon located on the Top left and select
        <b>"My Tickets"</b>
        <br />
        <br />
        2. Locate your ticket and press <b>"Edit ticket"</b>
        <br />
        <br />
        3. Once you are done with changes and press <b>"Submit"</b>
      </Typography>
      <Divider textAlign="left" sx={divStyle}>
        <Typography variant="h6">How to view my Ticket?</Typography>
      </Divider>
      <br />
      <Typography variant="body1" sx={{ mt: 1 }}>
        1. Click the Menu Icon located on the Top left and select "My Tickets"
        <br />
        <br />
        2. Locate your ticket and press <b>"Open Ticket"</b>
      </Typography>
    </Box>
  );
}
