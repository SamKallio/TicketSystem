import { Typography } from "@mui/material";
import React from "react";

function About() {
  return (
    <>
      <Typography
        sx={{
          maxWidth: "80vw",
          margin: "auto",
          mb: 5,
          padding: 1,
        }}
      >
        This site was built as a demo project for my portfolio. It demonstrates
        the base functionalities of a Ticket System. <br />
        It can handle basic actions such as:
        <li className="aboutList">Create ticket</li>
        <li className="aboutList">Read ticket</li>
        <li className="aboutList">Update ticket</li>
        <li className="aboutList">Delete ticket</li>
        <li className="aboutList">Assign ticket</li>
        <li className="aboutList">Close ticket</li>
        <li className="aboutList">Comment ticket</li>
        Currently it does not have a backend to store data, so any changes that
        are made will be gone if you refresh the browser. <br />
        Toggle between <b>Admin View </b>
        or <b>Client View</b> to see how it works for both sides.
        <br />
        <br />
        Some tickets are marked as <b>"Protected"</b> for demonstration
        purposes.
      </Typography>
    </>
  );
}

export default About;
