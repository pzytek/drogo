import React from "react";
import { Alert } from "react-bootstrap";

type MessageProps = {
  variant: string;
  children: string;
};

const Message: React.FC<MessageProps> = ({ variant, children }) => {
  return (
    <Alert className="my-2" variant={variant}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
