import React from "react";
import TheNavbar from "./TheNavbar";

const TheNav = (props) => {
  console.log("hh1");

  return (
    <header>
      <TheNavbar onShowCart={props.onShowCart} />
    </header>
  );
  //END
};

export default TheNav;
