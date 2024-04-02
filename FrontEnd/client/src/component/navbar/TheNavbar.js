import React from "react";
import NavCartButton from "./NavCartButton";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-scroll";
import classes from "./TheNavbar.module.css";
import Logo from "../../assets/Logo/Logo.png";
import { Link as RouterLink } from "react-router-dom";

const TheNavbar = (props) => {
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
                to="why"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Why choose us
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
                About us
              </Link>
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
                Products
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
                Testimonials
              </Link>
            </Nav.Link>
            <Nav.Link href="#buttons" className={`${classes.nav__link}`}>
              <RouterLink
                to="/cart"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                <NavCartButton onClick={props.onShowCart} />
              </RouterLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
  //ENDS
};

export default TheNavbar;
