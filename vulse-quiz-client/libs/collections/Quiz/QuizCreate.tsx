import {
  Button,
  Input,
  TextArea,
  Text,
  Form,
  MainContainer,
  Container,
  FlexContainer,
} from "@libs/components";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { QuestionCreate } from "./Question";

const QuizCreate: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [],
  });
  const [questionValues, setQuestionValues] = useState([]);

  const createQuizMutation: any = useMutation({
    mutationFn: (newQuizData: any) =>
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`, newQuizData),
    onSuccess: () => {
      router.push("/quiz/list");
    },
  });

  const onSaveButtonClicked = (data: any) => {
    setQuestionValues((prev) => [...prev, data]);
    setFormData((prevData) => ({
      ...prevData,
      questions: [...questionValues, data],
    }));
  };

  const onRemoveButtonClicked = (qIndex: any) => {
    setQuestions(questions.filter((item, index) => index !== qIndex));
    setFormData((prevData) => ({
      ...prevData,
      questions: questions,
    }));
  };

  const [questions, setQuestions] = useState([
    {
      comp: (index) => (
        <QuestionCreate
          index={index}
          onSaveButtonClicked={onSaveButtonClicked}
          onRemoveButtonClicked={onRemoveButtonClicked}
        />
      ),
    },
  ]);

  const onAddQuestionButtonClick = () => {
    setQuestions((prev) => [
      ...prev,
      {
        comp: (index) => (
          <QuestionCreate
            index={index}
            onSaveButtonClicked={onSaveButtonClicked}
            onRemoveButtonClicked={onRemoveButtonClicked}
          />
        ),
      },
    ]);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      await createQuizMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <MainContainer>
      <Text className=" text-xl px-4 py-2">Create New Quiz</Text>
      <Container className="mt-2 px-4 py-2">
        <Text className=" text-xs text-gray-400">
          Complete all fields to create the quiz.
        </Text>
      </Container>
      <Form className="px-6 py-4">
        <Input
          label="Title *"
          placeholder="Enter a title for your quiz."
          className="w-full mb-2 bg-pink"
          required={true}
          htmlFor="title"
          type="text"
          onChange={(event) => handleInputChange("title", event.target.value)}
        />
        {/* {errors.title && (
          <span className="text-red-500">Title is required</span>
        )} */}

        <TextArea
          label="Description *"
          placeholder="Enter your quiz details."
          rows={3}
          className="mb-2"
          required={true}
          htmlFor="description"
          onChange={(event) =>
            handleInputChange("description", event.target.value)
          }
        />

        <FlexContainer className="justify-between items-center">
          <Text>Question(s): {questions.length} </Text>

          <Button onClick={() => onAddQuestionButtonClick()}>
            <Text className="text-white text-sm"> + New Question</Text>
          </Button>
        </FlexContainer>
        <Container className="mt-2">
          <Text className=" text-xs text-gray-400">
            Complete all fields to save the question.
          </Text>
        </Container>

        <Container className="divide-y divide-gray-400 mb-4">
          {questions.map((item, index) => item.comp(index))}
        </Container>
        <Button
          onClick={() => handleFormSubmit()}
          className={` w-full bg-green-400`}
          disabled={formData?.title === "" && formData?.description === ""}
        >
          Create Quiz
        </Button>
      </Form>
    </MainContainer>
  );
};

export default QuizCreate;
