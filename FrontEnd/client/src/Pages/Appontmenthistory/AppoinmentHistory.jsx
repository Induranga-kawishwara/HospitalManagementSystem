import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setConsultations } from "../../redux/actions";
import axios from "axios";

import AppoinmentCard from "../../components/AppoinmentCard/AppoinmentCard";

function AppoinmentHistory() {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const consultationsList = useSelector((state) => state.consultations);
  const doctorList = useSelector((state) => state.doctors);

  useEffect(() => {
    const fetchData = async () => {
      if (!consultationsList.length) {
        try {
          const result = await axios.get(
            `http://localhost:5000/consultations/${patientId}`
          );
          dispatch(setConsultations(result.data));
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchData();
  }, [consultationsList.length, dispatch, patientId]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "",
        justifyContent: "center",
        marginTop: "120px",
      }}
    >
      <ul style={{ listStyle: "none" }}>
        {consultationsList.map((it) =>
          it.consultations.map((pat, index) => {
            // Find the scheduled doctor using doctorId
            const scheduledDoctor = doctorList.find(
              (doctor) => doctor._id === it.doctorId
            );

            return (
              <li key={index} style={{ margin: 30 }}>
                <AppoinmentCard
                  people={{
                    avatar: "",
                    qr: "/qr.png",
                    displayName: `${scheduledDoctor.firstName} ${scheduledDoctor.lastName}`,
                    tagline: "",
                    specialize: ` Specialize - ${pat.specialization}`,
                    date: `Date - ${new Date(
                      pat.consultationDateAndTime
                    ).toLocaleDateString()}`,
                    time: `Time - ${new Date(
                      pat.consultationDateAndTime
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`,
                    location: `Hospital Location - ${pat.branchName}`,
                  }}
                />
              </li>
            );
          })
        )}
      </ul>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
        .card-business * {
          font-family: 'Quicksand', sans-serif;
        }
      `}
      </style>
    </div>
  );
}

export default AppoinmentHistory;
