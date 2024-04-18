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

  useEffect(() => {
    const fetchData = async () => {
      if (!consultationsList || consultationsList.length === 0) {
        try {
          const result = await axios.get(
            `http://localhost:5000/consultations/${patientId}`
          );
          console.log(result.data);
          dispatch(setConsultations(result.data));
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };
    fetchData();
  }, [consultationsList, dispatch, patientId]);

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
        {filteredConsultations.map((pat, index) => (
          <li key={index} style={{ margin: 30 }}>
            <AppoinmentCard people={pat} from="history" />
          </li>
        ))}
      </ul>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
        .card-business * {
          font-family:  'Quicksand',sans-serif;
        }
     `}
      </style>
    </div>
  );
}

export default DoneAppoinment;
