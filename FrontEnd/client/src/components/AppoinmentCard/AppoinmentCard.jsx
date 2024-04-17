import style1 from "./appoinmentHistory.module.css";
import React from "react";

function AppoinmentCard({
  people,
  headerColor = "#fff",
  headerBg = "#4285F4",
  headerStyle = {},
  shadow = true,
  style = {},
  from = "default",
  ...props
}) {
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
          background: headerBg,
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
            color: headerColor,
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
          {people.title && <li>{people.title}</li>}
          {people.phone && <li>{people.phone}</li>}
          {people.mail && <li>{people.mail}</li>}
          {people.location && <li>{people.location}</li>}
        </ul>
        {from === "history" ? (
          <>
            <input
              className={style1.comment}
              type="text"
              //value={text} // Bind the value of the input to the state
              //onChange={handleChange} // Handle changes in the input
              placeholder="Type something..."
            />
            <button type="button" className={style1.feedback}>
              Send Feedback
            </button>
          </>
        ) : (
          <button type="button" className={style1.delete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default AppoinmentCard;
