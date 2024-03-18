import { QuestionProps } from "libs/types";
import { useState } from "react";
import {
  Container,
  Input,
  Button,
  RadioButton,
  FlexContainer,
  Text,
} from "@libs/components";

const QuestionCreate: React.FC<QuestionProps> = ({
  onSaveButtonClicked,
  onRemoveButtonClicked,
  index,
}) => {
  const [optionValue, setOptionValue] = useState("");
  const [options, setOptions] = useState([]);
  const [questionData, setQuestionData] = useState({
    title: "",
    options: [],
    score: "",
  });
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

  const onDeleteQuestion = () => {
    onRemoveButtonClicked && onRemoveButtonClicked(index);
  };

  const checkDisabled = () => {
    return (
      questionData?.options.length < 4 ||
      questionData?.title === "" ||
      questionData?.score === "" ||
      selectedOption === ""
    );
  };

  return (
    <Container className="py-6">
      <Input
        label="Question *"
        placeholder="Enter your question"
        className="w-full mb-4"
        required={true}
        htmlFor="quizQuestion"
        onChange={(event) => {
          handleInputChange("title", event.target.value);
        }}
      />

      <Container className="mb-4">
        <Text>Options: {options.length}</Text>
        {options.length > 0 &&
          options.map((item, index) => (
            <FlexContainer className=" justify-between items-center mb-1">
              <FlexContainer className=" ">
                <RadioButton
                  required={true}
                  label={item.label}
                  checked={item.label === selectedOption}
                  htmlFor={item + "" + index}
                  onChange={() => handleOptionChange(item.label)}
                  className="ml-8"
                />
              </FlexContainer>

              <Button
                className="bg-red-500 text-white text-xs px-1 py-1 rounded hover:bg-red-600"
                onClick={() => onRemoveOptionButtonClick(item.label)}
              >
                <Text className="text-xs text-white">Delete</Text>
              </Button>
            </FlexContainer>
          ))}
      </Container>

      {options.length < 4 && (
        <FlexContainer className="mt-2 mb-4 items-end">
          <Input
            type={"text"}
            label="Option values"
            placeholder="Enter your option"
            value={optionValue}
            onChange={(event) => {
              event.preventDefault();
              setOptionValue(event?.target.value);
            }}
          />
          <FlexContainer className="ml-3">
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => onAddOptionButtonClick()}
            >
              Add
            </Button>
          </FlexContainer>
        </FlexContainer>
      )}

      <Container className="mt-2">
        <Input
          label="Score *"
          required={true}
          htmlFor="questionScore"
          className="mb-4"
          type={"number"}
          onChange={(event) => {
            handleInputChange("score", Number(event.target.value));
          }}
        />
        <FlexContainer className="justify-between">
          <Button
            disabled={checkDisabled()}
            className={
              checkDisabled()
                ? "opacity-50 cursor-not-allowed bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                : "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            }
            onClick={() => onSaveQuestion()}
          >
            Save Question
          </Button>
          {index !== 0 && (
            <Button
              onClick={() => onDeleteQuestion()}
              className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </Button>
          )}
        </FlexContainer>
      </Container>
    </Container>
  );
};

export default QuestionCreate;
