const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * The function `createQuiz` asynchronously creates a quiz with questions and options, connecting
 * correct options to questions, and returns the created quiz.
 */
const createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const createdQuestions = await Promise.all(
      questions.map(async (question) => {
        return prisma.question.create({
          data: {
            title: question.title,
            score: question.score,
          },
        });
      })
    );

    const createdOptions = await Promise.all(
      createdQuestions.flatMap((createdQuestion) =>
        questions
          .find((question) => question.title === createdQuestion.title)
          .options.map((option) =>
            prisma.option.create({
              data: {
                label: option.label,
                questionId: createdQuestion.id,
              },
            })
          )
      )
    );

    await Promise.all(
      questions.map(async (item) => {
        const correctOption = createdOptions.find(
          (option) => option.label === item.correctOption
        );

        if (correctOption) {
          await prisma.question.update({
            where: { id: correctOption.questionId },
            data: { correctOption: correctOption.id },
          });
        }
      })
    );

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        questions: {
          connect: createdQuestions.map((question) => ({ id: question.id })),
        },
      },
      include: {
        questions: true,
      },
    });

    res.json(quiz);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the quiz" });
  }
};

/**
 * The function `fetchQuizList` retrieves a list of quizzes with their associated questions and options
 * from a database using Prisma and sends the result as a JSON response.
 */
const fetchQuizList = async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    res.json(quizzes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the quizzes" });
  }
};

/**
 * The fetchQuiz function retrieves a quiz with its questions and options based on the provided ID and
 * handles errors appropriately.

 * @returns The function `fetchQuiz` is returning the quiz object as JSON if it is found, or a JSON
 * object with an error message "Quiz not found" if the quiz is not found. If an error occurs during
 * the retrieval process, it will return a JSON object with an error message "An error occurred while
 * retrieving the quiz" and a status code of 500.
 */
const fetchQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json(quiz);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the quiz" });
  }
};

/**
 * The function `deleteQuiz` deletes a quiz from the database based on the provided ID and returns a
 * success message or an error message.

 */
const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the quiz from the database
    await prisma.quiz.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the quiz" });
  }
};

/**
 * The function fetchQuizResults calculates the score and correct options for a quiz based on user
 * responses and returns the results.
 */
const fetchQuizResults = async (req, res) => {
  try {
    const { id } = req.params;

    const questions = await prisma.question.findMany({
      where: {
        quizId: parseInt(id),
      },
    });

    let score = 0;
    let correctOptions = 0;
    let total = 0;

    req.body.forEach(({ questionId, optionId }) => {
      // Find the corresponding question in the questions array
      const question = questions.find((q) => q.id === questionId);
      total = total + question.score;

      // Check if the question and its correct option exist
      if (question && question.correctOption === optionId) {
        // Increment the score if the option selected by the user is correct
        score = score + question.score;
        correctOptions++;
      }
    });

    res.json({
      score: score,
      correctOptions: correctOptions,
      total: total,
      message: "Quiz completed successfully! Here are your results",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving results" });
  }
};

module.exports = {
  createQuiz,
  fetchQuizList,
  fetchQuiz,
  deleteQuiz,
  fetchQuizResults,
};
