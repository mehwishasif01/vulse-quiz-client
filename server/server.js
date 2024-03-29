const express = require("express");
const {
  createQuiz,
  fetchQuizList,
  fetchQuiz,
  deleteQuiz,
  fetchQuizResults,
} = require("./controllers/quiz");
const {
  validateCreateQuizPayload,
  validateQuizResultPayload,
} = require("./middlewares/validation");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.post(
  "/api/quizzes/:id/results",
  validateQuizResultPayload,
  fetchQuizResults
);

app.post("/api/quizzes", validateCreateQuizPayload, createQuiz);

app.get("/api/quizzes", fetchQuizList);

app.get("/api/quizzes/:id", fetchQuiz);

app.delete("/api/quizzes/:id", deleteQuiz);

/* starting the Express server and listening for incoming HTTP requests on the specified port. */
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
