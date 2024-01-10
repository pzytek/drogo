import { useState } from "react";
import { Col, Row, Form, Collapse, InputGroup, Button } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { useGetCategoriesQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";

const FilterBox = ({ handleFiltersChange, clearFilters, filters }) => {
  const [showFilters, setShowFilters] = useState(true);

  const {
    data: { sortedCategories = [] } = {},
    isLoading,
    error,
  } = useGetCategoriesQuery();

  const showFiltersHandler = () => {
    setShowFilters((prevState) => !prevState);
  };

  const handleAvailabilityChange = (availability) => {
    handleFiltersChange({ availability });
  };

  const handlePriceChange = (price) => {
    handleFiltersChange({ price });
  };

  const handleMinPriceChange = (minPrice) => {
    handleFiltersChange({ minPrice });
  };

  const handleRatingChange = (rating) => {
    handleFiltersChange({ rating });
  };

  const handleCategoryChange = (addedCategory) => {
    const hasCategory = filters.categories.includes(addedCategory);

    const newCategories = hasCategory
      ? filters.categories.filter((category) => category !== addedCategory)
      : [...filters.categories, addedCategory];

    handleFiltersChange({ categories: newCategories });
  };

  return (
    <>
      <Button onClick={showFiltersHandler} className="mt-2 w-100">
        <FaFilter /> {showFilters ? "Hide filters" : "Show filters"}
      </Button>

      <Collapse in={showFilters}>
        <Row>
          <p
            className="cursor-pointer mb-0"
            style={{
              textDecoration: "underline",
              textAlign: "right",
              width: "100%",
            }}
            onClick={() => clearFilters()}
          >
            Reset
          </p>
          <Col xs={6} sm={3} md={12}>
            <Form.Group>
              <Form.Label as="legend">Categories</Form.Label>
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">
                  {error?.data?.message || error.error}
                </Message>
              ) : (
                <Col>
                  {sortedCategories.map((category) => (
                    <Form.Check
                      key={category}
                      type="checkbox"
                      className="my-2"
                      label={category}
                      id={category.split(" ").join("")}
                      name="categories"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                  ))}
                </Col>
              )}
            </Form.Group>
          </Col>
          <Col xs={6} sm={3} md={12}>
            <Form.Group>
              <Form.Label as="legend">Availability</Form.Label>
              <Col>
                {["All", "In stock", "Out of stock"].map((availability) => (
                  <Form.Check
                    key={availability}
                    type="radio"
                    className="my-2"
                    label={availability}
                    id={availability.split(" ").join("")}
                    name="availability"
                    checked={filters.availability === availability}
                    onChange={() => handleAvailabilityChange(availability)}
                  />
                ))}
              </Col>
            </Form.Group>
          </Col>
          <Col xs={6} sm={3} md={12}>
            <Form.Group>
              <Form.Label as="legend">Rating</Form.Label>
              <Col>
                {[5.0, 4.5, 4.0].map((rating) => (
                  <Form.Check
                    key={rating}
                    type="radio"
                    className="my-2"
                    label={<Rating value={rating} reviews={0} />}
                    id={String(rating)}
                    name="rating"
                    checked={rating === filters.rating}
                    onChange={() => handleRatingChange(rating)}
                  />
                ))}
              </Col>
            </Form.Group>
          </Col>
          <Col xs={6} sm={3} md={12}>
            <Form.Group>
              <Form.Label as="legend">Price</Form.Label>
              <Col>
                {["Ascending", "Descending"].map((price) => (
                  <Form.Check
                    key={price}
                    type="radio"
                    className="my-2"
                    label={price}
                    id={price.split(" ").join("")}
                    name="price"
                    checked={filters.price === price}
                    onChange={() => handlePriceChange(price)}
                  />
                ))}
              </Col>
              <InputGroup className="mb-2" style={{ maxWidth: "120px" }}>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Min."
                  value={filters.minPrice}
                  onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                  className="text-end"
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </Collapse>
    </>
  );
};

export default FilterBox;
