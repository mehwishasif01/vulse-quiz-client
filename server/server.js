const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = 8080;

/* `app.use(cors());` is setting up Cross-Origin Resource Sharing (CORS) for the Express application.
This allows the server to handle requests from a different origin (domain) than the one it is hosted
on. It enables the server to respond to requests from a different domain by including appropriate
CORS headers in the response. This is important for security reasons as browsers restrict
cross-origin HTTP requests initiated from scripts. */
app.use(cors());

// POST a new user
app.post("/user", async (req, res) => {
  const {} = req.body;
  const quiz = await prisma.quiz.create({
    data: {
      title,
      description,
      questions,
      userId,
    },
  });
  res.json(quiz);
});

// GET all quizzes
app.get("/quizzes", async (req, res) => {
  const quizzes = await prisma.quiz.findMany();
  res.json(quizzes);
});

// POST a new quiz
app.post("/quiz", async (req, res) => {
  const { title, description, questions, userId } = req.body;
  const quiz = await prisma.quiz.create({
    data: {
      title,
      description,
      questions,
      userId,
    },
  });
  res.json(quiz);
});

// DELETE a quiz
app.delete("/quizzes/:id", async (req, res) => {
  const { id } = req.params;
  const quiz = await prisma.quiz.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json(quiz);
});

// PUT/update a quiz
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, questions } = req.body;
  const post = await prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      content,
    },
  });
  res.json(post);
});

// PATCH/update a post
app.patch("/quizzes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await prisma.quiz.update({
      where: { id: parseInt(id) },
      data: { title, description, questions },
    });
    res.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* starting the Express server and listening for incoming HTTP requests on the specified port. */
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
