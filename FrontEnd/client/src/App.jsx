import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/homepage";
import Signup from "./components/Singup";
import Login from "./components/Login";
import DocSearch from "./components/searchingdoc/search";
import TheNav from "./component/navbar/TheNav";
import Footer from "./component/Footer/footer";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <TheNav />
      <Routes>
        <Route path="/" exact element={<Home />} />
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
