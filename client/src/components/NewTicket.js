import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const topics = [
  {
    value: "Account",
    label: "My Account",
  },
  {
    value: "Tech",
    label: "Technical Issues",
  },
  {
    value: "Billing",
    label: "Billing",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const minLength = {
  title: 10,
  description: 20,
};

function NewTicket() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendTicket = (event) => {
    event.preventDefault();

    if (formData.title.length < minLength.title) return;
    if (formData.description.length < minLength.description) return;

    console.log("Data:", formData);
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
          bgcolor: "background.dark",
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
      <h2 className="headers">New Ticket</h2>
      <TextField
        required
        id="outlined-helperText"
        name="title"
        label="Title"
        color="success"
        helperText={
          formData.title.length > 0 ? (
            formData.title.length >= minLength.title ? (
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
        {topics.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
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
            formData.description.length >= minLength.description ? (
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
      {formData.description.length >= minLength.description &&
      formData.title.length >= minLength.title &&
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
