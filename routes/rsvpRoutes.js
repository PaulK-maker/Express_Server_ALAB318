// const express = require("express");
// const router = express.Router();
// const users = require("../Data/users");
// const rsvps = []; 


// // POST /rsvp - Handle RSVP submissions
// router.post("/", (req, res) => {
//   const { name } = req.body;

//   if (!name) {
//     return res.status(400).render("pages/error", { 
//       title: "Error", 
//       message: "Name is required for RSVP!" 
//     });
//   }

//   rsvps.push({ name }); // Add the RSVP to the list
//   res.redirect("/rsvp"); // Redirect to the RSVP list page
// });

// // GET /rsvp - List all RSVPs
// router.get("/", (req, res) => {
//   res.render("pages/rsvpList", { title: "RSVP List", rsvps });
// });


// // GET /users - Retrieve all users
// router.get("/", (req, res) => {
//   res.status(200).json(users);
// });

// // GET /users/:id - Retrieve a user by ID
// router.get("/:id", (req, res) => {
//   const user = users.find((u) => u.id === parseInt(req.params.id));
//   if (!user) {
//     return res.status(404).json({ error: "User not found" });
//   }
//   res.status(200).json(user);
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const rsvps = require("../Data/rsvps"); // Assuming you have RSVP data

// GET /rsvp - List all RSVPs
router.get("/", (req, res) => {
  res.render("pages/rsvpList", { title: "RSVP List", rsvps });
});

// GET /rsvp/:id - Retrieve details of a single RSVP
router.get("/:id", (req, res) => {
  const rsvp = rsvps.find((r) => r.id === parseInt(req.params.id));
  if (!rsvp) {
    return res.status(404).render("pages/error", { 
      title: "Error", 
      message: "RSVP not found!" 
    });
  }
  res.render("pages/rsvpDetails", { title: `RSVP Details`, rsvp });
});

// POST /rsvp - Handle RSVP submissions
router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).render("pages/error", { 
      title: "Error", 
      message: "Name is required for RSVP!" 
    });
  }

  // Add the RSVP to the list
  rsvps.push({ name });
  console.log("RSVP added:", name);

  // Redirect to the RSVP list page
  res.redirect("/rsvp");
});

// GET /rsvp - List all RSVPs
router.get("/", (req, res) => {
  res.render("pages/rsvpList", { title: "RSVP List", rsvps });

});

// DELETE /rsvp/:id - Delete an RSVP
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = rsvps.findIndex((rsvp) => rsvp.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "RSVP not found" });
  }

  rsvps.splice(index, 1); // Remove the RSVP from the array
  res.status(200).json({ message: "RSVP deleted successfully" }); // Respond with success
});

// PATCH /rsvp/:id - Update an RSVP
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const rsvp = rsvps.find((rsvp) => rsvp.id === id);

  if (!rsvp) {
    return res.status(404).json({ error: "RSVP not found" });
  }

  // Update the RSVP properties based on the request body
  Object.assign(rsvp, req.body);

  res.status(200).json({ message: "RSVP updated successfully", rsvp }); // Respond with success
});

module.exports = router;