import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link as RouterLink } from "react-router-dom";
import classes from "./TheNavbar.module.css";
import Logo from "../../assets/Logo/Logo.png";
import "./navcs1.css";
import axios from "axios";

const TheNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleChatBtnClick = async () => {
    const userDataString = localStorage.getItem("user");
    console.log(userDataString);
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        console.log(userData.id);
        await axios.delete(`http://localhost:5000/auth/${userData.id}`);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
      } catch (error) {
        console.error("Failed to delete tokens:", error);
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  const handleNavItemClicked = () => {
    setIsNavOpen(false);
  };

  return (
    <Navbar
      expand="xl"
      className={`${classes.navbar} fixed-top`}
      data-aos="fade-down"
      data-aos-easing="ease-out"
      data-aos-duration="2000"
    >
      <Navbar.Brand className={classes.navbar_brand}>
        <RouterLink to="/">
          <img
            src={Logo}
            alt="My logo"
            style={{ width: "200px", height: "auto" }}
          />
        </RouterLink>
      </Navbar.Brand>

      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className={classes.toggle}
        onClick={() => setIsNavOpen(!isNavOpen)} // Toggle navigation bar visibility when toggle button is clicked
      />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav
          className={`${classes.nav__linkgroup} ms-auto`}
          // style={{ display: isNavOpen ? "block" : "none" }}
          // nathiwenawa utto
        >
          <Nav.Item
            className={`${classes.nav__link} ${classes.firstnav__link} me-4`}
            onClick={handleNavItemClicked}
          >
            <li className="nav-item">
              <a href="/#home">Home</a>
            </li>
          </Nav.Item>
          <Nav.Item
            className={`${classes.nav__link} me-4`}
            onClick={handleNavItemClicked}
          >
            <li className="nav-item">
              <a href="/#info">Services</a>
            </li>
          </Nav.Item>
          <Nav.Item
            className={`${classes.nav__link} me-4`}
            onClick={handleNavItemClicked}
          >
            <li className="nav-item">
              <a href="/#about">About</a>
            </li>
          </Nav.Item>
          <Nav.Item
            className={`${classes.nav__link} me-4`}
            onClick={handleNavItemClicked}
          >
            <li className="nav-item">
              <a href="/#reviews">Reviews</a>
            </li>
          </Nav.Item>
          <Nav.Item
            className={`${classes.nav__link} me-4`}
            onClick={handleNavItemClicked}
          >
            <li className="nav-item">
              <a href="/#doctorspg">Doctors</a>
            </li>
          </Nav.Item>
          <div className="center-container">
            <button
              className="navbar-btn1"
              type="button"
              onClick={handleChatBtnClick}
            >
              Logout
            </button>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TheNavbar;
