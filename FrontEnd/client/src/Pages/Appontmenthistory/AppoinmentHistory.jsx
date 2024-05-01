import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setDoctors } from "../../redux/actions";
import style from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

import AppoinmentCard from "../../components/AppoinmentCard/AppoinmentCard";

function AppoinmentHistory() {
  const { patientId } = useParams();
  const [consultationsList, setConsultations] = useState([]);
  const doctorList = useSelector((state) => state.doctors);
  const dispatch = useDispatch();
  const [sheduledAppoinment, SetsheduledAppoinment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!doctorList || doctorList.length === 0) {
          const doctorsResult = await axios.get(
            "http://localhost:5000/users/Doctor"
          );
          dispatch(setDoctors(doctorsResult.data));
        }

        const consultationsResult = await axios.get(
          `http://localhost:5000/consultations/${patientId}`
        );
        setConsultations(consultationsResult.data);
        const doneAppoinments = consultationsResult.data.flatMap((it) =>
          it.consultations.filter((pat) => pat.status === "scheduled")
        );
        SetsheduledAppoinment(doneAppoinments);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [patientId, doctorList, dispatch]);

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/consultations/${id}`
      );

      const updatedConsultations = consultationsList.map((it) => {
        return {
          ...it,
          consultations: it.consultations.filter((pat) => pat._id !== id),
        };
      });

      setConsultations(updatedConsultations);
      alert(result.data);
    } catch (error) {
      console.error("Failed to delete consultation:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "",
        justifyContent: "center",
        marginTop: "120px",
      }}
    >
      {sheduledAppoinment.length === 0 ? (
        <div className={style.notFoundContainer}>
          <h1 className={style.notFoundText}>No Booked Consultations</h1>
          {/* <img
              src={notFoundImage}
              alt="Not Found"
              className={style.notFoundImage}
            /> */}
          <p className={style.notFoundText}>
            Sorry, it seems you don't have any booked consultations.
          </p>
          <Link to="/" className={style.goBackButton}>
            Go Back to Home
          </Link>
        </div>
      ) : (
        <ul style={{ listStyle: "none" }}>
          {consultationsList.map((it, index) =>
            it.consultations.map((pat) => {
              const scheduledDoctor = doctorList.find(
                (doctor) => doctor._id === it.doctorId
              );

              if (pat.status === "scheduled") {
                return (
                  <div key={index} style={{ margin: 30 }}>
                    <AppoinmentCard
                      people={{
                        avatar: scheduledDoctor.image,
                        qr: "/qr.png",
                        displayName: `${scheduledDoctor.firstName} ${scheduledDoctor.lastName}`,
                        tagline: "",
                        specialize: pat.specialization,
                        date: new Date(
                          pat.consultationDateAndTime
                        ).toLocaleDateString(),
                        time: new Date(
                          pat.consultationDateAndTime
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                        location: pat.branchName,
                      }}
                      id={pat._id}
                      onDelete={handleDelete}
                    />
                  </div>
                );
              }
              return null;
            })
          )}
        </ul>
      )}
    </div>
  );
}

export default AppoinmentHistory;
