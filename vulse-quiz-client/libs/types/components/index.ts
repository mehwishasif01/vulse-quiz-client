import React from "react";

interface ElementProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface ButtonElementProps extends ElementProps {
  disabled?: boolean;
}

interface InputElementProps extends ElementProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  htmlFor?: string;
  checked?: boolean;
  type?: string;
  onChange?: (event) => void;
  value?: string;
}

interface TextAreaElementProps extends InputElementProps {
  rows: number;
}

export type AlertProps = {
  type: string;
  message: string;
};

export type ButtonProps = ButtonElementProps;
export type ContainerProps = ElementProps;
export type FlexContainerProps = ElementProps;
export type MainContainerProps = ElementProps;
export type FormProps = ElementProps;
export type InputProps = InputElementProps;
export type TextAreaProps = TextAreaElementProps;
export type TextProps = ElementProps;
export type LinkProps = ElementProps;
