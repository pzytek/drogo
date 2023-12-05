import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  Button,
  Form,
  Offcanvas,
} from "react-bootstrap";
import { FaShoppingCart, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo2.png";

const modeIconStyles = {
  className: "m-2 p-2 border rounded-circle cursor-pointer",
};

const Header2 = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    darkMode
      ? document.documentElement.setAttribute("data-bs-theme", "custom-dark")
      : document.documentElement.setAttribute("data-bs-theme", "custom-light");
  }, [darkMode]);

  const toggleMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  return (
    <header>
      <Navbar expand="lg" bg="body" className="fixed-top border-bottom">
        <Container>
          <Navbar.Brand href="#">
            <img src={logo} alt="Drogo logo" className="logo" />
          </Navbar.Brand>
          <Nav className="d-flex flex-row align-items-center">
            <Nav.Item onClick={toggleMode} style={{ marginLeft: "auto" }}>
              {darkMode ? (
                <FaMoon size={40} {...modeIconStyles} />
              ) : (
                <FaSun size={40} {...modeIconStyles} />
              )}
            </Nav.Item>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              aria-labelledby="offcanvasNavbarLabel-expand-lg"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <LinkContainer
                    to="/cart"
                    className="d-flex align-items-center"
                  >
                    <Nav.Link className="position-relative">
                      <FaShoppingCart className="mx-1 my-2" /> Cart
                      {cartItems.length > 0 && (
                        <Badge
                          pill
                          bg="info"
                          className="position-absolute number-align"
                        >
                          {cartItems.reduce((a, c) => a + c.qty, 0)}
                        </Badge>
                      )}
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer
                    to="/login"
                    className="d-flex align-items-center"
                  >
                    <Nav.Link>
                      <FaUser className="mx-1 my-2" /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    className="me-2"
                    aria-label="Search"
                    placeholder="sdlkfjdlk"
                  />
                  <Button className="btn">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header2;
