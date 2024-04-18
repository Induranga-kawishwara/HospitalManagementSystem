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

  // Initialize an empty array to store objects containing doctor details
  const doctorDetailsArray = [];

  // Iterate over filteredConsultations array
  filteredConsultations.forEach((consultation) => {
    // Find the consultation in consultationList that matches the current filtered consultation's ID
    const matchingConsultation = consultationsList.find((item) =>
      item.consultations.find((ss) => ss._id === consultation._id)
    );

    // If a matching consultation is found
    if (matchingConsultation) {
      // Retrieve the doctor details from the matching consultation
      const scheduledDoctor = doctorList.find(
        (doctor) => doctor._id === matchingConsultation.doctorId
      );

      // If a scheduled doctor is found
      if (scheduledDoctor) {
        const doctorDetails = {
          doctorId: scheduledDoctor._id,
          displayName: `${scheduledDoctor.firstName} ${scheduledDoctor.lastName}`,
          specialize: consultation.specialization,
          date: new Date(
            consultation.consultationDateAndTime
          ).toLocaleDateString(),
          time: new Date(
            consultation.consultationDateAndTime
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          location: consultation.branchName,
        };

        doctorDetailsArray.push(doctorDetails);
      }
    }
  });

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
        {doctorDetailsArray.map((doctorDetails, index) => (
          <li key={index} style={{ margin: 30 }}>
            <AppoinmentCard
              people={{
                avatar: "",
                qr: "/qr.png",
                displayName: doctorDetails.displayName,
                tagline: "",
                date: `Date - ${doctorDetails.date}`,
                time: `Time - ${doctorDetails.time}`,
                location: `Hospital Location - ${doctorDetails.location}`,
              }}
              from="history"
            />
          </li>
        ))}
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
