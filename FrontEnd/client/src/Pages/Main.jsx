import About from "./About/About";
import Hero from "./Home/Home";
import Info from "./Info/Info";
import BookAppointment from "./BookAppointment/BookAppointment";
import Reviews from "./Reviews/Reviews";
import Doctors from "./DoctorList/Doctors";
import Slide from "../components/ImageSlider/ImageSlider";
import React, { useEffect } from "react";

function Main() {
  useEffect(() => {
    const handleScrollToSection = () => {
      const path = window.location.hash.substring(1);
      const targetSection = document.getElementById(path);
      if (targetSection) {
        setTimeout(() => {
          const sectionOffset = 100;
          const offsetTop = targetSection.offsetTop - sectionOffset;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }, 10); // Delay the calculation by 100 milliseconds
      }
    };

    handleScrollToSection(); // Scroll to section on initial load

    window.addEventListener("hashchange", handleScrollToSection);

    return () => {
      window.removeEventListener("hashchange", handleScrollToSection);
    };
  }, []);
  return (
    <div>
      <section id="home">
        <Slide />
      </section>
      <Hero />
      <section id="info">
        <Info />
      </section>
      <section id="about">
        <About />
      </section>
      <BookAppointment />
      <section id="reviews">
        <Reviews />
      </section>
      <section id="doctorspg">
        <Doctors />
      </section>
    </div>
  );
}

export default Main;
