import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import FormInputElement from "../components/FormInputElement";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Meta from "../components/Meta";
import { useFormik } from "formik";
import { registerSchema } from "../schemas";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const formFields = [
    { label: "Name", id: "name", type: "text" },
    { label: "Email", id: "email", type: "email" },
    { label: "Password", id: "password", type: "password" },
    { label: "Confirm password", id: "confirmPassword", type: "password" },
  ];

  const onSubmit = async (values, actions) => {
    const { name, email, password } = values;

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      actions.resetForm();
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit,
    });

  return (
    <FormContainer>
      <Meta title={"Drogo - Register"} />
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit} autoComplete="off">
        {formFields.map((field) => (
          <FormInputElement
            field={field}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            errors={errors}
            values={values}
          />
        ))}
        <Button
          type="submit"
          variant="primary"
          className="my-2"
          disabled={isLoading}
        >
          Sign Up
        </Button>

        {isLoading && <Loader />}
      </Form>
      <Row>
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Log in here!
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
