import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Comment({ comment }) {
  return (
    <Box
      sx={{
        mt: 1,
        mb: 2,
        width: "100%",
        maxWidth: "100%",
        backgroundColor: "background.darker",
        border: "1px solid black",
        borderRadius: 2,
        padding: 1,
      }}
    >
      <Typography
        id="keep-mounted-modal-description"
        sx={{
          mt: 1,
          wordBreak: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "normal",
        }}
      >
        {comment.content}
      </Typography>
      <Typography
        variant="body3"
        id="keep-mounted-modal-description"
        sx={{
          mt: 1,
          color: "secondary.main",
          textAlign: "start",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "normal",
        }}
      >
        Posted by: {comment.username} - {comment.date}
      </Typography>
    </Box>
  );
}

export default Comment;
