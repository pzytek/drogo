import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
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
import { addToCart } from "../slices/cartSlice";
import { setCartOffcanvas } from "../slices/uiSlice";
import { Item } from "../types";

const CartPreview = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { cartItems } = useAppSelector((state) => state.cart);
  const { cartOffcanvas } = useAppSelector((state) => state.ui);

  const addToCartHandler = async (product: Item, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
    dispatch(setCartOffcanvas(false));
  };

  const cartHandler = () => {
    navigate("/cart");
    dispatch(setCartOffcanvas(false));
  };

  const handleClose = () => {
    dispatch(setCartOffcanvas(false));
  };

  return (
    <Offcanvas show={cartOffcanvas} onHide={handleClose} placement="end">
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
                        <Link to={`/product/${item._id}`} onClick={handleClose}>
                          {item.name}
                        </Link>
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
