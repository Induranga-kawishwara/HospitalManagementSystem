import React, { useEffect, useState } from "react";
import Doctor from "../../assets/doctor-picture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../redux/actions";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);
  const startYear = 2010;
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [yearsOfExperience, setYearsOfExperience] = useState(
    currentYear - startYear
  );
  const dispatch = useDispatch();
  const doctorList = useSelector((state) => state.doctors);

  const scrollToTop = () => {
    const scrollToTopAnimation = () => {
      const currentPosition = window.scrollY;
      if (currentPosition > 0) {
        window.scrollTo(0, currentPosition - currentPosition / 10);
        window.requestAnimationFrame(scrollToTopAnimation);
      }
    };
    window.requestAnimationFrame(scrollToTopAnimation);
  };

  const handleBookAppointmentClick = () => {
    navigate("/docsearch");
  };

  useEffect(() => {
    const onPageScroll = () => {
      setGoUp(window.scrollY > 600);
    };

    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/users/Doctor");
        dispatch(fetchDoctors(result.data));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
      setYearsOfExperience(currentYear - startYear);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentYear, startYear]);

  return (
    <div>
      <div className={style.section_container}>
        <div className={style.hero_section}>
          <div className={style.text_section}>
            <p className={style.text_headline}>❤️ Health comes first</p>
            <h2 className={style.text_title}>
              Find your Doctor and make an Appointments
            </h2>
            <p className={style.text_descritpion}>
              Talk to online doctors and get medical advice, online
              prescriptions, refills and medical notes within minutes. On-demand
              healthcare services at your fingertips.
            </p>

            <button
              className="text_appointment_btn"
              type="button"
              onClick={handleBookAppointmentClick}
            >
              <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
            </button>
            <div className={style.text_stats}>
              <div className={style.text_stats_container}>
                <p>145k+</p>
                <p>Receive Patients</p>
              </div>

              <div className={style.text_stats_container}>
                <p>{`${doctorList.length}+`}</p>
                <p>Expert Doctors</p>
              </div>

              <div className={style.text_stats_container}>
                <p>{`${yearsOfExperience}+`}</p>
                <p>Years of Experience</p>
              </div>
            </div>
          </div>

          <div className={style.hero_image_section}>
            <img className={style.hero_image1} src={Doctor} alt="Doctor" />
          </div>
        </div>

        <div
          onClick={scrollToTop}
          className={`${style.scroll_up} ${goUp ? style.show_scroll : ""}`}
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </div>
      </div>
    </div>
  );
}

export default Home;
