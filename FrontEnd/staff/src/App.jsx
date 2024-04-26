import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import StaffMembers from "./scenes/Staff/StaffMembers";
import Patients from "./scenes/patients/Patients";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import Patientsadd from "./scenes/Patientsadd/patientsadd";
import FAQ from "./scenes/faq";
import Blood from "./scenes/blood/blood_1";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

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
              <Route path="/team" element={<StaffMembers />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/bloodinformation" element={<Contacts />} />
              <Route path="/form" element={<Form />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blood" element={<Blood />} />
              <Route path="/addpatients" element={<Patientsadd />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
