const { createQuizSchema, quizResultSchema } = require("../schemas/quiz");
const { z } = require("zod");

const validateCreateQuizPayload = (req, res, next) => {
  try {
    createQuizSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Invalid request payload", details: error.errors });
    } else {
      res.status(500).json({
        error: "An error occurred while validating the request payload",
      });
    }
  }
};

const validateQuizResultPayload = (req, res, next) => {
  try {
    quizResultSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Invalid request payload", details: error.errors });
    } else {
      res.status(500).json({
        error: "An error occurred while validating the request payload",
      });
    }
  }
};

module.exports = {
  validateCreateQuizPayload,
  validateQuizResultPayload,
};
