import React from "react";
import { ContainerProps } from "@libs/types";

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <div className={`${className}`}>{children}</div>;
};

export default Container;
