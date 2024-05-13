import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { categories } from "../models/TicketModel";
import TicketTable from "./TicketTable";

function ViewAllTickets({ tickets }) {
  const [category, setCategory] = React.useState(categories[0]);
  const currentTickets = tickets.filter(
    (ticket) => ticket.category === category
  );

  const handleChange = (event, newCategory) => {
    setCategory(newCategory);
  };

  return (
    <>
      <Box
        sx={{
          margin: "auto",
          maxWidth: { xs: 320, sm: 480, md: 560 },
          borderRadius: "4px",
          padding: "10px",
        }}
      >
        <Tabs
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          value={category}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          {categories.map((v, index) => (
            <Tab
              sx={{
                margin: "4px",
                color: "white",
                borderRadius: "4px",
                boxShadow: 1,
                backgroundColor: "primary.highlight",
                "&:hover": {
                  bgcolor: "background.highlight",
                  color: "black",
                },
                "&.Mui-selected": {
                  bgcolor: "background.highlight",
                  color: "black",
                },
              }}
              value={v}
              label={v}
              key={index}
            />
          ))}
        </Tabs>
      </Box>
      <TicketTable rows={currentTickets} />
    </>
  );
}

export default ViewAllTickets;
