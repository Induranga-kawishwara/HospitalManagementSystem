import Abaout from "./About";
import Hero from "./home";
import Info from "./Info";
import BookAppointment from "./BookAppointment";


function Home() {
  return (
    <div >
      <Hero />
      <Info/>
      <Abaout/>
      <BookAppointment/>
    </div>
  );
}

export default Home;
