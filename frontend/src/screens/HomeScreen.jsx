import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import CarouselTop from "../components/CarouselTop";
import CartPreview from "../components/CartPreview";
import FilterBox from "../components/FilterBox";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { pageNumber, keyword } = useParams();

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    latest: false,
    price: false,
    popularity: false,
    stars: false,
    minPrice: 0,
  });

  useEffect(() => {
    if (!isLoading) {
      setFilteredProducts(data.products);
    }
    if (filters.minPrice > 0) {
      filteredProducts = filteredProducts.sort(
        (x) => x.price >= filters.minPrice
      );
      setFilteredProducts(filteredProducts);
    }
    console.log("effected");
  }, [isLoading, filters]);

  const handleFiltersChange = (data) => {
    setFilters({ ...filters, ...data });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            {" "}
            <Col md={2}>
              <h3>Filters</h3>
              <FilterBox handleFiltersChange={handleFiltersChange} />
            </Col>
            <Col>
              <Row>
                {filteredProducts.length === 0 ? (
                  <Message>
                    No results found. Please adjust your search criteria.
                  </Message>
                ) : (
                  filteredProducts.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4}>
                      <Product product={product} handleShow={handleShow} />
                    </Col>
                  ))
                )}
              </Row>
            </Col>
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
          {!keyword ? (
            <CarouselTop />
          ) : (
            <Button
              className="btn mb-3"
              type="button"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          )}
        </>
      )}

      <CartPreview showOffcanvas={showOffcanvas} handleClose={handleClose} />
    </>
  );
};

export default HomeScreen;
