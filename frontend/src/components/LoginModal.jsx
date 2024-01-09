import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { setLoginModal } from "../slices/uiSlice";
import LoginScreen from "../screens/LoginScreen";

const LoginModal = () => {
  const dispatch = useDispatch();
  const { loginModal } = useSelector((state) => state.ui);

  const handleClose = () => {
    dispatch(setLoginModal(false));
  };

  return (
    <Modal
      show={loginModal}
      onHide={handleClose}
      size="md"
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
