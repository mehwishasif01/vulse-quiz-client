import { Quiz, Result } from "../objects";

export type QuestionProps = {
  onSaveButtonClicked: (data: any) => void;
  onRemoveButtonClicked: (data: number) => void;
  index: number;
};

export type CardProps = {
  item: Quiz;
  buttonText: string;
  onButtonClick: () => void;
};

export type QuizFormProps = {
  title: string;
  quizData?: any;
  submitQuizForm: (data) => void;
};

export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface QuizModalProps extends ModalProps {
  data: Quiz;
}

export interface ConfirmationModalProps extends ModalProps {
  onConfirm: () => void;
  message: string;
}

export interface QuizResultModalProps extends ModalProps {
  data: Result;
}
