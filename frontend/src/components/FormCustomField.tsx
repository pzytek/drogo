import React from "react";
import { Form } from "react-bootstrap";
import { useField } from "formik";

interface FormCustomFieldProps {
  name: string;
  label: string;
  field: { id: string };
}

const FormCustomField: React.FC<FormCustomFieldProps> = ({
  label,
  field,
  ...props
}) => {
  const [formikField, meta] = useField(props);
  return (
    <Form.Group key={field.id} className="my-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...formikField}
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
