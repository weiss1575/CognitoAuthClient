import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import AuthService from "../../Auth/AuthService";

function SignOut() {
  const [signOutSuccessModal, setSignOutSuccessModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.signOut()
      .then(() => {
        console.log("User signed out.");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        logout();
        setSignOutSuccessModal(true);
      });
  }, []);

  const handleModalClose = () => {
    setSignOutSuccessModal(false);
    navigate("/");
  };

  const SignOutSuccessModal = () => {
    return (
      <Modal show={signOutSuccessModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="success">
            <i class="fas fa-check"></i> Signed Out
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>You have successfully signed out!</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleModalClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  };

  return <SignOutSuccessModal />;
}

export default SignOut;
