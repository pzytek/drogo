import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import Meta from "../../components/Meta";
import FormInputElement from "../../components/FormInputElement";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { Formik, Form } from "formik";
import { productSchema } from "../../schemas";
import FormCustomField from "../../components/FormCustomField";

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const uploadFileHandler = async (values, e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      console.log(e);
      values.image = res.image;
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const formFields = [
    { label: "Name", id: "name", type: "text" },
    { label: "Price", id: "price", type: "text" },
    { label: "Category", id: "category", type: "text" },
    { label: "Brand", id: "brand", type: "text" },
    { label: "Count", id: "count", type: "text" },
    { label: "Description", id: "description", type: "text" },
    { label: "Image", id: "image", type: "text" },
  ];

  const onSubmit = async (values) => {
    const { name, price, image, brand, category, description, count } = values;
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock: count,
      }).unwrap();
      toast.success("Product updated");
      refetch();
      navigate("/admin/productlist");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const initialValues = {
    name: product?.name || "",
    price: product?.price || "",
    image: product?.image || "",
    category: product?.category || "",
    brand: product?.brand || "",
    count: product?.countInStock || "",
    description: product?.description || "",
  };

  return (
    <>
      <Button className="btn mb-3" type="button" onClick={() => navigate(-1)}>
        Back
      </Button>
      <FormContainer>
        <Meta title={"Drogo - Product Edit"} />
        <h1>Edit product</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Formik
            enableReinitialize={true}
            validationSchema={productSchema}
            initialValues={initialValues}
            onSubmit={(values) => onSubmit(values)}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit} autoComplete="off">
                {formFields.map((field) => (
                  <FormCustomField
                    key={field.id}
                    name={field.id}
                    type={field.type}
                    label={field.label}
                  />
                ))}
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(e) => uploadFileHandler(props.values, e)}
                />
                {loadingUpload && <Loader />}
                {/* </Form.Group> */}
                <Button type="submit" className="my-2">
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </FormContainer>
    </>
  );
};
export default ProductEditScreen;
