import React from "react";
import { Container, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import notFound from "../assets/not-found.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <h2>404 - Not Found</h2>
      <Button
        variant="primary"
        className="d-block my-2"
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home page
      </Button>
      <Image src={notFound} alt="not found image" fluid />
    </Container>
  );
};

export default NotFound;
