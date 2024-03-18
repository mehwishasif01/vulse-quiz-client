import { Card, Drawer, QuizModal } from "@libs/collections";
import { Quiz } from "@libs/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Alert,
  Button,
  Container,
  FlexContainer,
  Text,
} from "@libs/components";

import { useState } from "react";

const QuizListPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizData, setQuizData] = useState<Quiz>();
  // const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });

  const { data }: any = useQuery({
    queryKey: ["quizzes"],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`),
  });

  const onCardButtonClick = (data) => {
    setQuizData(data);
    setIsModalOpen(true);
  };

  const onCreateQuizButtonClick = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <FlexContainer className="flex flex-col md:flex-row h-screen">
      <FlexContainer className="flex-1  bg-purple-50 w-screen">
        <Container className="p-8 w-full">
          <FlexContainer className="flex justify-between items-center flex-wrap mb-8">
            <Text className="text-3xl font-bold text-purple-600 mb-4 max-w-1/2">
              Dashboard
            </Text>
            {data?.data.length > 0 && (
              <Button
                onClick={onCreateQuizButtonClick}
                className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700"
              >
                Create Quiz
              </Button>
            )}
          </FlexContainer>

          {data?.data.length > 0 ? (
            <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.data.map((item) => (
                <Card
                  item={item}
                  buttonText="Start"
                  onButtonClick={() => onCardButtonClick(item)}
                />
              ))}
            </Container>
          ) : (
            <FlexContainer className="flex flex-col items-center justify-center">
              <Text className="text-3xl font-bold text-purple-600 mb-4">
                🎉 Woohoo! No new quizzes for you! 🎉
              </Text>
              <Text className="text-lg text-center mb-4">
                But hey, you can always create one yourself! 😎
              </Text>
              <Button
                onClick={onCreateQuizButtonClick}
                className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700"
              >
                Let's Create!
              </Button>
            </FlexContainer>
          )}
        </Container>
      </FlexContainer>
      <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
      <QuizModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={quizData}
      />
    </FlexContainer>
  );
};
export default QuizListPage;
