import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

function ViewTicket({ open, setModal, ticket }) {
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
          <Typography color={"primary.main"}>Ticket</Typography>
          <br></br>
          <br></br>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            {ticket.title}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            {ticket.description}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default ViewTicket;
