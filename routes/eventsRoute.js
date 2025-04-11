const express = require("express");
const router = express.Router();
const events = require("../Data/events");


//Middleware to validate event ID
router.param("id", (req, res, next, id) => {
  const eventId = parseInt(id);
  if (isNaN(id)) {
      return res.status(400).render("pages/error", {
          title: "Error",
          message: "Invalid Event ID!"
      });
  }
  next(); // Pass control to the next middleware or route handler
});

// GET /events - List all events
 router.get("/", (req, res) => {
  res.json(events); // Respond with the list of events
 });
router.get("/", (req, res) => {
  res.render("pages/eventList", { title: "Events List", events });
});

// GET /events/:id - Retrieve details of a single event
router.get("/:id", (req, res) => {
  const event = events.find((e) => e.id === parseInt(req.params.id));
  
  if (!event) {
    // Render the error page with a custom message
    return res.status(404).render("pages/error", { 
      title: "Error", 
      message: "Event not found!" 
    });
  }

   res.render("pages/eventDetails", { title: event.name, event });
});

// PATCH /events/:id - Update details of a single event
router.patch("/:id", (req, res) => {
  if (!req.event) {
      return res.status(404).render("pages/error", {
          title: "Error",
          message: "Event not found!"
      });
  }

  // Update the event properties
  req.event.name = req.body.name;
  req.event.date = req.body.date;
  req.event.time = req.body.time;
  req.event.location = req.body.location;
  req.event.description = req.body.description;

  // After updating, redirect to the event details page
  res.redirect(`/events/${req.params.id}`);
});

module.exports = router;