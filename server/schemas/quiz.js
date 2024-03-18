const { z } = require("zod");

const createQuizSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  questions: z.array(
    z.object({
      title: z.string().nonempty(),
      options: z.array(
        z.object({
          label: z.string().nonempty(),
        })
      ),
      correctOption: z.string().nonempty(),
      score: z.number().nonnegative(),
    })
  ),
});

const quizResultSchema = z.array(
  z.object({
    questionId: z.number(),
    optionId: z.number(),
  })
);

module.exports = {
  createQuizSchema,
  quizResultSchema,
};
