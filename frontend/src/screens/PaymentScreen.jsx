import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod: paymentMethodSaved } = cart;

  const [paymentMethod, setPaymentMethod] = useState(paymentMethodSaved || "");
  const [warning, setWarning] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const handlePaymentMethodChange = (value) => {
    setWarning(false);
    setPaymentMethod(value);
    dispatch(savePaymentMethod(value));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (paymentMethod) {
      navigate("/placeorder");
    } else {
      setWarning(true);
    }
  };

  return (
    <>
      <CheckoutSteps step4 />
      <FormContainer>
        <Meta title={"Drogo - Payment Method"} />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              {[
                "PayPal",
                "Internet Transfers",
                "Electronic Check Payments",
              ].map((method) => (
                <Form.Check
                  key={method}
                  type="radio"
                  className="my-2"
                  label={method}
                  id={method.split(" ").join("")}
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => handlePaymentMethodChange(e.target.value)}
                />
              ))}
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
          {warning && (
            <Message variant="warning">Choose payment method</Message>
          )}
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
