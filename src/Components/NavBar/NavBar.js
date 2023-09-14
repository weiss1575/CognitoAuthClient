import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import W from "../../Assets/W.jpg";
import { useAuth } from "../../Auth/AuthContext";
import "./NavBar.css";

function MyNavBar(props) {
  const { isAuthenticated } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={W} className="logo rounded-circle" alt="" />
          AWS Cognito Auth
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {isAuthenticated ? (
              <>
                <Nav.Item>
                  <Link to="/changepassword" className="nav-link active">
                    Change Password
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/signout" className="nav-link active">
                    Sign Out
                  </Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Link to="/register" className="nav-link active">
                    Register
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/signin" className="nav-link active">
                    Sign In
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
