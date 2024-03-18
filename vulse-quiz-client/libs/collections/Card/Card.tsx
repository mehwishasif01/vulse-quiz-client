import {
  Alert,
  Button,
  Container,
  FlexContainer,
  Text,
} from "@libs/components";
import { CardProps } from "@libs/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { ConfirmationModal } from "../ConfirmationModal";

const Card: React.FC<CardProps> = ({ item, onButtonClick }) => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    value: false,
    type: "",
    message: "",
  });

  const { refetch }: any = useQuery({
    queryKey: ["quizzes"],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`),
  });

  const deleteQuizMutation: any = useMutation({
    mutationFn: (id: any) =>
      axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`, id),
    onSuccess: (data) => {
      setAlertMessage({
        value: true,
        type: "success",
        message: data.data.message,
      });
      setConfirmationModal(false);
    },
  });
  const handleDeleteQuiz = async (quizId) => {
    try {
      await deleteQuizMutation.mutateAsync(quizId);
      await refetch();
    } catch (error) {
      setAlertMessage({
        value: true,
        type: "error",
        message: error,
      });
    }
  };
  return (
    <>
      <Container className="bg-white p-4 rounded shadow-md">
        <FlexContainer className="mt-4 mb-4 flex justify-between flex-wrap">
          <Text className="text-xl font-semibold mb-2"> {item?.title}</Text>
          <Button
            onClick={() => setConfirmationModal(true)}
            className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
          >
            Delete
          </Button>
        </FlexContainer>

        <Text className="mb-2">{item?.description}</Text>
        <Text className="mb-2">Total Questions: {item?.questions.length}</Text>
        <Text className="mb-2">
          Total Score:
          {" " +
            item.questions.reduce(
              (accumulator, currentValue) => accumulator + currentValue.score,
              0
            )}
        </Text>
        <Button
          onClick={onButtonClick}
          className="  bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Start
        </Button>
      </Container>

      {alertMessage.value && (
        <Alert type={alertMessage.type} message={alertMessage.message} />
      )}
      <ConfirmationModal
        isOpen={confirmationModal}
        onConfirm={() => handleDeleteQuiz(item.id)}
        message="Are you sure you want to delete this quiz?"
        onClose={() => setConfirmationModal(false)}
      />
    </>
  );
};

export default Card;
