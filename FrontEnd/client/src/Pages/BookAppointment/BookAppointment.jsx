import React from "react";
import Doctor from "../../assets/doctor-book-appointment.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import style from "./bookAppointment.module.css";

function BookAppointment() {
  const navigate = useNavigate();

  const handleBookAppointmentClick = () => {
    navigate("/docsearch");
  };

  return (
    <div className={style.ba_section}>
      <div className={style.ba_image_content}>
        <img src={Doctor} alt="Doctor Group" className={style.ba_image1} />
      </div>

      <div className={style.ba_text_content}>
        <h3 className={style.ba_title}>
          <span>Why Choose Health</span>
        </h3>
        <p className={style.ba_description}>
          Discover the reasons to choose Health Plus for your healthcare needs.
          Experience expert care, convenience, and personalized solutions,
          making your well-being our top priority. Join us on a journey to
          better health and a happier life.
        </p>

        <p className={`${style.ba_checks} ${style.ba_check_first}`}>
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />{" "}
          Best Professional Doctors
        </p>
        <p className={style.ba_checks}>
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />{" "}
          Emergency Care
        </p>
        <p className={style.ba_checks}>
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />{" "}
          24/7 Support Live Chat
        </p>
        <p className={`${style.ba_checks} ${style.ba_check_last}`}>
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />{" "}
          Enrollment Easy and Quick
        </p>

        <button
          className="text_appointment_btn"
          type="button"
          onClick={handleBookAppointmentClick}
        >
          <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
        </button>
      </div>
    </div>
  );
}

export default BookAppointment;
