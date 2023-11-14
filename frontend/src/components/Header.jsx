import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo2.png";

const Header = () => {
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
      <Navbar
        className="fixed-top border-bottom"
        bg="body"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="Drogo logo" className="logo" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button onClick={toggleMode} bg="body">
                {darkMode ? <FaMoon /> : <FaSun />}
              </Button>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/temp">
                <Nav.Link>Temp</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
