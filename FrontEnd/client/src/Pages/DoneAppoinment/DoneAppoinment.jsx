import React, { useEffect, useState } from "react";
import AppoinmentCard from "../../components/AppoinmentCard/AppoinmentCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDoctors } from "../../redux/actions";
import axios from "axios";
import style from "./NotFoundPage.module.css"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom"; // Add this line to import Link

function DoneAppoinment() {
  const { patientId } = useParams();
  const [consultationsList, setConsultations] = useState([]);
  const doctorList = useSelector((state) => state.doctors);
  const dispatch = useDispatch();
  const [doneAppoinment, SetdoneAppoinment] = useState([]);

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
          it.consultations.filter((pat) => pat.status === "done")
        );
        SetdoneAppoinment(doneAppoinments);
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
      {doneAppoinment.length === 0 ? (
        <div className={style.notFoundContainer}>
          <h1 className={style.notFoundText}>No Previous Consultations</h1>
          {/* <img
                src={notFoundImage}
                alt="Not Found"
                className={style.notFoundImage}
              /> */}
          <p className={style.notFoundText}>
            Sorry, it seems you don't have any previous consultations.
          </p>
          <Link to="/" className={style.goBackButton}>
            Go Back to Home
          </Link>
        </div>
      ) : (
        <div className={style.appointments}>
          <ul style={{ listStyle: "none" }}>
            {consultationsList.map((it, index) =>
              it.consultations.map((pat) => {
                const scheduledDoctor = doctorList.find(
                  (doctor) => doctor._id === it.doctorId
                );
                if (pat.status === "done") {
                  return (
                    <div key={index} style={{ margin: 30 }}>
                      <AppoinmentCard
                        people={{
                          avatar: scheduledDoctor.image,
                          qr: "/qr.png",
                          displayName:
                            scheduledDoctor.firstName +
                            " " +
                            scheduledDoctor.lastName,
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
                        from="history"
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
        </div>
      )}
    </div>
  );
}

export default DoneAppoinment;
