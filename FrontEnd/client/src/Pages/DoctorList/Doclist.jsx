import React from "react";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import { useSelector } from "react-redux";
import profile1 from "../../assets/profile-1.png";
import style from "./doctors.module.css";

function Doctors() {
  const doctorList = useSelector((state) => state.doctors);

  return (
    <div
      className={style.doctor_section}
      id="doctors"
      style={{
        marginTop: "100px",
      }}
    >
      <div className={style.dt_cards_content}>
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
