import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/homepage";
import Doclist from "./Pages/Doclist";
import Signup from "./components/Singup";
import Login from "./components/Login";
import DocSearch from "./components/searchingdoc/search";
import TheNav from "./components/navbar/TheNav";
import Footer from "./components/Footer/footer";

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
