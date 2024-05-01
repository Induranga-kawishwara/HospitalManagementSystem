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
  const { BloodID } = useParams();
  console.log(BloodID);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [bloods, setBlood] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bloodResult = await axios.get(`http://localhost:5000/bloodBank`);
        const filteredBlood = bloodResult.data.filter(
          (item) => item._id === BloodID
        );
        console.log(filteredBlood);
        setBlood(filteredBlood);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [BloodID]);

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
    try {
      // Send a put request to your backend API to delete the doctor with the specified ID
      await axios.put(`http://localhost:5000/bloodBank/${BloodID}/${id}`);
      // After successful deletion, fetch the updated list of doctors
      const bloodResult = await axios.get("http://localhost:5000/bloodBank");
      setBlood(bloodResult.data);
    } catch (error) {
      console.error("Failed to delete doctor:", error);
    }
  };

  const columns = [
    { field: "no", headerName: "No" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
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

  const rows =
    bloods.length > 0
      ? bloods[0].donate.map((donater, index) => ({
          id: donater._id,
          no: index + 1,
          name: `${donater.firstName} ${donater.lastName}`,
          address: donater.address,
          email: donater.email,
          phone: donater.contactNum,
        }))
      : [];

  return (
    <Box m="20px">
      <Header
        title={`Blood Type: ${bloods[0]?.bloodType}`}
        subtitle="Donation List"
      />
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
