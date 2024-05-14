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
        By toggling between <b>Admin View </b>or <b>Client View</b>, you are
        able to see how it works from both sides. For example, the Client can
        only see its own tickets. <br />
        In Admin View, the Tickets are initially unassigned and unprioritized,
        but once a ticket is assigned and prioritized, it will move to a
        matching category in order of priority and time of arrival. There is no
        actual user validation or authenication system in the backend, so any
        assigned tickets go to imaginary users.
        <br />
        <br />
        Some tickets are marked as "protected" on purpose for demonstration and
        testing.
      </p>
    </>
  );
}

export default About;
