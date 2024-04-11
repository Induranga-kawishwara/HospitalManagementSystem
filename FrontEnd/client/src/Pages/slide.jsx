import Carousel from 'react-bootstrap/Carousel';
import img1 from "../assets/slide.avif";
import img2 from "../assets/slide2.jpg";
import img3 from "../assets/slid3.png";

function DarkVariantExample() {
  return (
    <div
    id="home"
    className="form-box"
    style={{
      marginTop: "100px",
    }}>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d- w-100"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
         className="d-block w-100"
          src={img3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default DarkVariantExample;