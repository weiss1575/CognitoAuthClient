import axios from "axios";
import { API_URL } from "../Helpers/constants";
import authHeader from "./AuthHeader";

class AuthService {
  async signIn(signInRequest) {
    try {
      const response = await axios.post(API_URL + "auth/signIn", signInRequest);
      return response.data;
    } catch (error) {
      this.handleAuthApiError(error);
    }
  }

  async signUp(signUpRequest) {
    try {
      const response = await axios.post(API_URL + "auth/signUp", signUpRequest);
      return response.data;
    } catch (error) {
      this.handleAuthApiError(error);
    }
  }

  async changePassword(changePasswordRequest) {
    try {
      const response = await axios.post(
        API_URL + "auth/changePassword",
        changePasswordRequest,
        {
          headers: authHeader(),
        },
      );
      return response.data;
    } catch (error) {
      this.handleAuthApiError(error);
    }
  }

  async sendForgotPasswordCode(userName) {
    try {
      const response = await axios.get(
        API_URL + `auth/forgotPasswordCode?username=${userName}`,
      );
      return response.data;
    } catch (error) {
      this.handleAuthApiError(error);
    }
  }

  async setNewPassword(setNewPasswordRequest) {
    try {
      const response = await axios.post(
        API_URL + "auth/forgotPassword",
        setNewPasswordRequest,
      );
      return response.data;
    } catch (error) {
      this.handleAuthApiError(error);
    }
  }

  async signOut() {
    try {
      const response = await axios.delete(API_URL + "auth/signOut", {
        headers: authHeader(),
      });
      localStorage.removeItem("user");
      return response.data;
    } catch (error) {
      this.handleAuthApiError(error);
    }
  }

  async getMe() {
    try {
      const response = await axios.get(API_URL + "auth/me", {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      this.handleAuthApiError(error);
    }
  }

  handleAuthApiError(error) {
    if (error.response) {
      const message = error.response.data.message;
      if (message) {
        throw new Error(message);
      } else {
        throw new Error("An unknown error occurred.");
      }
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
}

export default new AuthService();
