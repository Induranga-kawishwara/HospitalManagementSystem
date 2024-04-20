import React, { useEffect, useState } from "react";
import axios from "axios";
import style1 from "./appoinmentHistory.module.css";
import { setReviews } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

function AppoinmentCard({ id, people, from = "default", onDelete }) {
  const dispatch = useDispatch();
  const customerReviews = useSelector((state) => state.reviews);
  const [data, setData] = useState({
    consultationId: id,
    fullName: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).name
      : "",
    hospitalBranch: people.location,
    feedback: "",
    date: people.date,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!customerReviews || customerReviews.length === 0) {
          const result = await axios.get("http://localhost:5000/reviews");
          dispatch(setReviews(result.data));

          const rev = result.data.find(
            (review) => id === review.consultationId
          );
          setData({ ...data, feedback: rev ? rev.feedback : "" });
        } else {
          const rev = customerReviews.find(
            (review) => id === review.consultationId
          );
          setData({ ...data, feedback: rev ? rev.feedback : "" });
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [customerReviews, id]);

  const handleFeedClick = async () => {
    try {
      if (data.feedback) {
        const res = await axios.post("http://localhost:5000/reviews", data);
        alert(res.data);
      }
    } catch (error) {
      console.error("Failed to handle appointment deletion:", error);
    }
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleFeedbackChange = (event) => {
    setData({ ...data, feedback: event.target.value });
  };

  return (
    <div className={style1.card_business}>
      <div className={style1.card_header}>
        <img width={"60mm"} height={"60mm"} alt="avatar" src={people.avatar} />
        <h1>{people.displayName}</h1>
      </div>
      <div className={style1.card_content}>
        <ul>
          {people.specialize && <li>{`Specialize -${people.specialize}`}</li>}
          {people.date && <li>{`Date - ${people.date}`}</li>}
          {people.time && <li>{`Time - ${people.time}`}</li>}
          {people.location && (
            <li>{`Hospital Location - ${people.location}`}</li>
          )}
        </ul>
        {from === "history" && (
          <>
            <textarea
              className={style1.comment}
              placeholder="Type something..."
              value={data.feedback}
              onChange={handleFeedbackChange}
            />

            <button
              type="button"
              onClick={handleFeedClick}
              className={style1.feedback}
            >
              Send Feedback
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className={style1.delete}
            >
              Delete
            </button>
          </>
        )}
        {from !== "history" && (
          <button
            type="button"
            onClick={handleDeleteClick}
            className={style1.delete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default AppoinmentCard;
