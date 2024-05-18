import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

function Reply({ sendComment }) {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendComment(message);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "background.default",
        borderRadius: "8px",
        marginTop: "20px",
        maxWidth: "100%",
        padding: 2,
        boxShadow: 1,
        "&:hover": {
          bgcolor: "background.highlight",
        },
      }}
      autoComplete="off"
    >
      <TextField
        sx={{ width: "100%", mb: 2 }}
        required
        id="outlined-multiline-flexible"
        multiline
        maxRows={10}
        name="comment"
        label="Comment"
        value={message}
        onChange={handleChange}
      ></TextField>
      <Button variant="contained" endIcon={<SendIcon />} type="submit">
        Send Comment
      </Button>
    </Box>
  );
}

export default Reply;
