import { Button, Container, FlexContainer, Text } from "@libs/components";
import { ConfirmationModalProps } from "@libs/types";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  return (
    <>
      {isOpen && (
        <FlexContainer className="fixed inset-0 flex items-center justify-center z-50">
          <Container className="fixed inset-0 bg-black opacity-50"></Container>
          <Container className="absolute bg-white p-4 rounded-lg shadow-md">
            <Text className="mb-4">{message}</Text>
            <FlexContainer className="flex justify-end">
              <Button
                className=" mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className=" px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={onConfirm}
              >
                Confirm
              </Button>
            </FlexContainer>
          </Container>
        </FlexContainer>
      )}
    </>
  );
};

export default ConfirmationModal;
