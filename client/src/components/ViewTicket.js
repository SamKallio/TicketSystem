import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Comment from "./Comment";
import Button from "@mui/material/Button";
import Reply from "./Reply";
import { ActionTypes } from "./TicketSystem";
import { createNewComment } from "../models/TicketModel";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 1,
  overflow: "scroll",
  height: "80%",
  boxShadow: 24,
  p: 4,
};

const btnStyle = {
  mt: 2,
  ml: 1,
  color: "white",
  borderRadius: "4px",
  boxShadow: 1,
  backgroundColor: "secondary.main",
  "&:hover": {
    bgcolor: "background.highlight",
    color: "black",
  },
  "&.Mui-selected": {
    bgcolor: "background.highlight",
    color: "black",
  },
};

function ViewTicket({ open, setModal, ticket, dispatch, username }) {
  const [currentComments, setCurrentComments] = useState(ticket.comments);

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
      <Modal
        keepMounted
        open={open}
        onClose={() => setModal(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
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
          <Button sx={{ ...btnStyle, backgroundColor: "primary.main" }}>
            Assign
          </Button>
          <Button sx={{ ...btnStyle, backgroundColor: "secondary.main" }}>
            Set State
          </Button>
          <Reply sendComment={sendComment} />
        </Box>
      </Modal>
    </>
  );
}

export default ViewTicket;
