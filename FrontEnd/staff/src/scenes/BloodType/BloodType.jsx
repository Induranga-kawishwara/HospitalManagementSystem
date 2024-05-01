import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

const BloodType = () => {
  const { id } = useParams();
  console.log(id);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [bloods, setBlood] = useState([]);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const bloodResult = await axios.get(
  //           `http://localhost:5000/bloodBank/${id}`
  //         );
  //         setBlood(bloodResult.data);
  //       } catch (error) {
  //         console.error("Failed to fetch data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, [id]); // Add id to dependency array

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      // Send a delete request to your backend API to delete the doctor with the specified ID
      await axios.delete(`http://localhost:5000/bloodBank/${id}`);
      // After successful deletion, fetch the updated list of doctors
      const bloodResult = await axios.get("http://localhost:5000/bloodBank");
      setBlood(bloodResult.data);
    } catch (error) {
      console.error("Failed to delete doctor:", error);
    }
  };

  const columns = [
    { field: "no", headerName: "No" },
    // {
    //   field: "name",
    //   headerName: "Name",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    {
      field: "bloodtype",
      headerName: "Blood Type",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    // {
    //   field: "phone",
    //   headerName: "Phone Number",
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
    {
      field: "bloodCount",
      headerName: "Blood Count",
      flex: 1,
    },
    {
      field: "editdetails",
      headerName: "Edit Details",
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.greenAccent[700], color: "#ffffff" }}
          onClick={() => {
            navigate(`/form/${params.row.id}`);
          }}
        >
          Edit Details
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const rows = bloods.map((patient, index) => ({
    id: patient._id,
    no: index + 1,
    // name: `${patient.firstName} ${patient.lastName}`,
    bloodtype: patient.bloodType,
    // email: patient.email,
    // age: calculateAge(patient.date),
    // phone: patient.phonenumber,
    bloodCount: patient.bloodCount,
  }));

  return (
    <Box m="20px">
      <Header title={`Blood Type: ${bloods.id}`} subtitle="Donation List" />
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
  );
};

export default BloodType;
