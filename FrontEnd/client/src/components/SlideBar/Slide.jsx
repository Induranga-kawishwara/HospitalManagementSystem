import React from "react";
import Carousel from "react-bootstrap/Carousel";
import style from "./slide.module.css";

function DarkVariantExample() {
  const img = [
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/14507074/pexels-photo-14507074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  return (
    <div id="home" className={style.form_box}>
      <Carousel data-bs-theme="dark">
        {img.map((imgUrl, index) => (
          <Carousel.Item key={index}>
            <div className={style.carousel_container}>
              <img
                className={`d-block w-100 ${style.carousel_img}`}
                src={imgUrl}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default DarkVariantExample;
