import { Typography } from "@mui/material";
import React from "react";

function About() {
  return (
    <>
      <Typography
        sx={{
          maxWidth: "800px",
          mb: 5,
          margin: "auto",
          padding: 2,
          fontSize: "18px",
        }}
      >
        This site was built as a demo project for my portfolio. It demonstrates
        the base functionalities of a Ticket System. It can handle basic actions
        such as:
        <li className="aboutList">Create ticket</li>
        <li className="aboutList">Read ticket</li>
        <li className="aboutList">Update ticket</li>
        <li className="aboutList">Delete ticket</li>
        <li className="aboutList">Assign ticket</li>
        <li className="aboutList">Close ticket</li>
        <li className="aboutList">Comment ticket</li>
        Currently it does not have backend to store data, so any changes are
        gone if you refresh the browser. <br />
        Toggle between <b>Admin View </b>
        or <b>Client View</b> in order to see how it works for both sides. For
        example, the Client can only see it's own tickets and Admin can access
        all tickets and do actions on them.
        <br />
        <br />
        Some tickets are marked as <b>"Protected"</b> for demonstration
        purposes.
      </Typography>
    </>
  );
}

export default About;
