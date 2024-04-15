import { useSelector } from "react-redux";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import profile1 from "../../assets/profile-1.png";
import style from "./doctors.module.css";
import { useNavigate } from "react-router-dom";

function Doctors() {
  const navigate = useNavigate();
  const doctorList = useSelector((state) => state.doctors);

  const handledoclistClick = () => {
    navigate("/doclist");
  };

  return (
    <div className={style.doctor_section} id="doctors">
      <div className={style.dt_title_content}>
        <h3 className={style.dt_title}>
          <span>Meet Our Doctors</span>
        </h3>

        <p className={style.dt_description}>
          Meet our exceptional team of specialist doctors, dedicated to
          providing top-notch healthcare services at Health Plus. Trust in their
          knowledge and experience to lead you towards a healthier and happier
          life.
        </p>
      </div>

      <div className={style.dt_cards_content}>
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
      <div className={style.navbar_btn2}>
        <button
          className="text_appointment_btn"
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
