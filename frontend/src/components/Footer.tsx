import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container className="text-center">
        <Row>
          <Col className="text-center">
            <p className="my-2">Drogo &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
