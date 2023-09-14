import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Auth/AuthService";
import Input from "../../Components/Input/Input";
import ServerFormError from "../../Components/ServerFormError/ServerFormError";
import {
  validateForgotPassword,
  validateForgotPasswordCode,
} from "../../Helpers/validate";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    confirmationCode: "",
    username: "",
    password: "",
  });
  const [forgotPasswordError, setForgotPasswordError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState(false);
  const [sendCodeSuccessModal, setSendCodeSuccessModal] = useState(false);
  const [codeDeliveryDetails, setCodeDeliveryDetails] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
    let data = password ? formData : { username: formData.username };
    const formErrors = password
      ? validateForgotPassword(data)
      : validateForgotPasswordCode(data);
    setFormErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUsernameSubmit = (event) => {
    setIsLoading(true);
    setForgotPasswordError(null);
    if (validateInputs()) {
      AuthService.sendForgotPasswordCode(formData.username)
        .then((response) => {
          setIsLoading(false);
          setSendCodeSuccessModal(true);
          setCodeDeliveryDetails(response.codeDeliveryMessage);
        })
        .catch((error) => {
          setIsLoading(false);
          setForgotPasswordError(error.message);
        });
    } else {
      setIsLoading(false);
    }

    event.preventDefault();
  };

  const handleClick = (event) => {
    setFormData({
      confirmationCode: "",
      username: "",
      password: "",
    });
    setFormErrors({});
    setForgotPasswordError(null);
    setPassword(true);

    event.preventDefault();
  };

  const handleCodeClick = (event) => {
    setPassword(false);
    setForgotPasswordError(null);
    setFormErrors({});

    event.preventDefault();
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    setForgotPasswordError(null);

    if (validateInputs()) {
      AuthService.setNewPassword(formData)
        .then(() => {
          setIsLoading(false);
          navigate("/signin");
        })
        .catch((error) => {
          setIsLoading(false);
          setForgotPasswordError(error.message);
        });
    } else {
      setIsLoading(false);
    }

    event.preventDefault();
  };

  const handleModalClose = () => {
    setSendCodeSuccessModal(false);
    setPassword(true);
  };

  const SendCodeSuccessModal = () => {
    return (
      <Modal show={sendCodeSuccessModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="success">
            <i class="fas fa-check"></i> A code has been sent!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{codeDeliveryDetails}</Modal.Body>
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
        <SendCodeSuccessModal />
        {!password && !sendCodeSuccessModal && (
          <div className="card">
            <div className="card-header">
              <center>FORGOT PASSWORD</center>
            </div>
            <p className="card-text p-4">
              Enter your username below and we will send you a confirmation
              code.
            </p>
            <form onSubmit={handleUsernameSubmit}>
              <div className="card-body">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={formErrors.username}
                  novalidate={true}
                />
                <center>
                  <ServerFormError error={forgotPasswordError} />
                  {isLoading ? (
                    <i className="fas fa-spinner fa-pulse fa-2x"></i>
                  ) : (
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        Send Code
                      </button>
                      <button
                        onClick={handleClick}
                        className="btn btn-link code-link"
                      >
                        Already have a code?
                      </button>
                    </div>
                  )}
                </center>
              </div>
            </form>
          </div>
        )}
        {password && (
          <div className="card">
            <div className="card-header">
              <center>SET A NEW PASSWORD </center>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <Input
                  id="confirmationCode"
                  name="confirmationCode"
                  type="text"
                  className="form-control"
                  placeholder="Confirmation Code"
                  value={formData.confirmationCode}
                  onChange={handleInputChange}
                  error={formErrors.confirmationCode}
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
                  placeholder="New Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={formErrors.password}
                />
                <center>
                  <ServerFormError error={forgotPasswordError} />
                  {isLoading ? (
                    <i className="fas fa-spinner fa-pulse fa-2x"></i>
                  ) : (
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        Set Password
                      </button>
                      <button
                        onClick={handleCodeClick}
                        className="btn btn-link code-link"
                      >
                        Need a code?
                      </button>
                    </div>
                  )}
                </center>
              </div>
            </form>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default ForgotPassword;
