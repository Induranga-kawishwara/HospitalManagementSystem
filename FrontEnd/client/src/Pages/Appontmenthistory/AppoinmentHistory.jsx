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
          it.consultations.map((pat, index) => (
            <li key={index} style={{ margin: 30 }}>
              <AppoinmentCard people={pat} />
            </li>
          ))
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
