import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import style from "./solutionStep.module.css";

function SolutionStep(props) {
  return (
    <div className={style.about_text_step}>
      <p className={style.about_text_sTitle}>
        <span>
          <FontAwesomeIcon
            className={style.fa_icon}
            icon={faCircleChevronDown}
          />{" "}
          {props.title}
        </span>
      </p>
      <p className={style.about_text_description}>{props.description}</p>
    </div>
  );
}

export default SolutionStep;
