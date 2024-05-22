//This model contains styles that I want to use throught this site
import { createTheme } from "@mui/material/styles";

export const divStyle = {
  mt: 5,
  maxWidth: "50vw",
};

export const tabStyle = {
  borderRadius: 1,
  color: "white",
  boxShadow: 1,
  backgroundColor: "primary.highlight",
  margin: 0.6,
  "&:hover": {
    bgcolor: "background.highlight",
    color: "black",
  },
  "&.Mui-selected": {
    bgcolor: "background.highlight",
    color: "black",
  },
  maxHeight: {
    xs: 40,
    sm: 60,
    md: 80,
    lg: 100,
  },
  maxWidth: {
    xs: 60, // max width for extra-small screens
    sm: 80, // max width for small screens
    md: 100, // max width for medium screens
    lg: 120, // max width for large screens
  },
  minWidth: {
    xs: 30, // min width for extra-small screens
    sm: 60, // min width for small screens
    md: 80, // min width for medium screens
    lg: 100, // min width for large screens
  },
  fontSize: {
    xs: "0.56rem", // font size for extra-small screens
    sm: "0.66rem", // font size for small screens
    md: "0.76rem", // font size for medium screens
    lg: "0.86rem", // font size for large screens
  },
  padding: {
    xs: 1.25,
    sm: 1.5,
    md: 1.75,
    lg: 2.0,
  },
};

export const btnStyle = {
  mt: 1,
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

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 1,
  overflow: "scroll",
  height: "80%",
  boxShadow: 24,
  p: 4,
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", //Blue
      highlight: "#4298d9", //Highlight blue
    },
    secondary: {
      main: "#109612", //Green
    },
    third: {
      main: "#dc001e", //Red
    },
    background: {
      default: "#f4f4f4",
      darker: "#f1f1f1",
      highlight: "#f8f8f8",
    },
    text: {
      primary: "#333",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
    },
  },
});
