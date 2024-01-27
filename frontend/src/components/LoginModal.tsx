import React from "react";
import { Modal, Button } from "react-bootstrap";
import { setLoginModal } from "../slices/uiSlice";
import LoginScreen from "../screens/LoginScreen";
import { useAppSelector, useAppDispatch } from "../hooks";

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const { loginModal } = useAppSelector((state) => state.ui);

  const handleClose = () => {
    dispatch(setLoginModal(false));
  };

  return (
    <Modal
      show={loginModal}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <LoginScreen />
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
