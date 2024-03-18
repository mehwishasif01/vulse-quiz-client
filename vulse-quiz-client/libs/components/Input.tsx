import React from "react";
import { InputProps } from "@libs/types";

const Input: React.FC<InputProps> = ({
  label,
  className,
  placeholder,
  onChange,
  required,
  htmlFor,
  type,
  value,
}) => {
  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onChange && onChange(event);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
    }
  };

  return (
    <div>
      <label htmlFor={htmlFor} className="block text-gray-700">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          id={htmlFor}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={(event) => onValueChange(event)}
          onKeyPress={(event) => handleKeyPress(event)}
          className={`${className} border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:border-blue-500`}
        />
      </div>
    </div>
  );
};

export default Input;
