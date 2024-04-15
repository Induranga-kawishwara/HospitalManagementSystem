import React from "react";
import style from "./infoCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InformationCard(props) {
  return (
    <div className={style.info_cards}>
      <span className={style.info_card_icon}>
        <FontAwesomeIcon className={style.info_fa_icon} icon={props.icon} />
      </span>
      <p className={style.info_card_title}>{props.title}</p>
      <p className={style.info_card_description}>{props.description}</p>
    </div>
  );
}

export default InformationCard;
