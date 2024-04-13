import React from "react";
import DoctorCard from "./DoctorCard";
import { useSelector } from "react-redux";
import profile1 from "../assets/profile-1.png";
import "./Doctors.css";

function Doctors() {
  const doctorList = useSelector((state) => state.doctors);

  return (
    <div
      className="doctor-section"
      id="doctors"
      style={{
        marginTop: "100px",
      }}
    >
      <div className="dt-cards-content">
        {doctorList.map((doc) => (
          <DoctorCard
            img={profile1}
            key={doc._id}
            name={`Dr.${doc.firstName} ${doc.lastName}`}
            title={doc.roleDetails.specialization}
            stars="4.9"
            reviews="1800"
          />
        ))}
      </div>
    </div>
  );
}

export default Doctors;
