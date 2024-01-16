import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import FormInputElement from "../components/FormInputElement";
import Meta from "../components/Meta";
import { saveShippingAddress } from "../slices/cartSlice";
import { useFormik } from "formik";
import { shippingSchema } from "../schemas";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formFields = [
    { label: "Address", id: "address", type: "text" },
    { label: "City", id: "city", type: "text" },
    { label: "Postal Code", id: "postalCode", type: "text" },
    { label: "Country", id: "country", type: "text" },
  ];

  const onSubmit = () => {
    dispatch(
      saveShippingAddress({
        address: values.address,
        city: values.city,
        postalCode: values.postalCode,
        country: values.country,
      })
    );
    navigate("/payment");
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        address: shippingAddress?.address || "",
        city: shippingAddress?.city || "",
        postalCode: shippingAddress?.postalCode || "",
        country: shippingAddress?.country || "",
      },
      validationSchema: shippingSchema,
      onSubmit,
    });

  return (
    <FormContainer>
      <Meta title={"Drogo - Shipping"} />
      <CheckoutSteps step3 step4 />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <FormInputElement
            field={field}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            errors={errors}
            values={values}
          />
        ))}
        <Button type="submit" variant="primary" className="my-2">
          Payment method
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
