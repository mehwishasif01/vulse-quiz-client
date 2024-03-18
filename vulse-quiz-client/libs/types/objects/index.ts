export type Option = {
  id?: string;
  label: string;
};

export type Question = {
  id?: string;
  title: string;
  options: Option[];
  score: number;
};

export type Quiz = {
  id?: string;
  title: string;
  description: string;
  questions: Question[];
};

export type Result = {
  message: string;
  score: number;
  total: number;
};
