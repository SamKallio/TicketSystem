import React from "react";

function About() {
  return (
    <>
      <h2 className="headers" style={{ textAlign: "center" }}>
        About
      </h2>
      <p
        style={{
          maxWidth: "800px",
          marginTop: "50px",
          marginBottom: "50px",
          margin: "auto",
          padding: "12px",
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
        gone if you refresh your browser. By toggling between <b>Admin View </b>
        or <b>Client View</b>, you are able to see how it works for both sides.
        For example, the Client can only see it's own tickets and Admin can
        access all tickets and do actions on them.
        <br />
        <br />
        Some tickets are marked as <b>"Protected"</b> on purpose for
        demonstration purposes.
      </p>
    </>
  );
}

export default About;
