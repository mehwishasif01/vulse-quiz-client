import React from "react";
import { InputProps } from "@libs/types";
import FlexContainer from "./FlexContainer";

const RadioButton: React.FC<InputProps> = ({
  label,
  className,
  placeholder,
  checked,
  onChange,
}) => {
  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event);
  };
  return (
    <FlexContainer>
      <input
        placeholder={placeholder}
        type="radio"
        checked={checked}
        onChange={(event) => onValueChange(event)}
        className={`${className}  border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:border-blue-500`}
      />
      <label className={`ml-2 block bg-red text-gray-700`}>{label}</label>
    </FlexContainer>
  );
};

export default RadioButton;
