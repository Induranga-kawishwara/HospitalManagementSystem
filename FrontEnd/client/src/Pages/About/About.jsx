import React from "react";
import Doctor from "../../assets/doctor-group.png";
import SolutionStep from "../../components/SoulutionStep/SolutionStep";
import style from "./about.module.css";

function About() {
  return (
    <div className={style.about_section} id="about">
      <div className={style.about_image_content}>
        <img src={Doctor} alt="Doctor Group" className={style.about_image1} />
      </div>

      <div className={style.about_text_content}>
        <h3 className={style.about_title}>
          <span>About Us</span>
        </h3>
        <p className={style.about_description}>
          Welcome to Health Plus, your trusted partner for accessible and
          personalized healthcare. Our expert doctors offer online consultations
          and specialized services, prioritizing your well-being. Join us on
          this journey towards a healthier you.
        </p>

        <h4 className={style.about_text_title}>Your Solutions</h4>

        <SolutionStep
          title="Choose a Specialist"
          description="Find your perfect specialist and book with ease at Health Plus. Expert doctors prioritize your health, offering tailored care."
        />

        <SolutionStep
          title="Make a Schedule"
          description="Choose the date and time that suits you best, and let our dedicated team of medical professionals ensure your well-being with personalized care."
        />

        <SolutionStep
          title="Get Your Solutions"
          description="Our experienced doctors and specialists are here to provide expert advice and personalized treatment plans, helping you achieve your best possible health."
        />
      </div>
    </div>
  );
}

export default About;
