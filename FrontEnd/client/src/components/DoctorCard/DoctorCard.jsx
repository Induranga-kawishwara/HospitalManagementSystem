import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import style from "./doctorCard.module.css";

function DoctorCard(props) {
  return (
    <div className={style.dt_card}>
      <img src={props.img} alt={props.name} className={style.dt_card_img} />
      <p className={style.dt_card_name}>{props.name}</p>
      <p className={style.dt_card_title}>{props.title}</p>
      <p className={style.dt_card_stars}>
        <FontAwesomeIcon
          icon={faHospital}
          style={{ color: "#F7BB50", paddingRight: "6px" }}
        />
        <span className={style.dt_card_branch}>{props.branch}</span>
      </p>
    </div>
  );
}

export default DoctorCard;
