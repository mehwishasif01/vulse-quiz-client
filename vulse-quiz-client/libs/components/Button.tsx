import React from "react";
import { ButtonProps } from "../types/components/index";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
}) => {
  const onButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onClick && onClick();
  };
  return (
    <button
      disabled={disabled}
      onClick={(event) => onButtonClick(event)}
      className={`${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
