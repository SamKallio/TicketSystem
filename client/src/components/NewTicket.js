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
import { ActionTypes } from "./TicketSystem";
import { btnStyle } from "../models/StyleModel";

function NewTicket({ username, dispatch, editTicket }) {
  const [formData, setFormData] = useState(
    editTicket !== null ? editTicket : createEmptyTicket(username)
  );

  useEffect(() => {
    if (editTicket) setFormData(editTicket);
    else setFormData(createEmptyTicket(username));
  }, [editTicket, username]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendTicket = (event) => {
    event.preventDefault();

    if (formData.title.length < ticketRules.minTitleLength) return;
    if (formData.description.length < ticketRules.minDescLength) return;

    dispatch({ type: ActionTypes.ADD_TICKET, payload: formData });
  };

  return (
    <Box
      component="form"
      onSubmit={sendTicket}
      sx={{
        "& .MuiTextField-root": { m: 1 },
        backgroundColor: "background.default",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto",
        maxWidth: 340,
        minWidth: 200,
        padding: 5,
        gap: 3,
        boxShadow: 1,
        "&:hover": {
          bgcolor: "background.highlight",
        },
      }}
      noValidate
      autoComplete="off"
    >
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
        <Button
          sx={{
            ...btnStyle,
            backgroundColor: "primary.main",
            alignSelf: "center",
            border: "1px solid black",
          }}
          endIcon={<SendIcon />}
          type="submit"
        >
          Submit
        </Button>
      ) : (
        <Button
          sx={{
            ...btnStyle,
            alignSelf: "center",
            border: "1px solid black",
          }}
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
