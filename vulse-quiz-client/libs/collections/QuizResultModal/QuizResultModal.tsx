import { Button, Container, FlexContainer, Text } from "@libs/components";
import { QuizResultModalProps } from "@libs/types";

const QuizResultModal: React.FC<QuizResultModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  return (
    <>
      {isOpen && (
        <FlexContainer className="fixed inset-0 flex items-center justify-center z-50">
          <Container className="fixed inset-0 bg-black opacity-50"></Container>
          <Container
            className={`absolute text-center bg-white p-4 rounded-lg shadow-md`}
          >
            <FlexContainer className="flex justify-end">
              <Button
                onClick={onClose}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
              >
                X
              </Button>
            </FlexContainer>

            <Container className="text-center">
              <Text className="text-2xl font-bold text-purple-600 mb-4">
                Score
              </Text>
              <Text className="text-lg text-gray-400 mb-2">
                {data?.message}
              </Text>
              <Text className="text-lg text-gray-400">
                You scored{" "}
                <Text className="text-purple-500 font-bold">{data?.score}</Text>{" "}
                out of{" "}
                <Text className="text-purple-500 font-bold">{data?.total}</Text>
              </Text>
            </Container>
          </Container>
        </FlexContainer>
      )}
    </>
  );
};

export default QuizResultModal;
