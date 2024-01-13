import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import Meta from "../../components/Meta";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const ProductListScreen = () => {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("pageNumber");

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
    keyword: "",
    categories: [],
    availability: "All",
    price: "",
    minPrice: "",
    rating: 0,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  const createProductHandler = async () => {
    try {
      await createProduct();
      refetch();
      toast.success("Sample product created");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteProductHandler = async (id) => {
    try {
      await deleteProduct(id);
      refetch();
      toast.success("Product deleted");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Meta title={"Drogo - Products List"} />
      <Row className="align-items-center">
        <Col>
          <h1> Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit />
            Create product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button
                        variant="light"
                        className="btn-sm mx-2 my-1 border"
                      >
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm my-1"
                      onClick={() => {
                        deleteProductHandler(product._id);
                      }}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            {loadingCreate && <Loader />}
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
