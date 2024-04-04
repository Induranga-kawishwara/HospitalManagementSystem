import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/homepage";
import Signup from "./components/Singup";
import Login from "./components/Login";
import DocSearch from "./components/searchingdoc/search";
import TheNav from "./component/navbar/TheNav";

function App() {
  return (
    <Router>
      <TheNav />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/docsearch" exact element={<DocSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
