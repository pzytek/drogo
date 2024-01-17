import React from "react";
import { Form } from "react-bootstrap";
import { useField } from "formik";

const FormCustomField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group key={field.id} className="my-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...field}
        {...props}
        placeholder={`Enter ${
          label.split(" ")[1] ? label.split(" ")[1] : label.toLowerCase()
        }`}
        className={meta.error && meta.touched ? "input-error" : ""}
      />
      {meta.error && meta.touched && <p className="error">{meta.error}</p>}
    </Form.Group>
  );
};

export default FormCustomField;
