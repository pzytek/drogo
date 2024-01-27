import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image, Card } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { errorMessageFetching } from "../utils/helpers";

const CarouselTop = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const isMediumScreen = useMediaQuery({ maxWidth: 768 });

  interface Product {
    _id: string;
    image: string;
    name: string;
    price: number;
  }

  interface CardCarouselProps<T> {
    product: T;
  }

  const CardCarousel: React.FC<CardCarouselProps<Product>> = ({ product }) => {
    return (
      <Link to={`/product/${product._id}`}>
        <Card className="border-0">
          <Image fluid src={product.image} alt={product.name} />
          <Carousel.Caption
            className="d-flex align-items-center justify-content-center p-absolute w-100"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              left: "0",
              bottom: "0",
              height: "20%",
            }}
          >
            <h4 className=" mb-0 text-white ">
              {product.name} (${product.price})
            </h4>
          </Carousel.Caption>
        </Card>
      </Link>
    );
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{errorMessageFetching(error)}</Message>
  ) : (
    <>
      <h2>Top Eelectronics</h2>
      <Carousel pause="hover" fade>
        {products.map((product: Product, index: number, array: Product[]) => {
          const nextProduct =
            index < array.length - 1 ? array[index + 1] : array[0];

          return (
            <Carousel.Item key={product._id}>
              <div className="d-flex">
                <CardCarousel product={product} />
                {!isMediumScreen && <CardCarousel product={nextProduct} />}
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
};

export default CarouselTop;
