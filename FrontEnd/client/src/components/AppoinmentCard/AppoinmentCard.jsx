import style1 from "./appoinmentHistory.module.css";
import React from "react";

function AppoinmentCard({
  id,
  people,
  headerStyle = {},
  shadow = true,
  style = {},
  from = "default",
  onDelete, // Receive onDelete callback function as prop
  ...props
}) {
  const handleDeleteClick = () => {
    // Call the onDelete callback with the id of the current appointment
    onDelete(id);
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
          {people.specialize && <li>{people.specialize}</li>}
          {people.date && <li>{people.date}</li>}
          {people.time && <li>{people.time}</li>}
          {people.location && <li>{people.location}</li>}
        </ul>
        {from === "history" ? (
          <>
            <input
              className={style1.comment}
              type="text"
              placeholder="Type something..."
            />
            <button type="button" className={style1.feedback}>
              Send Feedback
            </button>
            <button
              type="button"
              onClick={handleDeleteClick} // Call handleDeleteClick when delete button is clicked
              className={style1.delete}
            >
              Delete
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleDeleteClick} // Call handleDeleteClick when delete button is clicked
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
