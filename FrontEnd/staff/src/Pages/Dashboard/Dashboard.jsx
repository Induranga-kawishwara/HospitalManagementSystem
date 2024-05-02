import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../Components/Header/Header";
import StatBox from "../../Components/StatBox/StatBox";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  LocalHospital,
  PointOfSale,
  PersonAdd,
  Bloodtype,
} from "@mui/icons-material";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [staff, setStaff] = useState([]);
  const [patient, setPatient] = useState([]);
  const [blood, setBlood] = useState([]);
  const [doneAppoinment, SetdoneAppoinment] = useState([]);
  const [consultationList, setConsultationList] = useState([]);

  const fetchData = async () => {
    try {
      const [patientResult, staffResult, bloodResult, consultationsResult] =
        await Promise.all([
          axios.get("http://localhost:5000/patients"),
          axios.get("http://localhost:5000/users"),
          axios.get("http://localhost:5000/bloodBank"),
          axios.get("http://localhost:5000/consultations"),
        ]);

      setPatient(patientResult.data);
      setStaff(staffResult.data);
      setBlood(bloodResult.data);
      setConsultationList(consultationsResult.data);

      const doneAppoinments = consultationsResult.data.flatMap((it) =>
        it.consultations.filter((pat) => pat.status === "done")
      );
      SetdoneAppoinment(doneAppoinments);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      // Send a delete request to your backend API to delete the doctor with the specified ID
      await axios.delete(`http://localhost:5000/consultations/${id}`);
      // After successful deletion, fetch the updated list of doctors
      const consultationsResult = await axios.get(
        `http://localhost:5000/consultations`
      );

      setConsultationList(consultationsResult.data);
    } catch (error) {
      console.error("Failed to delete doctor:", error);
    }
  };

  const handleDone = async (id) => {
    console.log(id);
    try {
      // Send a delete request to your backend API to delete the doctor with the specified ID
      await axios.put(`http://localhost:5000/consultations/${id}`);
      // After successful deletion, fetch the updated list of doctors
      const consultationsResult = await axios.get(
        `http://localhost:5000/consultations`
      );

      setConsultationList(consultationsResult.data);
      const doneAppoinments = consultationsResult.data.flatMap((it) =>
        it.consultations.filter((pat) => pat.status === "done")
      );
      SetdoneAppoinment(doneAppoinments);
    } catch (error) {
      console.error("Failed to delete doctor:", error);
    }
  };

  const columns = [
    { field: "no", headerName: "No" },
    {
      field: "patient_name",
      headerName: "Patient Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
    },
    {
      field: "doctor",
      headerName: "Doctor Name",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "branch",
      headerName: "Branch Name",
      flex: 1,
    },
    {
      field: "done",
      headerName: "Done",
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.greenAccent[700], color: "#ffffff" }}
          onClick={() => handleDone(params.row.id)}
        >
          Done
        </Button>
      ),
    },
    {
      field: "cancel",
      headerName: "Cancel",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Cancel
        </Button>
      ),
    },
  ];

  const totalCount = blood.reduce(
    (accumulator, item) => accumulator + parseInt(item.bloodCount),
    0
  );

  let rr = 0;
  const today = new Date().toISOString().split("T")[0];
  const rows = consultationList
    .flatMap((it) =>
      it.consultations.map((pat) => {
        const doctor = staff.find((doctor) => doctor._id === it.doctorId);
        const selepat = patient.find((pati) => pati._id === pat.patientId);
        if (
          selepat &&
          pat.status === "scheduled" &&
          pat.consultationStartTime.includes(today)
        ) {
          const [datePart, timePartWithOffset] =
            pat.consultationStartTime.split("T");
          const [timePart] = timePartWithOffset.split(".");

          const [hours, minutes] = timePart.split(":");
          const formattedTime = `${hours}:${minutes}`;
          rr++;
          return {
            id: pat._id || "",
            no: rr,
            patient_name: `${selepat.firstName || ""} ${
              selepat.lastName || ""
            }`,
            date: datePart,
            time: formattedTime,
            doctor: `${doctor.firstName || ""} ${doctor.lastName || ""}`,
            phone: pat.contactNum || "",
            branch: pat.branchName || "",
          };
        }
      })
    )
    .filter((row) => row !== undefined);

  console.log(rows);

  return (
    <Box m="60px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={staff.length}
            subtitle="Staff Members"
            icon={
              <LocalHospital
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={doneAppoinment.length}
            subtitle="Done Appoiments"
            icon={
              <PointOfSale
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={patient.length}
            subtitle="Patients"
            icon={
              <PersonAdd
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalCount}
            subtitle="Blood Count"
            progress="0.80"
            icon={
              <Bloodtype
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box width="312%" gridColumn="span 4">
          <Header title="Today Appoiments" />

          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid rows={rows} columns={columns} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
