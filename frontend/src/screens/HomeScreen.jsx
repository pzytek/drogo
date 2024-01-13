import { useSearchParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import CarouselTop from "../components/CarouselTop";
import FilterBox from "../components/FilterBox";
import Meta from "../components/Meta";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomeScreen = () => {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const pageNumber = searchParams.get("pageNumber") || "";
  const categories = searchParams.getAll("categories") || [];
  const availability = searchParams.get("availability") || "All";
  const price = searchParams.get("price") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const rating = searchParams.get("rating") || 0;

  const {
    data: { pages, products = [] } = {},
    isLoading,
    error,
  } = useGetProductsQuery({
    pageNumber,
    keyword,
    categories,
    availability,
    price,
    minPrice,
    rating,
  });

  return (
    <>
      <Row>
        <Col sm={12} md={3} lg={2}>
          {" "}
          <FilterBox />
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
                {products.length === 0 ? (
                  <Message>
                    No results found. Please adjust your search criteria.
                  </Message>
                ) : (
                  products.map((product) => (
                    <Col key={product._id} sm={6} md={6} lg={4}>
                      <Product product={product} />
                    </Col>
                  ))
                )}
              </Row>
              {products.length > 0 && <Paginate pages={pages} />}
            </>
          )}
        </Col>
      </Row>
      <CarouselTop />
    </>
  );
};

export default HomeScreen;
