//This model contains styles that I want to use throught this site
import { createTheme } from "@mui/material/styles";

export const divStyle = {
  mt: 5,
  maxWidth: "50vw",
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
