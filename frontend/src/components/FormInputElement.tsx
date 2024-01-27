import React from "react";
import { Form } from "react-bootstrap";

interface Field {
  id: string;
  label: string;
  type: string;
}

interface FormInputElementProps {
  field: Field;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: any) => void;
  touched: { [key: string]: any };
  errors: { [key: string]: any };
  values: { [key: string]: any };
}

const FormInputElement: React.FC<FormInputElementProps> = ({
  field,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
}) => {
  return (
    <Form.Group key={field.id} className="my-3">
      <Form.Label>{field.label}</Form.Label>
      <Form.Control
        id={field.id}
        type={field.type}
        value={values[field.id]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={`Enter ${
          field.label.split(" ")[1]
            ? field.label.split(" ")[1]
            : field.label.toLowerCase()
        }`}
        className={errors[field.id] && touched[field.id] ? "input-error" : ""}
      />
      {errors[field.id] && touched[field.id] && (
        <p className="error">{errors[field.id]}</p>
      )}
    </Form.Group>
  );
};

export default FormInputElement;
