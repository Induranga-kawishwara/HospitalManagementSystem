import DoctorCard from "../../components/DoctorCard/DoctorCard";
import style from "./doctors.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setDoctors } from "../../redux/actions";

function Doctors() {
  const navigate = useNavigate();
  const doctorList = useSelector((state) => state.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!doctorList || doctorList.length === 0) {
        try {
          const result = await axios.get("http://localhost:5000/users/Doctor");
          dispatch(setDoctors(result.data));
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchData();
  }, [doctorList, dispatch]);

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
            img={doc.image}
            key={index}
            name={`Dr.${doc.firstName} ${doc.lastName}`}
            title={doc.roleDetails.specialization}
            branch={doc.hospitalBranch}
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
