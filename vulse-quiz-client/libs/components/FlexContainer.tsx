import React from "react";
import { FlexContainerProps } from "../types/components/index";

const FlexContainer: React.FC<FlexContainerProps> = ({
  children,
  className,
}) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export default FlexContainer;
