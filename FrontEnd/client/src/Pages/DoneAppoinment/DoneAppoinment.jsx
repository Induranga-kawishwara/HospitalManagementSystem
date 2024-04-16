import style1 from "./doneAppoinment.module.css";

import React from "react";
import ReactDOM from "react-dom";

function BusinessCard({
  people,
  headerColor = "#fff",
  headerBg = "#4285F4",
  headerStyle = {},
  shadow = true,
  style = {},

  ...props
}) {
  return (
    <div
      className="card-business"
      style={{
        background: "#fff",
        width: "110mm",
        height: "80mm",
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
      </div>
    </div>
  );
}

function App() {
  const list = [
    {
      avatar: "/avatar.png",
      qr: "/qr.png",
      displayName: "Doctor Name",
      tagline: "",
      title: "Specialize -",
      phone: "Date -",
      mail: "Time -",
      location: "Hospital Location -",
    },
  ];
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
        {list.map((it) => (
          <li style={{ margin: 30 }}>
            <BusinessCard people={it} />
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

export default App;
