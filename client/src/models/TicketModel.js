export const ticketRules = {
  minTitleLength: 10,
  minDescLength: 20,
};

export const priorityOptions = ["Very Low", "Low", "Medium", "High"];

export const categories = ["Account", "Technical issue", "Billing", "Other"];

export const userSections = {
  USER: ["New Ticket", "My Tickets", "Help", "About"],
  ADMIN: ["New Ticket", "My Tickets", "Tickets", "Assigned", "About"],
};

export const ticketState = [
  "Unassigned",
  "Assigned",
  "Underwork",
  "Completed",
  "Protected",
];

export function createEmptyTicket(user) {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    date: createDate(new Date()),
    username: user,
    title: "",
    category: "",
    description: "",
    priority: 0,
    state: ticketState.UNASSIGNED,
    assigned: "-",
    comments: [],
  };
}

export function createNewComment(user, message) {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    username: user,
    content: message,
    date: createDate(new Date()),
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
