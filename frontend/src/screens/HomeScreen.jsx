import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import CarouselTop from "../components/CarouselTop";
import FilterBox from "../components/FilterBox";
import Meta from "../components/Meta";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import filterProducts from "../utils/filterProducts";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { pageNumber, keyword } = useParams();

  const {
    data: { page, pages, products = [] } = {},
    isLoading,
    error,
  } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  const [filters, setFilters] = useState({
    categories: [],
    availability: "All",
    price: "",
    minPrice: "",
    rating: 0,
  });
  const filteredProducts = filterProducts(products, filters);

  const handleFiltersChange = (data) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...data }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      availability: "All",
      price: "",
      minPrice: "",
      rating: 0,
    });
  };

  return (
    <>
      <Row>
        <Col sm={12} md={2}>
          {" "}
          <FilterBox
            handleFiltersChange={handleFiltersChange}
            clearFilters={clearFilters}
            filters={filters}
          />
        </Col>
        <Col>
          {isLoading && <Loader />}
          {error && (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          )}
          {!isLoading && !error && (
            <>
              <Meta />
              <Row>
                {filteredProducts.length === 0 ? (
                  <Message>
                    No results found. Please adjust your search criteria.
                  </Message>
                ) : (
                  filteredProducts.map((product) => (
                    <Col key={product._id} sm={6} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))
                )}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            </>
          )}
        </Col>
      </Row>

      {!keyword ? (
        <CarouselTop />
      ) : (
        <Button className="btn mb-3" type="button" onClick={() => navigate(-1)}>
          Back
        </Button>
      )}
    </>
  );
};

export default HomeScreen;
