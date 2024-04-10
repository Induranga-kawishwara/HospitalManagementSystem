import About from "./About";
import Hero from "./home";
import Info from "./Info";
import BookAppointment from "./BookAppointment";
import Reviews from "./Reviews";
import Doctors from "./Doctors";


function Home() {
  return (
    <div >
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
