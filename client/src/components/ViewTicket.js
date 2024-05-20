import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Comment from "./Comment";
import Reply from "./Reply";
import { ActionTypes } from "./TicketSystem";
import { createNewComment } from "../models/TicketModel";
import { useState } from "react";
import AssignMenu from "./AssignMenu";
import StateMenu from "./StateMenu";
import { modalStyle } from "../models/StyleModel";
import { btnStyle } from "../models/StyleModel";
import Button from "@mui/material/Button";

function ViewTicket({ ticket, dispatch, username }) {
  const [currentComments, setCurrentComments] = useState(ticket.comments);
  const [open, setModal] = useState(false);

  const sendComment = (message) => {
    const newComment = createNewComment(username, message);
    setCurrentComments([...currentComments, newComment]);

    dispatch({
      type: ActionTypes.SEND_COMMENT,
      payload: {
        id: ticket.id,
        comment: newComment,
      },
    });
  };

  return (
    <>
      <Button onClick={() => setModal(true)} sx={btnStyle}>
        Open Ticket
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={() => setModal(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="keep-mounted-modal-title" variant="h7" component="h2">
            {ticket.title}
          </Typography>
          <Box
            sx={{
              mt: 3,
              backgroundColor: "background.darker",
              padding: 1,
              borderRadius: 2,
            }}
          >
            <Typography id="keep-mounted-modal-description">
              {ticket.description}
            </Typography>
            <Typography
              variant="body3"
              id="keep-mounted-modal-description"
              sx={{
                color: "secondary.main",
              }}
            >
              Posted by: {ticket.username} - {ticket.date}
            </Typography>
          </Box>
          <Typography
            id="keep-mounted-modal-title"
            variant="h7"
            component="h3"
            sx={{ mt: 5 }}
          >
            Comments:
          </Typography>
          {currentComments.length > 0 ? (
            currentComments.map((v, index) => (
              <Comment key={index} comment={v} />
            ))
          ) : (
            <p>
              <i>No comments</i>
            </p>
          )}
          {username === "Admin" && (
            <Box sx={{ display: "flex", gap: 1, mt: 4, width: "100%" }}>
              <AssignMenu
                dispatch={dispatch}
                ticketId={ticket.id}
                assignedUser={ticket.assigned}
              />
              <StateMenu
                dispatch={dispatch}
                ticketId={ticket.id}
                currentState={ticket.state}
              />
            </Box>
          )}
          <Reply sendComment={sendComment} />
        </Box>
      </Modal>
    </>
  );
}

export default ViewTicket;
