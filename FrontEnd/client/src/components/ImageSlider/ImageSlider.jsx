import React from "react";
import Carousel from "react-bootstrap/Carousel";
import style from "./imageslider.module.css";

function ImageSlider() {
  const img = [
    "https://e1.pxfuel.com/desktop-wallpaper/735/709/desktop-wallpaper-full-best-hospital-bsnscb-graphics-hospital.jpg",
    "https://cdn.wallpapersafari.com/93/15/qZJAWP.jpg",
    "https://e1.pxfuel.com/desktop-wallpaper/775/265/desktop-wallpaper-hospital-room-hospital.jpg",
  ];

  return (
    <div id="home" className={style.form_box}>
      <Carousel data-bs-theme="dark" interval={1500}>
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

export default ImageSlider;
