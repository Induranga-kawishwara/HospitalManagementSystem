import React, { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import profile1 from "../assets/profile-1.png";
import profile2 from "../assets/profile-2.png";
import profile3 from "../assets/profile-3.png";
import profile4 from "../assets/profile-4.png";
import "./Doctors.css";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function Doctors() {
  // const navigate = useNavigate();

  // const handledoclistClick = () => {
  //   navigate("/doclist");
  // };
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
    // console.log(doctorList);
  }, []);

  return (
    <div
      className="doctor-section"
      id="doctors"
      style={{
        marginTop: "100px",
      }}
    >
      <div className="dt-cards-content">
        {doctorList.map((doc, index) => (
          <DoctorCard
            img={profile1}
            key={index}
            name={`Dr.${doc.firstName} ${doc.lastName}`}
            title={doc.roleDetails.specialization}
            stars="4.9"
            reviews="1800"
          />
        ))}
        {/* <DoctorCard
          img={profile1}
          name="Dr. Kathryn Murphy"
          title="General Surgeons"
          stars="4.9"
          reviews="1800"
        /> */}
        {/* <DoctorCard
          img={profile2}
          name="Dr. Jacob Jones"
          title="Hematologists"
          stars="4.8"
          reviews="700"
        />
        <DoctorCard
          img={profile3}
          name="Dr. Jenny Wilson"
          title="Endocrinologists"
          stars="4.7"
          reviews="450"
        />
        <DoctorCard
          img={profile4}
          name="Dr. Albert Flores"
          title="Hematologists"
          stars="4.8"
          reviews="500"
        />
        <DoctorCard
          img={profile4}
          name="Dr. Albert Flores"
          title="Hematologists"
          stars="4.8"
          reviews="500"
        />
        <DoctorCard
          img={profile4}
          name="Dr. Albert Flores"
          title="Hematologists"
          stars="4.8"
          reviews="500"
        /> */}
      </div>
    </div>
  );
}

export default Doctors;
