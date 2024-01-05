import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Offcanvas,
} from "react-bootstrap";

import Message from "./Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";
const CartPreview = ({ showOffcanvas, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const cartHandler = () => {
    navigate("/cart");
  };

  return (
    <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart preview</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row>
          <Col>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty. <Link to="/">Go back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id} className="px-0">
                    <Row>
                      <Col xs={3}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        ></Image>
                      </Col>
                      <Col xs={5}>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col xs={2}>${item.price}</Col>
                      <Col xs={2}>
                        {" "}
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h5>
                    Items in cart:{` `}
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </h5>
                  <h5 className="mb-0">
                    Total price: $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={cartHandler}
                  >
                    Cart page
                  </Button>
                  <Button
                    type="button"
                    className="btn-block mx-1"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            )}
          </Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default CartPreview;
