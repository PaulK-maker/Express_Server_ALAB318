const express = require("express");
const router = express.Router();
const events = require("../Data/events");


// Middleware to validate event ID
router.param("id", (req, res, next, id) => {
  if (isNaN(id)) {
      return res.status(400).render("pages/error", {
          title: "Error",
          message: "Invalid Event ID!"
      });
  }
  next(); // Pass control to the next middleware or route handler
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

module.exports = router;