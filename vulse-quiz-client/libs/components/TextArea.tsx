import React from "react";
import { TextAreaProps } from "@libs/types";

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  value,
  rows,
  className,
  onChange,
}) => {
  const onValueChange = (event) => {
    event.preventDefault();
    onChange && onChange(event);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
    }
  };
  return (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <div className="mt-2">
        <textarea
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={(event) => onValueChange(event)}
          onKeyPress={(event) => handleKeyPress(event)}
          className={`${className} border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:border-blue-500 w-full`}
        />
      </div>
    </div>
  );
};

export default TextArea;
