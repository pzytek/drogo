import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import { addToCart } from "../slices/cartSlice";
import { setLoginModal, setCartOffcanvas } from "../slices/uiSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { showLoginModal, showCartOffcanvas } = useSelector(
    (state) => state.ui
  );

  const addToCartHandler = () => {
    if (userInfo) {
      const productIndex = cartItems.findIndex((x) => x._id === product._id);
      if (productIndex === -1) {
        dispatch(addToCart({ ...product, qty: 1 }));
      }
      dispatch(setCartOffcanvas(true));
    } else {
      dispatch(setLoginModal(true));
    }
  };
  return (
    <Card className="my-2 p-3 rounded">
      <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{
            aspectRatio: "16/13",
            objectFit: "cover",
            objectPosition: "50% 0%",
          }}
        />
        <Card.Body className="p-1">
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <Rating value={product.rating} reviews={product.numReviews} />
          </Card.Text>
          <Card.Text as="h4">${product.price}</Card.Text>
        </Card.Body>
      </Link>
      <Button disabled={product.countInStock === 0} onClick={addToCartHandler}>
        {product.countInStock === 0 ? "Out of stock" : "Add to cart"}
      </Button>
    </Card>
  );
};

export default Product;
