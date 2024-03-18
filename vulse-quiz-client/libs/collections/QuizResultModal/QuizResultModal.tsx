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

            <div className="text-center">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">Score</h2>
              <p className="text-lg text-green-500 mb-2">{data?.message}</p>
              <p className="text-lg">
                You scored{" "}
                <span className="text-blue-500 font-bold">{data?.score}</span>{" "}
                out of{" "}
                <span className="text-blue-500 font-bold">{data?.total}</span>
              </p>
            </div>
            {/* <Text className="text-xl font-bold mb-4">Score</Text>
            <Text>{data?.message}</Text>
            <Text>
              You scored {data?.score} out of {data.total}
            </Text> */}
          </Container>
        </FlexContainer>
      )}
    </>
  );
};

export default QuizResultModal;
