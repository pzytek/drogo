import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Badge,
  Button,
  Form,
  Offcanvas,
} from "react-bootstrap";
import { FaShoppingCart, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import logo from "../assets/logo2.png";

const modeIconStyles = {
  className: "m-2 p-2 border rounded-circle cursor-pointer",
};

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
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

  return (
    <header>
      <Navbar expand="lg" bg="body" className="fixed-top border-bottom">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="Drogo logo" className="logo" />
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
                <Nav className="justify-content-end flex-grow-1">
                  <LinkContainer
                    to="/cart"
                    className="d-flex align-items-center px-2"
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
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <LinkContainer
                      to="/login"
                      className="d-flex align-items-center px-2"
                    >
                      <Nav.Link>
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
                      <LinkContainer to="/admin/productlist">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
                <Form onSubmit={searchHandler} className="d-flex">
                  <Form.Control
                    type="text"
                    name="q"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="What are you looking for..."
                    className="mr-sm-2 ml-sm-5"
                  ></Form.Control>
                  <Button type="submit" className="p-2 mx-2">
                    Search
                  </Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
