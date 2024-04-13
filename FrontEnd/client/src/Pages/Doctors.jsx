import React, { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import profile1 from "../assets/profile-1.png";
import profile2 from "../assets/profile-2.png";
import profile3 from "../assets/profile-3.png";
import profile4 from "../assets/profile-4.png";
import "./Doctors.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Doctors() {
  const navigate = useNavigate();

  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/users/Doctor");
        setDoctorList(result.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handledoclistClick = () => {
    navigate("/doclist");
  };
  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>Meet Our Doctors</span>
        </h3>

        <p className="dt-description">
          Meet our exceptional team of specialist doctors, dedicated to
          providing top-notch healthcare services at Health Plus. Trust in their
          knowledge and experience to lead you towards a healthier and happier
          life.
        </p>
      </div>

      <div className="dt-cards-content">
        {doctorList.slice(0, 4).map((doc, index) => (
          <DoctorCard
            img={profile1}
            key={index}
            name={`Dr.${doc.firstName} ${doc.lastName}`}
            title={doc.roleDetails.specialization}
            stars="4.9"
            reviews="1800"
          />
        ))}
      </div>
      <div className="navbar-btn2">
        <button
          className="text-appointment-btn"
          type="button"
          onClick={handledoclistClick}
        >
          See all Doctors
        </button>
      </div>
    </div>
  );
}

export default Doctors;
