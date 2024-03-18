import {
  Button,
  Input,
  TextArea,
  Text,
  Form,
  MainContainer,
  Container,
  FlexContainer,
  RadioButton,
} from "../../components";
import { useEffect, useState } from "react";
import { QuizFormProps } from "@libs/types";
import { QuestionDetails } from "./Question";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const QuizDetail: React.FC<QuizFormProps> = ({ submitQuizForm, quizData }) => {
  const [formData, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [questions, setQuestions] = useState([]);

  const updateQuizMutation: any = useMutation({
    mutationFn: (newQuizData: any) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizData.id}/results`,
        newQuizData
      ),
    onSuccess: () => {
      console.log("SUCCESSS");
    },
  });

  useEffect(() => {
    setFormData(quizData);
  }, [quizData]);

  const handleOptionChange = (questionId, item) => {
    setSelectedOption(item.label);
    setQuestions((prevData) => [
      ...prevData,
      { questionId: questionId, optionId: item.id },
    ]);
  };

  const handleFormSubmit = async () => {
    try {
      await updateQuizMutation.mutateAsync(questions);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <MainContainer className="mx-auto w-1/2 border mt-4">
      <Text className="text-4xl py-2 text-center">{formData?.title}</Text>
      <Text className="text-4xl py-2 text-center">{formData?.description}</Text>

      <Container className="px-10 py-4 divide-gray-400 mb-4 overflow-y-auto h-80">
        {formData?.questions?.map((qItem, index) => (
          <>
            <FlexContainer className={" justify-between items-center"}>
              <Text>{`Question ${index + 1}: ${qItem.title}`}</Text>
              <Text>{`Score: ${qItem.score}`}</Text>
            </FlexContainer>

            <Container className=" p-4">
              {qItem.options.map((item) => (
                <RadioButton
                  required={true}
                  label={item.label}
                  checked={item.label === selectedOption}
                  htmlFor={item + "" + index}
                  onChange={() => handleOptionChange(qItem.id, item)}
                />
              ))}
            </Container>
          </>
        ))}
        <Button
          onClick={() => handleFormSubmit()}
          className="w-full bg-green-400"
        >
          Save Quiz
        </Button>
      </Container>
    </MainContainer>
  );
};

export default QuizDetail;
