import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Main";
import Doclist from "./Pages/DoctorList/Doclist";
import Signup from "./Pages/Singup/Signup";
import Login from "./Pages/Login/Login";
import DocSearch from "./Pages/ApponimentDetails/AppoinmentDetails";
import TheNav from "./components/Navbar/TheNav";
import Footer from "./components/Footer/Footer";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <TheNav />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/doclist" exact element={<Doclist />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route
          path="/docsearch"
          element={token ? <DocSearch /> : <Navigate replace to="/login" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
