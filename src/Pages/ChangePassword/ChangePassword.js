import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import AuthService from "../../Auth/AuthService";
import Input from "../../Components/Input/Input";
import ServerFormError from "../../Components/ServerFormError/ServerFormError";
import { validateChangePassword } from "../../Helpers/validate";

function ChangePassword() {
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    previousPassword: "",
    proposedPassword: "",
  });
  const [changePasswordError, setChangePasswordError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
    let formErrors = validateChangePassword(formData);
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
    setChangePasswordError(null);
    if (validateInputs()) {
      AuthService.changePassword(formData)
        .then(() => {
          setIsLoading(false);
          logout();
          navigate("/signin");
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setChangePasswordError(error.message);
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
            <center>Change Password</center>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <Input
                id="previousPassword"
                name="previousPassword"
                type="password"
                className="form-control"
                placeholder="Current Password"
                value={formData.previousPassword}
                onChange={handleInputChange}
                error={formErrors.previousPassword}
              />
              <Input
                id="proposedPassword"
                name="proposedPassword"
                type="password"
                className="form-control"
                placeholder="New Password"
                value={formData.proposedPassword}
                onChange={handleInputChange}
                error={formErrors.proposedPassword}
              />
              <center>
                <ServerFormError error={changePasswordError} />
                {isLoading ? (
                  <i className="fas fa-spinner fa-pulse fa-2x"></i>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    Change Password
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

export default ChangePassword;
