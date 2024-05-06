import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import FAQ from "./Pages/faq";
import AddBloodDonate from "./Pages/BloodBank/AddBloodDonate";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import CalenderTasks from "./Pages/CalenderTasks/CalenderTasks";
import ManageBloodDonors from "./Pages/BloodBank/ManageBloodDonors";
import BloodReq from "./Pages/BloodBank/ReqBlood";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  // Determine whether to show the sidebar based on the current route
  const showSidebar = location.pathname !== "/login";

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
              <Route path="/" element={<Dashboard />} />
              <Route path="/form" element={<AddStaffMembers />} />
              <Route path="/editform/:id" element={<EditStaffMembers />} />
              <Route path="/patients" element={<ManagePatients />} />
              <Route path="/bloodinformation" element={<ManageBloodBank />} />
              <Route path="/team" element={<ManageStaffMemers />} />
              <Route
                path="/bloodType/:BloodID"
                element={<ManageBloodDonors />}
              />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<CalenderTasks />} />
              <Route path="/bloodreq" element={<BloodReq />} />
              <Route path="/blood" element={<AddBloodDonate />} />
              <Route path="/addpatients" element={<AddPatients />} />
              <Route path="/editpatients/:id" element={<EditPatients />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
