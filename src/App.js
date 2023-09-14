import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Auth/AuthContext";
import RouteGuard from "./Auth/RouteGuard";
import NavBar from "./Components/NavBar/NavBar";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Home from "./Pages/Home/Home";
import Me from "./Pages/Me/Me";
import Register from "./Pages/Register/Register";
import SignIn from "./Pages/SignIn/SignIn";
import SignOut from "./Pages/SignOut/SignOut";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* Public Routes  */}
          <Route index element={<Home />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/signout" element={<SignOut />} />
          {/* Private Routes */}
          <Route element={<RouteGuard />}>
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/me" element={<Me />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
