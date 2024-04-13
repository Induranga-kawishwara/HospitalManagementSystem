import React, { useEffect, useState } from "react";
import Doctor from "../assets/doctor-picture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../redux/actions";
import axios from "axios";

function Hero() {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div className="section-container">
        <div className="hero-section">
          <div className="text-section">
            <p className="text-headline">❤️ Health comes first</p>
            <h2 className="text-title">
              Find your Doctor and make an Appointments
            </h2>
            <p className="text-descritpion">
              Talk to online doctors and get medical advice, online
              prescriptions, refills and medical notes within minutes. On-demand
              healthcare services at your fingertips.
            </p>

            <button
              className="text-appointment-btn"
              type="button"
              onClick={handleBookAppointmentClick}
            >
              <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
            </button>
            <div className="text-stats">
              <div className="text-stats-container">
                <p>145k+</p>
                <p>Receive Patients</p>
              </div>

              <div className="text-stats-container">
                <p>{`${doctorList.length}+`}</p>
                <p>Expert Doctors</p>
              </div>

              <div className="text-stats-container">
                <p>{`${yearsOfExperience}+`}</p>
                <p>Years of Experience</p>
              </div>
            </div>
          </div>

          <div className="hero-image-section">
            <img className="hero-image1" src={Doctor} alt="Doctor" />
          </div>
        </div>

        <div
          onClick={scrollToTop}
          className={`scroll-up ${goUp ? "show-scroll" : ""}`}
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
