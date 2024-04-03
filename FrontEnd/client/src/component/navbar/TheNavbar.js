import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import NavCartButton from "./NavCartButton";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-scroll";
import classes from "./TheNavbar.module.css";
import Logo from "../../assets/Logo/Logo.png";
import { Link as RouterLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "./navcs.css";


const TheNavbar = (props) => {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      toast.info("Experiencing high traffic, Please wait a moment.", {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    }
  };

  //Layout and structure of the navbar to be passed to THENAV component
  return (
    <>
      <Navbar
        expand="xl"
        className={`${classes.navbar} fixed-top`}
        data-aos="fade-down"
        data-aos-easing="ease-out"
        data-aos-duration="2000"
      >
        <Navbar.Brand className={classes.navbar_brand}>
          <RouterLink
            to="/"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            <img
              src={Logo}
              alt="My logo"
              style={{ width: "200px", height: "auto" }}
            ></img>
          </RouterLink>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={classes.toggle}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${classes.nav__linkgroup} ms-auto`}>
            <Nav.Link
              className={`${classes.nav__link} ${classes.firstnav__link} me-4`}
            >
              <Link
                activeClass={classes.active}
                to="hero"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link className={`${classes.nav__link} me-4`}>
              <Link
                activeClass={classes.active}
                to="services"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Services
              </Link>
            </Nav.Link>

            <Nav.Link className={`${classes.nav__link} me-4`}>
              <Link
                activeClass={classes.active}
                to="about"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                About              </Link>
            </Nav.Link>
            <Nav.Link className={`${classes.nav__link} me-4`}>
              <Link
                activeClass={classes.active}
                to="products"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Reviews
              </Link>
            </Nav.Link>            
            <Nav.Link className={`${classes.nav__link} me-4`}>
              <Link
                activeClass={classes.active}
                to="testimonials"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Doctors
              </Link>
            </Nav.Link>


<button
        className="navbar-btn"
        type="button"
        disabled={isButtonDisabled}
        // onClick={handleChatBtnClick}
      >
        <FontAwesomeIcon icon={faCommentDots} /> Make Appoinment
      </button>


          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
  //ENDS
};

export default TheNavbar;
