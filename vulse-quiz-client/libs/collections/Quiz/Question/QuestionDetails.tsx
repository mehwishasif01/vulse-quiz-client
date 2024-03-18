import { QuestionProps } from "libs/types";
import { useState } from "react";
import {
  Container,
  Input,
  Button,
  RadioButton,
  FlexContainer,
  Text,
} from "../../../components";

const QuestionCreate: React.FC<QuestionProps> = ({
  question,
  onSaveButtonClicked,
}) => {
  const [optionValue, setOptionValue] = useState("");
  const [options, setOptions] = useState([]);
  const [questionData, setQuestionData] = useState({});
  const [selectedOption, setSelectedOption] = useState("");

  const onAddOptionButtonClick = () => {
    if (options.length < 4) {
      if (optionValue !== "") {
        setOptions((prev) => [...prev, { label: optionValue }]);
        setQuestionData((prevData) => ({
          ...prevData,
          options: [...options, { label: optionValue }],
        }));
        setOptionValue("");
      }
    }
  };

  const onRemoveOptionButtonClick = (label: any) => {
    setOptions(options.filter((item) => item.label !== label));
  };

  const handleInputChange = (fieldName, value) => {
    setQuestionData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setQuestionData((prevData) => ({
      ...prevData,
      correctOption: value,
    }));
  };

  const onSaveQuestion = () => {
    onSaveButtonClicked && onSaveButtonClicked(questionData);
  };

  return (
    <Container className="py-8">
      <Text>{question?.title}</Text>
      {/* <Input
        label="Question"
        placeholder="Enter your question"
        className="w-full"
        required={true}
        htmlFor="quizQuestion"
        onChange={(event) => {
          handleInputChange("title", event.target.value);
        }}
      />

      <Container>
        {question?.options.length > 0 &&
          question?.options.map((item, index) => (
            <FlexContainer className="items-center mb-1">
              <FlexContainer className=" min-w-1/4">
                <RadioButton
                  required={true}
                  label={item.label}
                  checked={item.label === selectedOption}
                  htmlFor={item + "" + index}
                  onChange={() => handleOptionChange(item.label)}
                />
              </FlexContainer>
              {/* 
              <Button
                className="ml-2 px-1 py-1 bg-red-700"
                onClick={() => onRemoveOptionButtonClick(item.label)}
              >
                <Text className="text-xs text-white">-</Text>
              </Button> */}
      {/* </FlexContainer>
          ))}
      </Container>

      <Container className="mt-2">
        <Input
          label="Question Score"
          required={true}
          htmlFor="questionScore"
          type={"number"}
          onChange={(event) => {
            handleInputChange("score", Number(event.target.value));
          }}
        />
        <Button onClick={() => onSaveQuestion()}>Save</Button>
      </Container> */}
    </Container>
  );
};

export default QuestionCreate;
