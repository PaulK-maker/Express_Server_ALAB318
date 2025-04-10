const express = require("express");
const router = express.Router();
const users = require("../Data/users");

// GET /users - Retrieve all users
router.get("/", (req, res) => {
  res.status(200).json(users);
});

// GET /users/:id - Retrieve a user by ID
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
});

module.exports = router;