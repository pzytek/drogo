import { useState } from "react";
import { Col, Form } from "react-bootstrap";

const FilterBox = ({ handleFiltersChange }) => {
  const [minPrice, setMinPrice] = useState(null);
  return (
    <Form>
      <Form.Group>
        <Form.Label as="legend">Price</Form.Label>
        <Col>
          {["Ascending", "Descending"].map((method) => (
            <Form.Check
              key={method}
              type="radio"
              className="my-2"
              label={method}
              id={method.split(" ").join("")}
              name="paymentMethod"
            />
          ))}
        </Col>
      </Form.Group>
      <Form.Group controlId="minPrice" className="my-2">
        <Form.Control
          type="number"
          placeholder="Min. price"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(Number(e.target.value));
            handleFiltersChange({ minPrice: Number(e.target.value) });
          }}
        ></Form.Control>
      </Form.Group>
    </Form>
  );
};

export default FilterBox;
