import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Comment from "./Comment";
import Reply from "./Reply";
import { ActionTypes } from "./TicketSystem";
import {
  createNewComment,
  ticketState,
  supportUsers,
  priorityOptions,
} from "../models/TicketModel";
import { useState } from "react";
import ModalButton from "./ModalButton";
import { modalStyle } from "../models/StyleModel";
import CancelIcon from "@mui/icons-material/Cancel";

function TicketModal({ ticket, dispatch, currentUser, setOpenModal }) {
  const [currentComments, setCurrentComments] = useState(ticket.comments);

  const sendComment = (message) => {
    const newComment = createNewComment(currentUser.name, message);

    dispatch({
      type: ActionTypes.SEND_COMMENT,
      payload: {
        id: ticket.id,
        comment: newComment,
      },
    });

    setCurrentComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <>
      <Modal
        keepMounted
        open={true}
        onClose={() => setOpenModal(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              width: "100%",
              textAlign: "right",
            }}
          >
            <CancelIcon
              sx={{ color: "primary.main" }}
              onClick={() => setOpenModal(false)}
            />
          </Box>
          <Typography id="keep-mounted-modal-title" variant="h7" component="h2">
            {ticket.title}
          </Typography>
          <Box
            sx={{
              mt: 3,
              backgroundColor: "background.darker",
              padding: 1,
              borderRadius: 2,
              border: "1px solid black",
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
            sx={{ mt: 4 }}
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
          {currentUser.accessLevel === 1 && (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
                mt: 4,
                width: "100%",
              }}
            >
              <ModalButton
                dispatch={dispatch}
                ticketId={ticket.id}
                currentValue={ticket.assigned}
                options={supportUsers}
                header={"Assigned"}
              />
              <ModalButton
                dispatch={dispatch}
                ticketId={ticket.id}
                currentValue={ticket.state}
                options={ticketState.filter((ticket) => ticket !== "Protected")}
                header={"State"}
              />
              <ModalButton
                dispatch={dispatch}
                ticketId={ticket.id}
                currentValue={ticket.priority}
                options={priorityOptions}
                header={"Priority"}
              />
            </Box>
          )}
          <Reply sendComment={sendComment} />
        </Box>
      </Modal>
    </>
  );
}

export default TicketModal;
