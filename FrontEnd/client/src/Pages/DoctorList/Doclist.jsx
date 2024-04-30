import React, { useEffect } from "react";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import style from "./doctors.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setDoctors } from "../../redux/actions";

function Doctors() {
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
            img={doc.image}
            key={doc._id}
            name={`Dr.${doc.firstName} ${doc.lastName}`}
            title={doc.roleDetails.specialization}
            branch={doc.hospitalBranch}
          />
        ))}
      </div>
    </div>
  );
}

export default Doctors;
