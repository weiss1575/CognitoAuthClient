import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Auth/AuthService";
import Input from "../../Components/Input/Input";
import ServerFormError from "../../Components/ServerFormError/ServerFormError";
import { validateRegister } from "../../Helpers/validate";

function Register(props) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [registerError, setRegisterError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [signUpSuccessModal, setSignUpSuccessModal] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    let formErrors = validateRegister(formData);
    setFormErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    setRegisterError(null);
    if (validateInputs()) {
      AuthService.signUp(formData)
        .then(() => {
          setIsLoading(false);
          setSignUpSuccessModal(true);
        })
        .catch((error) => {
          setIsLoading(false);
          setRegisterError(error.message);
        });
    } else {
      setIsLoading(false);
    }

    event.preventDefault();
  };

  const handleModalClose = () => {
    setSignUpSuccessModal(false);
    navigate("/signin");
  };

  const SignUpSuccessModal = () => {
    return (
      <Modal show={signUpSuccessModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="success">
            <i class="fas fa-check"></i> You are almost set!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please check your email for your account verification link.
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleModalClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <React.Fragment>
      <div className="my-container d-flex align-items-center justify-content-center">
        <SignUpSuccessModal />
        <div className="card">
          <div className="card-header">
            <center>REGISTER</center>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <Input
                id="email"
                name="email"
                type="text"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                error={formErrors.email}
                novalidate={true}
              />
              <Input
                id="username"
                name="username"
                type="username"
                className="form-control"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                error={formErrors.username}
              />
              <Input
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                error={formErrors.password}
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={formErrors.confirmPassword}
              />
              <center>
                <ServerFormError error={registerError} />
                {isLoading ? (
                  <i className="fas fa-spinner fa-pulse fa-2x"></i>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    Register
                  </button>
                )}
              </center>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
