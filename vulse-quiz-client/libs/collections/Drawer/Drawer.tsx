import { DrawerProps } from "@libs/types";
import React from "react";

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
import { useMutation, useQuery } from "@tanstack/react-query";
import { QuestionCreate } from "../Quiz/Question";

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [],
  });
  const [questionValues, setQuestionValues] = useState([]);

  const { refetch }: any = useQuery({
    queryKey: ["quizzes"],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`),
  });

  const createQuizMutation: any = useMutation({
    mutationFn: (newQuizData: any) =>
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`, newQuizData),
    onSuccess: () => {
      handleClose();
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
      await refetch();
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({ title: "", description: "", questions: [] });
    setQuestionValues([]);
  };
  const checkDisabled = () => {
    return formData?.title === "" || formData?.description === "";
  };

  return (
    <Container
      className={`inset-0 overflow-hidden z-50 ${isOpen ? "block" : "hidden"}`}
    >
      <Container className="absolute inset-0 overflow-hidden">
        <Container
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={() => handleClose}
        ></Container>
        <Container className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <Container className="w-screen max-w-md">
            <FlexContainer className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <MainContainer>
                <FlexContainer className="justify-between items-center px-4 py-2">
                  <Text className=" text-xl ">Create New Quiz</Text>
                  <Button
                    onClick={handleClose}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
                  >
                    X
                  </Button>
                </FlexContainer>

                <Container className="mt-2 px-4 py-2">
                  <Text className=" text-xs text-gray-400">
                    Complete all fields to create the quiz.
                  </Text>
                </Container>
                <Form className="px-6 py-4">
                  <Input
                    label="Title *"
                    placeholder="Enter a title for your quiz."
                    className="w-full mb-4"
                    value={formData?.title}
                    required={true}
                    htmlFor="title"
                    type="text"
                    onChange={(event) =>
                      handleInputChange("title", event.target.value)
                    }
                  />

                  <TextArea
                    label="Description *"
                    placeholder="Enter your quiz details."
                    rows={3}
                    value={formData?.description}
                    className="mb-4"
                    required={true}
                    htmlFor="description"
                    onChange={(event) =>
                      handleInputChange("description", event.target.value)
                    }
                  />

                  <FlexContainer className="justify-between items-center">
                    <Text>Question(s): {questions.length} </Text>

                    <Button onClick={() => onAddQuestionButtonClick()}>
                      <Text className=" text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                        {" "}
                        + New Question
                      </Text>
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
                    className={
                      checkDisabled()
                        ? "opacity-50 cursor-not-allowed bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                        : "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                    }
                    disabled={checkDisabled()}
                  >
                    Create Quiz
                  </Button>
                </Form>
              </MainContainer>
            </FlexContainer>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Drawer;
