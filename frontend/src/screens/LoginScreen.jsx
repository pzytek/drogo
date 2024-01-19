import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import FormInputElement from "../components/FormInputElement";
import InfoOverlay from "../components/InfoOverlay";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { setLoginModal } from "../slices/uiSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import { useAppSelector, useAppDispatch } from "../hooks";

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useAppSelector((state) => state.auth);

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const formFields = [
    { label: "Email", id: "email", type: "email" },
    { label: "Password", id: "password", type: "password" },
  ];

  const onSubmit = async () => {
    const { email, password } = values;

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      dispatch(setLoginModal(false));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: userInfo?.email || "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <FormContainer>
      <Meta title={"Drogo - Sign In"} />
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit} autoComplete="off">
        {formFields.map((field) => (
          <FormInputElement
            key={field.id}
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
          Sign In
        </Button>
        <InfoOverlay
          info={
            <div>
              <strong>Admin</strong>
              <p className="mb-0">Email: admin@email.com</p>
              <p className="mb-0">Password: 123456</p>
              <strong>User</strong>
              <p className="mb-0">Email: meryl@email.com</p>
              <p className="mb-1">Password: 123456</p>
            </div>
          }
        />
        {isLoading && <Loader />}
      </Form>
      <Row>
        <Col>
          Don't have account yet?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Sign up here!
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
