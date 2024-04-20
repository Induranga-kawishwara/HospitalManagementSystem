import React, { useState } from "react";
import axios from "axios";
import style1 from "./appoinmentHistory.module.css";

function AppoinmentCard({
  id,
  people,
  headerStyle = {},
  shadow = true,
  style = {},
  from = "default",
  onDelete,
  ...props
}) {
  const [data, setData] = useState({
    consultationId: id,
    fullName: JSON.parse(localStorage.getItem("user")).name,
    hospitalBranch: people.location,
    feedback: "",
    date: people.date,
  });

  const handleFeedClick = async () => {
    console.log(data);
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

  const handleFeedbackChange = async (event) => {
    setData({ ...data, feedback: event.target.value });
  };

  return (
    <div
      className="card-business"
      style={{
        background: "#fff",
        width: "110mm",
        height: "auto",
        borderRadius: "5px",
        boxShadow: shadow !== false ? "#9E9E9E 0px 0px 10px" : "",
        ...style,
      }}
    >
      <div
        style={{
          background: "#4285F4",
          height: "12mm",
          padding: 10,
          paddingTop: 15,
          paddingLeft: 20,
          position: "relative",
          borderTopRightRadius: "5px",
          borderTopLeftRadius: "5px",
          ...headerStyle,
        }}
      >
        <img
          width={"60mm"}
          height={"60mm"}
          alt="avatar"
          style={{
            position: "absolute",
            right: 15,
            top: 5,
            borderRadius: "100%",
            float: "right",
            background: "#fff",
          }}
          src={people.avatar}
        />

        <h1
          style={{
            fontSize: "17pt",
            margin: 0,
            marginRight: 160,
            color: "#fff",
          }}
        >
          {people.displayName}
        </h1>
      </div>
      <div style={{ padding: 10, paddingLeft: 20, position: "relative" }}>
        <ul
          style={{
            fontSize: "10pt",
            listStyle: "none",
            lineHeight: "20pt",
            margin: 0,
            padding: 0,
          }}
        >
          {people.specialize && <li>{`Specialize -${people.specialize}`}</li>}
          {people.date && <li>{`Date - ${people.date}`}</li>}
          {people.time && <li>{`Time - ${people.time}`}</li>}
          {people.location && (
            <li>{`Hospital Location - ${people.location}`}</li>
          )}
        </ul>
        {from === "history" ? (
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
        ) : (
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
