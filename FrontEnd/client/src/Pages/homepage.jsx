import About from "./About";
import Hero from "./home";
import Info from "./Info";
import BookAppointment from "./BookAppointment";
import Reviews from "./Reviews";
import Doctors from "./Doctors";
import Slide from "./slide";


function Home() {
  return (
    <div >
      <Slide />
      <Hero />
      <Info/>
      <About/>
      <BookAppointment/>
      <Reviews />
      <Doctors />
    </div>
  );
}

export default Home;
