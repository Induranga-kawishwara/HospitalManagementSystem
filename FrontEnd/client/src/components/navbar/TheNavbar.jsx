import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import classes from "./TheNavbar.module.css";
import Logo from "../../assets/Logo/Logo.png";
import "./navcs.css";

const TheNavbar = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleChatBtnClick = () => {
    navigate("/docsearch");
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
        onClick={() => setIsNavOpen(!isNavOpen)}
      />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={`${classes.nav__linkgroup} ms-auto`}>
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
              className="navbar-btn"
              type="button"
              onClick={handleChatBtnClick}
            >
              <FontAwesomeIcon icon={faCommentDots} /> Make Appointment
            </button>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TheNavbar;
