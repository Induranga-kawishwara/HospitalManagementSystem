import React from "react";
import AppoinmentCard from "../../components/AppoinmentCard/AppoinmentCard";

function DoneAppoinment() {
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
            <AppoinmentCard people={it} from="history" />
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
