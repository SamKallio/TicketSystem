import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  createEmptyTicket,
  categories,
  ticketRules,
} from "../models/TicketModel";

function NewTicket({ username, addTicket, ticket }) {
  const [formData, setFormData] = useState(createEmptyTicket(username));

  useEffect(() => {
    if (ticket) setFormData(ticket);
    else setFormData(createEmptyTicket(username));
  }, [ticket, username]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendTicket = (event) => {
    event.preventDefault();

    if (formData.title.length < ticketRules.minTitleLength) return;
    if (formData.description.length < ticketRules.minDescLength) return;

    addTicket(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={sendTicket}
      sx={{
        "& .MuiTextField-root": { m: 1 },
        backgroundColor: "background.default",
        borderRadius: "8px",
        marginTop: "50px",
        maxWidth: "100%",
        boxShadow: 1,
        "&:hover": {
          bgcolor: "background.highlight",
        },
      }}
      noValidate
      autoComplete="off"
      margin="auto"
      display="flex"
      flexDirection="column"
      textAlign="center"
      alignItems="center"
      gap={2}
      p={4}
      width={400}
    >
      {ticket ? (
        <h2 className="headers">Edit Ticket</h2>
      ) : (
        <h2 className="headers">New Ticket</h2>
      )}
      <TextField
        required
        id="outlined-helperText"
        name="title"
        label="Title"
        color="success"
        helperText={
          formData.title.length > 0 ? (
            formData.title.length >= ticketRules.minTitleLength ? (
              <CheckBoxIcon color="secondary" fontSize="small" />
            ) : (
              <span className="errorText">Too short title</span>
            )
          ) : (
            "Please fill in your title"
          )
        }
        value={formData.title}
        onChange={handleChange}
      />
      <TextField
        required
        id="outlined-select-currency"
        select
        name="category"
        label="Category"
        color="success"
        helperText={
          formData.category ? (
            <CheckBoxIcon color="secondary" fontSize="small" />
          ) : (
            "Please select a category"
          )
        }
        value={formData.category}
        onChange={handleChange}
      >
        {categories.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        fullWidth
        name="description"
        id="outlined-multiline-flexible"
        multiline
        maxRows={10}
        label="Description"
        color="success"
        helperText={
          formData.description.length > 0 ? (
            formData.description.length >= ticketRules.minDescLength ? (
              <CheckBoxIcon color="secondary" fontSize="small" />
            ) : (
              <span className="errorText">Too short description</span>
            )
          ) : (
            "Please fill in your description"
          )
        }
        value={formData.description}
        onChange={handleChange}
      />
      {formData.description.length >= ticketRules.minDescLength &&
      formData.title.length >= ticketRules.minTitleLength &&
      formData.category ? (
        <Button variant="contained" endIcon={<SendIcon />} type="submit">
          Submit
        </Button>
      ) : (
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
          disabled
        >
          Submit
        </Button>
      )}
    </Box>
  );
}

export default NewTicket;
