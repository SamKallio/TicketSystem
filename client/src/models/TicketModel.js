export const ticketRules = {
  minTitleLength: 10,
  minDescLength: 20,
};

export const categories = ["Account", "Technical issue", "Billing", "Other"];

export const userSections = {
  USER: ["New Ticket", "My Tickets", "Help", "About"],
  ADMIN: [
    "New Ticket",
    "My Tickets",
    "Tickets",
    "Assigned",
    "Finished",
    "About",
  ],
};

export function createEmptyTicket(user) {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    date: createDate(new Date()),
    username: user,
    title: "",
    category: "",
    description: "",
    priority: "Normal",
  };
}

function createDate(currentDate) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = formatter.format(currentDate);

  return formattedDate;
}