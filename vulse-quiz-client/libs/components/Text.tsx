import React from "react";
import { TextProps } from "@libs/types";

const Text: React.FC<TextProps> = ({ children, className }) => {
  return <p className={` ${className}`}>{children}</p>;
};

export default Text;
