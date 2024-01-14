import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import InfoOverlay from "../components/InfoOverlay";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { setLoginModal } from "../slices/uiSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      dispatch(setLoginModal(false));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <Meta title={"Drogo - Sign In"} />
      <h1>Sign In</h1>
      <Form className="tutu" onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
