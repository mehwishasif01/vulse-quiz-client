import {
  Button,
  Container,
  FlexContainer,
  RadioButton,
  Text,
} from "@libs/components";
import { QuizModalProps, Result } from "@libs/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { QuizResultModal } from "../QuizResultModal";

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, data }) => {
  const [formData, setFormData] = useState(data);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [resultModal, setResultModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [resultData, setResultData] = useState<Result>();

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const updateQuizMutation: any = useMutation({
    mutationFn: (newQuizData: any) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${data.id}/results`,
        newQuizData
      ),
    onSuccess: (data) => {
      setResultData(data.data);
      setResultModal(true);
    },
  });
  const handleClose = () => {
    setSelectedOptions({});
    setQuestions([]);
    setResultModal(false);
    onClose();
  };

  const handleOptionChange = (questionId, item) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: item.id,
    }));

    setQuestions((prevQuestions) => {
      const existingQuestionIndex = prevQuestions.findIndex(
        (q) => q.questionId === questionId
      );

      if (existingQuestionIndex !== -1) {
        // If the questionId exists, update its optionId
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[existingQuestionIndex] = {
          ...updatedQuestions[existingQuestionIndex],
          optionId: item.id,
        };
        return updatedQuestions;
      } else {
        return [
          ...prevQuestions,
          { questionId: questionId, optionId: item.id },
        ];
      }
    });
  };

  const handleFormSubmit = async () => {
    try {
      await updateQuizMutation.mutateAsync(questions);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    isOpen && (
      <Container className="fixed z-10 inset-0 overflow-y-auto">
        <FlexContainer className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Container
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
          >
            <Container className="absolute inset-0 bg-gray-500 opacity-75"></Container>
          </Container>

          <Container
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </Container>

          <Container
            className={` inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
          >
            <Container className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <Container className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <FlexContainer className="flex justify-between items-center">
                  <Text className="text-lg leading-6 font-medium text-gray-900">
                    {data?.title}
                  </Text>

                  <Button
                    onClick={handleClose}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
                  >
                    X
                  </Button>
                </FlexContainer>

                <Container className="mt-2">
                  <Text className="text-sm text-gray-500">
                    {formData?.description}
                  </Text>
                </Container>
                <Container className=" divide-gray-400  overflow-y-auto h-80 mt-4">
                  {formData?.questions?.map((qItem, index) => (
                    <>
                      <FlexContainer className={"justify-between items-center"}>
                        <Text className="text-sm text-gray-500">{`Question ${
                          index + 1
                        }: ${qItem.title}`}</Text>
                        <Text className="text-sm text-gray-500">{`Score: ${qItem.score}`}</Text>
                      </FlexContainer>

                      <Container className="px-4 py-2">
                        {qItem.options.map((item) => (
                          <RadioButton
                            required={true}
                            label={item.label}
                            checked={selectedOptions[qItem.id] === item.id}
                            htmlFor={item + "" + index}
                            onChange={() => handleOptionChange(qItem.id, item)}
                            className={"text-sm text-gray-500"}
                          />
                        ))}
                      </Container>
                    </>
                  ))}
                </Container>
              </Container>
            </Container>
            <FlexContainer className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <Button
                disabled={questions?.length !== formData?.questions.length}
                onClick={() => handleFormSubmit()}
                className={
                  questions?.length !== formData?.questions.length
                    ? "opacity-50 cursor-not-allowed bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                    : "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                }
              >
                Save
              </Button>
            </FlexContainer>
          </Container>
        </FlexContainer>
        <QuizResultModal
          isOpen={resultModal}
          onClose={() => handleClose()}
          data={resultData}
        />
      </Container>
    )
  );
};

export default QuizModal;
