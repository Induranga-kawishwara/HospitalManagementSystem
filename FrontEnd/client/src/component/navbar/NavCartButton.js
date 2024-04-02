import React, { useContext, useEffect, useState } from "react";
import classes from "./NavCartButton.module.css";

const NavCartButton = (props) => {
  //Using useContext & useState hooks
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  //ENDS

  //Adding conditional stying to the Cart button using useState and ternary operator
  const btnBump = `${classes.cart__button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  return (
    <div  className={btnBump}>
      Buy Now
    </div>
  );
  //ENDS
};

export default NavCartButton;
