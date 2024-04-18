import { useEffect } from "react";
import AppoinmentCard from "../../components/AppoinmentCard/AppoinmentCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setConsultations } from "../../redux/actions";
import axios from "axios";

function DoneAppoinment() {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const consultationsList = useSelector((state) => state.consultations);
  const doctorList = useSelector((state) => state.doctors);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/consultations/${patientId}`
        );
        dispatch(setConsultations(result.data));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [dispatch, patientId]);

  const filteredConsultations = consultationsList.flatMap((it) =>
    it.consultations.filter((pat) => pat.status === "done")
  );
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "",
        justifyContent: "center",
        marginTop: "70px",
      }}
    >
      <ul style={{ listStyle: "none" }}>
        {filteredConsultations.map((pat, index) => {
          const scheduledDoctor = doctorList.find(
            (doctor) => doctor._id === pat.doctorId
          );

          return (
            <li key={index} value={pat._id} style={{ margin: 30 }}>
              <AppoinmentCard
                people={{
                  avatar: scheduledDoctor ? scheduledDoctor.avatar : "",
                  qr: "/qr.png",
                  displayName: scheduledDoctor
                    ? scheduledDoctor.displayName
                    : "",
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
                from="history"
              />
            </li>
          );
        })}
      </ul>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
        .card-business * {
          font-family: 'Quicksand',sans-serif;
        }
     `}
      </style>
    </div>
  );
}

export default DoneAppoinment;
