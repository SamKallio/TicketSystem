import React from "react";

function About() {
  return (
    <>
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
        basic functionalities and looks of a Ticket System. It handles basic
        actions such as:
        <li className="aboutList">Create ticket</li>
        <li className="aboutList">Read ticket</li>
        <li className="aboutList">Update ticket</li>
        <li className="aboutList">Delete ticket</li>
        <li className="aboutList">Assign ticket</li>
        <li className="aboutList">Finish ticket</li>
        By toggling between Admin View or Client View, you are able to see how
        it works from both sides. For example, the Client can only see its own
        tickets. <br />
        In Admin View, tickets are initially unassigned and unprioritized, but
        once a ticket is assigned and prioritized, it will move to a matching
        category in order of priority and time of arrival. There is no actual
        user validation or authenication system in the backend, so any assigned
        tickets go to imaginary users.
        <br />
        <br />
        Some tickets are protected on purpose for more user friendly testing and
        heck, it kinda demonstrates user privileges, right?
      </p>
    </>
  );
}

export default About;
