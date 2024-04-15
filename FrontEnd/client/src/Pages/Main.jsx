import About from "./About/About";
import Hero from "./Home/Home";
import Info from "./Info/Info";
import BookAppointment from "./BookAppointment/BookAppointment";
import Reviews from "./Reviews/Reviews";
import Doctors from "./DoctorList/Doctors";
import Slide from "../components/SlideBar/SlideBar";

function Main() {
  return (
    <div>
      <Slide />
      <Hero />
      <Info />
      <About />
      <BookAppointment />
      <Reviews />
      <Doctors />
    </div>
  );
}

export default Main;
