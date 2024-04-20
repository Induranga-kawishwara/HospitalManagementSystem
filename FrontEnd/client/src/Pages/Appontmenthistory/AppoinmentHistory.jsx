import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setDoctors } from "../../redux/actions";
import AppoinmentCard from "../../components/AppoinmentCard/AppoinmentCard";

function AppoinmentHistory() {
  console.log("ddd");
  const { patientId } = useParams();
  const [consultationsList, setConsultations] = useState([]);
  const doctorList = useSelector((state) => state.doctors);

  const dispatch = useDispatch();

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
                    id={pat._id}
                    onDelete={handleDelete}
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
