const events = [
  {
    id: 1,
    eventName: "Team Meeting",
    date: "2025-04-15",
    time: "10:00 AM",
    location: "123 Willowbrook Lane, Everwood, Valtoria 98765, - Conference Room A",
    description: "Monthly team meeting to discuss project updates.",
    ownerId: 1, // User ID of the event creator
    attendees: [ "John Doe",
      "Jane Smith",
      "Alice Johnson",
      "Bob Brown",
      "Charlie White",
      "Diana Black"],
  },


  {
    id: 2,
    eventName: "Birthday Party",
    date: "2025-04-20",
    time: "6:00 PM",
    location: "123 Willowbrook Lane, Everwood, Valtoria 98765, - John's House",
    description: "Celebrating John's birthday!",
    ownerId: 1, // User ID of the event creator
    attendees: ["John Doe",
  "Jane Smith",
  "Alice",
  "Bob"], //RSVPs
  },
];

module.exports = events;

// module.exports = [
//   { id: 1, name: "Event One", date: "2025-04-10", location: "New York" },
//   { id: 2, name: "Event Two", date: "2025-05-15", location: "Los Angeles" },
//   { id: 3, name: "Event Three", date: "2025-06-20", location: "Chicago" }
// ];
// module.exports = events;