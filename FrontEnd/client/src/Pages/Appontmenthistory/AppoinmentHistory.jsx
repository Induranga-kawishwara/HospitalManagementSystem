import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "../../components/Footer/TheFooter.jsx";

import AppoinmentCard from "../../components/AppoinmentCard/AppoinmentCard";

function AppoinmentHistory() {
  console.log("ddd");
  const { patientId } = useParams();
  const [consultationsList, setConsultations] = useState([]);
  const doctorList = useSelector((state) => state.doctors);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/consultations/${patientId}`
        );
        setConsultations(result.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [patientId]); // Only run useEffect when patientId changes

  return (
    <div
      style={{
        display: "flex",
        alignItems: "",
        justifyContent: "center",
        marginTop: "120px",
      }}
    >
      <ul style={{ listStyle: "none" }}>
        {consultationsList.map((it, index) =>
          it.consultations.map((pat) => {
            const scheduledDoctor = doctorList.find(
              (doctor) => doctor._id === it.doctorId
            );
            console.log(pat);

            if (pat.status === "scheduled") {
              return (
                <div key={index} style={{ margin: 30 }}>
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
                </div>
              );
            }
          })
        )}
      </ul>
    </div>
  );
}

export default AppoinmentHistory;
