import { useEffect, useState } from "react";
import AppoinmentCard from "../../components/AppoinmentCard/AppoinmentCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDoctors } from "../../redux/actions";
import axios from "axios";

function DoneAppoinment() {
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
            console.log(pat);

            if (pat.status === "done") {
              return (
                <div key={index} style={{ margin: 30 }}>
                  <AppoinmentCard
                    people={{
                      avatar: "",
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
          })
        )}
      </ul>
    </div>
  );
}
export default DoneAppoinment;
