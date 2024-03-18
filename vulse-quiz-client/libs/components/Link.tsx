import React from "react";
import { LinkProps } from "../types/components/index";

const Link: React.FC<LinkProps> = ({ children, className }) => {
  return <link className={`${className}`}>{children}</link>;
};

export default Link;
