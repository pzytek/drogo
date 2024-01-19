import React, { ReactNode } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAppSelector } from "../hooks";

type FormContainerProps = {
  children: ReactNode;
};

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  const { loginModal } = useAppSelector((state) => state.ui);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={loginModal ? 10 : 6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
