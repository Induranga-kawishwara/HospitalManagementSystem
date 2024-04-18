import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import classes from "./TheNavbar.module.css";
import Logo from "../../assets/Logo/Logo.png";
import "./navcs1.css";

const TheNavbar = () => {
  const navigate = useNavigate();

  const handleChatBtnClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };
  const home = () => {
    navigate("/");
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
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={`${classes.nav__linkgroup} ms-auto`}>
          <Nav.Item
            className={`${classes.nav__link} ${classes.firstnav__link} me-4`}
          >
            <ScrollLink
              activeClass={classes.active}
              onClick={home}
              // to="/"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Home
            </ScrollLink>
          </Nav.Item>
          <Nav.Item className={`${classes.nav__link} me-4`}>
            <ScrollLink
              activeClass={classes.active}
              to="services"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Services
            </ScrollLink>
          </Nav.Item>
          <Nav.Item className={`${classes.nav__link} me-4`}>
            <ScrollLink
              activeClass={classes.active}
              to="about"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              About
            </ScrollLink>
          </Nav.Item>
          <Nav.Item className={`${classes.nav__link} me-4`}>
            <ScrollLink
              activeClass={classes.active}
              to="reviews"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Reviews
            </ScrollLink>
          </Nav.Item>
          <Nav.Item className={`${classes.nav__link} me-4`}>
            <ScrollLink
              activeClass={classes.active}
              to="doctors"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Doctors
            </ScrollLink>
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
