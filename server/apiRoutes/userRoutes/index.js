// Import necessary modules
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

// Create a new instance of Prisma client
const prisma = new PrismaClient();

// Define the route to handle POST requests for creating a new user
router.post("/users", async (req, res) => {
  // Extract user data from request body
  const { username, email, password } = req.body;

  try {
    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    // Respond with the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Could not create user" });
  }
});

// Export the router to use in the main Express app
module.exports = router;
