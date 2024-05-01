import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./Components/SideNavigation/Topbar";
import Sidebar from "./Components/SideNavigation/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddStaffMembers from "./Pages/StaffMembers/AddStaffMembers";
import ManagePatients from "./Pages/Patients/ManagePatients";
import ManageBloodBank from "./Pages/BloodBank/ManageBloodBank";
import ManageStaffMemers from "./Pages/StaffMembers/ManageStaffMemers";
import AddPatients from "./Pages/Patients/AddPatients";
import FAQ from "./Pages/faq";
import AddBloodDonate from "./Pages/BloodBank/AddBloodDonate";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import CalenderTasks from "./Pages/CalenderTasks/CalenderTasks";
import ManageBloodDonors from "./Pages/BloodBank/ManageBloodDonors";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/form/:id?" element={<AddStaffMembers />} />
              <Route path="/patients" element={<ManagePatients />} />
              <Route path="/bloodinformation" element={<ManageBloodBank />} />
              <Route path="/team" element={<ManageStaffMemers />} />
              <Route
                path="/bloodType/:BloodID"
                element={<ManageBloodDonors />}
              />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<CalenderTasks />} />
              <Route path="/blood" element={<AddBloodDonate />} />
              <Route path="/addpatients" element={<AddPatients />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
