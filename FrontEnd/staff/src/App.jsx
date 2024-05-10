import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Topbar from "./Components/SideNavigation/Topbar";
import Sidebar from "./Components/SideNavigation/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import AddStaffMembers from "./Pages/StaffMembers/AddStaffMembers";
import EditStaffMembers from "./Pages/StaffMembers/EditStaffMembers";
import ManagePatients from "./Pages/Patients/ManagePatients";
import ManageBloodBank from "./Pages/BloodBank/ManageBloodBank";
import ManageStaffMemers from "./Pages/StaffMembers/ManageStaffMemers";
import AddPatients from "./Pages/Patients/AddPatients";
import EditPatients from "./Pages/Patients/EditPatients";
import FAQ from "./Pages/Faq/FaqPage";
import AddBloodDonate from "./Pages/BloodBank/AddBloodDonate";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import CalenderTasks from "./Pages/CalenderTasks/CalenderTasks";
import ManageBloodDonors from "./Pages/BloodBank/ManageBloodDonors";
import BloodReq from "./Pages/BloodBank/ReqBlood";
import ManageBloodReq from "./Pages/BloodBank/ManageBloodReq";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  // Determine whether to show the sidebar based on the current route
  const showSidebar = location.pathname !== "/login";

  const token = localStorage.getItem("token");

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return !!token; // Returns true if token exists, false otherwise
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* Conditionally render the sidebar */}
          {showSidebar && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {/* Conditionally render the Topbar only if sidebar is shown */}
            {showSidebar && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/form"
                element={
                  isAuthenticated() ? (
                    <AddStaffMembers />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/editform/:id"
                element={
                  isAuthenticated() ? (
                    <EditStaffMembers />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/patients"
                element={
                  isAuthenticated() ? (
                    <ManagePatients />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/bloodinformation"
                element={
                  isAuthenticated() ? (
                    <ManageBloodBank />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/team"
                element={
                  isAuthenticated() ? (
                    <ManageStaffMemers />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/bloodType/:BloodID"
                element={
                  isAuthenticated() ? (
                    <ManageBloodDonors />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/faq" element={<FAQ />} />
              <Route
                path="/calendar"
                element={
                  isAuthenticated() ? (
                    <CalenderTasks />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/bloodreq"
                element={
                  isAuthenticated() ? <BloodReq /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/blood"
                element={
                  isAuthenticated() ? (
                    <AddBloodDonate />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/addpatients"
                element={
                  isAuthenticated() ? <AddPatients /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editpatients/:id"
                element={
                  isAuthenticated() ? (
                    <EditPatients />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/manageBloodRequ"
                element={
                  isAuthenticated() ? (
                    <ManageBloodReq />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              <Route
                path="/login"
                element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
