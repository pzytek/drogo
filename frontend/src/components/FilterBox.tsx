import React from "react";
import { Col, Row, Form, Collapse, InputGroup, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../slices/productsApiSlice";
import { setFiltersColumn } from "../slices/uiSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { FaFilter } from "react-icons/fa";
import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";
import { errorMessageFetching } from "../utils/helpers";

interface Category {
  name: string;
  qty: number;
}

const FilterBox: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filtersColumn } = useAppSelector((state) => state.ui);
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = searchParams.getAll("categories") || [];
  const availability = searchParams.get("availability") || "All";
  const price = searchParams.get("price") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const rating = searchParams.get("rating") || 0;

  const {
    data: { categoryItems = [] } = {},
    isLoading,
    error,
  } = useGetCategoriesQuery(null);

  const showFiltersHandler = () => {
    dispatch(setFiltersColumn(!filtersColumn));
  };

  const resetFiltersHandler = () => {
    setSearchParams({});
  };

  const handleFilterChange = (name: string, value: string) => {
    if (name !== "categories") {
      searchParams.set(name, value);
    } else {
      const isInCategories = categories.includes(value);
      if (isInCategories) {
        const newCategories = categories.filter(
          (category) => category !== value
        );
        searchParams.delete(name);
        newCategories.forEach((newCategory) => {
          searchParams.append(name, newCategory);
        });
      } else {
        searchParams.append(name, value);
      }
    }
    searchParams.delete("pageNumber");
    setSearchParams(searchParams);
  };

  return (
    <>
      <Button onClick={showFiltersHandler} className="mt-2 w-100">
        <FaFilter /> {filtersColumn ? "Hide filters" : "Show filters"}
      </Button>

      <Collapse in={filtersColumn}>
        <Row>
          <p
            className="cursor-pointer mb-0"
            style={{
              textDecoration: "underline",
              textAlign: "right",
              width: "100%",
            }}
            onClick={resetFiltersHandler}
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
                  <Message variant="danger">
                    {errorMessageFetching(error)}
                  </Message>
                </Message>
              ) : (
                <Col>
                  {categoryItems.map((category: Category) => (
                    <Form.Check
                      key={category.name}
                      type="checkbox"
                      className="my-2 text-nowrap"
                      label={`${category.name} (${category.qty})`}
                      id={category.name.split(" ").join("")}
                      name="categories"
                      checked={categories.includes(category.name)}
                      onChange={() =>
                        handleFilterChange("categories", category.name)
                      }
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
                {["All", "In stock", "Out of stock"].map(
                  (arrayAvailability) => (
                    <Form.Check
                      key={arrayAvailability}
                      type="radio"
                      className="my-2"
                      label={arrayAvailability}
                      id={arrayAvailability.split(" ").join("")}
                      name="availability"
                      checked={arrayAvailability === availability}
                      onChange={() =>
                        handleFilterChange("availability", arrayAvailability)
                      }
                    />
                  )
                )}
              </Col>
            </Form.Group>
          </Col>
          <Col xs={6} sm={3} md={12}>
            <Form.Group>
              <Form.Label as="legend">Rating</Form.Label>
              <Col>
                {["5.0", "4.5", "4.0"].map((arrayRating) => (
                  <Form.Check
                    key={arrayRating}
                    type="radio"
                    className="my-2"
                    label={<Rating value={Number(arrayRating)} reviews={0} />}
                    id={String(arrayRating)}
                    name="rating"
                    checked={arrayRating === rating}
                    onChange={() => handleFilterChange("rating", arrayRating)}
                  />
                ))}
              </Col>
            </Form.Group>
          </Col>
          <Col xs={6} sm={3} md={12}>
            <Form.Group>
              <Form.Label as="legend">Price</Form.Label>
              <Col>
                {["Ascending", "Descending"].map((arrayPrice) => (
                  <Form.Check
                    key={arrayPrice}
                    type="radio"
                    className="my-2"
                    label={arrayPrice}
                    id={arrayPrice.split(" ").join("")}
                    name="price"
                    checked={arrayPrice === price}
                    onChange={() => handleFilterChange("price", arrayPrice)}
                  />
                ))}
              </Col>
              <InputGroup className="mb-2" style={{ maxWidth: "120px" }}>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Min."
                  value={minPrice.toString()}
                  onChange={(e) =>
                    handleFilterChange("minPrice", e.target.value)
                  }
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
