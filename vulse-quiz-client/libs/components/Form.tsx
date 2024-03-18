import React from "react";
import { FormProps } from "../types/components/index";

const Form: React.FC<FormProps> = ({ children, className }) => {
  return <form className={`${className}`}>{children}</form>;
};

export default Form;
