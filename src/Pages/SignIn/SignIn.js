import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import AuthService from "../../Auth/AuthService";
import Input from "../../Components/Input/Input";
import ServerFormError from "../../Components/ServerFormError/ServerFormError";
import { validateSignIn } from "../../Helpers/validate";
import "./SignIn.css";
import { Container } from "react-bootstrap";

function SignIn() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    const formErrors = validateSignIn(formData);
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
    setLoginError(null);
    if (validateInputs()) {
      AuthService.signIn(formData)
        .then((tokens) => {
          login(tokens);
          setIsLoading(false);
          navigate("/me");
        })
        .catch((error) => {
          setIsLoading(false);
          setLoginError(error.message);
        });
    } else {
      setIsLoading(false);
    }

    event.preventDefault();
  };

  return (
    <React.Fragment>
      <div className="my-container d-flex align-items-center justify-content-center">
        <div className="card">
          <div className="card-header">
            <center>SIGN IN</center>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
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
              <center>
                <ServerFormError error={loginError} />
                {isLoading ? (
                  <i className="fas fa-spinner fa-pulse fa-2x"></i>
                ) : (
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      Sign In
                    </button>
                    <Link to="/forgotpassword" className="forgot-link">
                      Forgot Password?
                    </Link>
                  </div>
                )}
              </center>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SignIn;
