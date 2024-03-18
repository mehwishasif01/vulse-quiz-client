import React from "react";
import { MainContainerProps } from "../types/components/index";

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  className,
}) => {
  return <main className={`${className}`}>{children}</main>;
};

export default MainContainer;
