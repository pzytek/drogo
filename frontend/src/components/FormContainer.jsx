import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const FormContainer = ({ children }) => {
  const { loginModal } = useSelector((state) => state.ui);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={loginModal ? 10 : 8}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
