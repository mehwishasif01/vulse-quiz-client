import React, { useEffect, useState } from "react";
import { AlertProps } from "../types/components/index";
import { Container, Text } from "./index";

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    // Clear the timeout when the component unmounts or showAlert changes
    return () => clearTimeout(timeout);
  }, []);
  let bgColorClass = "";
  let textColorClass = "";

  // Determine background and text color classes based on the alert type
  switch (type) {
    case "success":
      bgColorClass = "bg-green-100";
      textColorClass = "text-green-800";
      break;
    case "error":
      bgColorClass = "bg-red-100";
      textColorClass = "text-red-800";
      break;
    case "warning":
      bgColorClass = "bg-yellow-100";
      textColorClass = "text-yellow-800";
      break;
    default:
      bgColorClass = "bg-blue-100";
      textColorClass = "text-blue-800";
  }

  return (
    showAlert && (
      <Container className={`p-4 rounded-md ${bgColorClass} ${textColorClass}`}>
        <Text>{message}</Text>
      </Container>
    )
  );
};

export default Alert;
