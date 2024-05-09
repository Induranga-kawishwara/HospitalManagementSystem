import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Home from "./Pages/Main";
import Doclist from "./Pages/DoctorList/Doclist";
import Signup from "./Pages/Singup/Signup";
import Login from "./Pages/Login/Login";
import DocSearch from "./Pages/ApponimentDetails/AppoinmentDetails";
import TheNav from "./components/navbar/TheNav.jsx";
import TheNavlogout from "./components/Navbarforlogout/TheNav.jsx";
import Footer from "./components/Footer/TheFooter.jsx";
import AppointmentHistory from "./Pages/Appontmenthistory/AppoinmentHistory.jsx";
import DoneAppoi from "./Pages/DoneAppoinment/DoneAppoinment.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false);
          return;
        }

        const result = await axios.post(`http://localhost:5000/auth/${token}`);
        if (result.data) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doclist" element={<Doclist />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/appointmenthistory/:patientId"
          exact
          element={
            isLoggedIn ? (
              <>
                <TheNavlogout />
                <AppointmentHistory />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/doneappointment/:patientId"
          exact
          element={
            isLoggedIn ? (
              <>
                <TheNavlogout />
                <DoneAppoi />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/docsearch"
          element={
            isLoggedIn ? (
              <>
                <TheNavlogout />
                <DocSearch />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
      {isLoggedIn && <TheNavlogout />}
      {!isLoggedIn && <TheNav />}
      <Footer />
    </Router>
  );
}

export default App;
