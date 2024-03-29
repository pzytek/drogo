import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useMediaQuery } from "react-responsive";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Badge,
  Offcanvas,
  Image,
} from "react-bootstrap";
import { FaShoppingCart, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import logo from "../assets/logo2.png";
import scrollToTop from "../utils/scrollToTop";
import { toast } from "react-toastify";
import SearchBox from "./SearchBox";

const modeIconStyles = {
  className: "m-2 p-2 border rounded-circle cursor-pointer",
};

const Header = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { userInfo } = useAppSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(true);
  const offCanvasRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isXxxsScreen = useMediaQuery({ maxWidth: 320 });

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall(null).unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error as any);
    }
  };

  useEffect(() => {
    darkMode
      ? document.documentElement.setAttribute("data-bs-theme", "custom-dark")
      : document.documentElement.setAttribute("data-bs-theme", "custom-light");
  }, [darkMode]);

  const toggleMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  const closeMenuOffcanvas = () => {
    if (offCanvasRef.current.backdrop) {
      offCanvasRef.current.backdrop.click();
    }
  };

  return (
    <header>
      <Navbar expand="md" bg="body" className="fixed-top border-bottom">
        <Container>
          <LinkContainer to="/" onClick={scrollToTop}>
            <Navbar.Brand>
              {!isXxxsScreen && (
                <Image src={logo} alt="Drogo logo" className="logo" />
              )}
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="d-flex flex-row align-items-center">
            <Nav.Item onClick={toggleMode} style={{ marginLeft: "auto" }}>
              {darkMode ? (
                <FaMoon size={40} {...modeIconStyles} />
              ) : (
                <FaSun size={40} {...modeIconStyles} />
              )}
            </Nav.Item>
            <Navbar.Toggle
              aria-controls="offcanvasNavbar-expand-lg"
              className="border"
            />
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              aria-labelledby="offcanvasNavbarLabel-expand-lg"
              placement="end"
              ref={offCanvasRef}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1">
                  <LinkContainer
                    to="/cart"
                    className="d-flex align-items-center pr-2"
                    onClick={closeMenuOffcanvas}
                  >
                    <Nav.Link className="pr-1">
                      <FaShoppingCart className=" me-1" />{" "}
                      <div className="position-relative">
                        Cart
                        {cartItems.length > 0 && (
                          <Badge
                            pill
                            bg="info"
                            className="position-absolute number-align"
                          >
                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                          </Badge>
                        )}
                      </div>
                    </Nav.Link>
                  </LinkContainer>
                  {userInfo ? (
                    <NavDropdown
                      className="d-flex align-items-center pr-1 py-1"
                      title={userInfo.name}
                      id="username222"
                    >
                      <LinkContainer to="/profile" onClick={closeMenuOffcanvas}>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item
                        onClick={() => {
                          closeMenuOffcanvas();
                          logoutHandler();
                        }}
                      >
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <LinkContainer
                      to="/login"
                      className="d-flex align-items-center pr-2"
                      onClick={closeMenuOffcanvas}
                    >
                      <Nav.Link className="pr-1">
                        <FaUser className="me-1" /> Sign In
                      </Nav.Link>
                    </LinkContainer>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown
                      className="d-flex align-items-center pr-1 py-1"
                      title="Admin Functions"
                      id="adminmenu"
                    >
                      <LinkContainer
                        to="/admin/productlist"
                        onClick={closeMenuOffcanvas}
                      >
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer
                        to="/admin/userlist"
                        onClick={closeMenuOffcanvas}
                      >
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer
                        to="/admin/orderlist"
                        onClick={closeMenuOffcanvas}
                      >
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
                <SearchBox closeMenuOffcanvas={closeMenuOffcanvas} />
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
