import React, { useEffect, useState } from "react";
import { useTheme, Box, Container } from "@mui/material";
import { tokens } from "../../theme";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/Table/Table";
import axios from "axios";

const ManageStaffMemers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffResult = await axios.get("http://localhost:5000/users");
        setStaff(staffResult.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

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
      await axios.delete(`http://localhost:5000/users/${id}`);
      // After successful deletion, fetch the updated list of doctors
      const staffResult = await axios.get("http://localhost:5000/users");
      setStaff(staffResult.data);
    } catch (error) {
      console.error("Failed to delete doctor:", error);
    }
  };

  const columns = [
    { field: "no", headerName: "NO" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
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
      field: "gender",
      headerName: "Gender",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "position",
      headerName: "Position",
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
            navigate(`/editform/${params.row.id}`);
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

  const rows = staff.map((doctor, index) => ({
    id: doctor._id,
    no: index + 1,
    name: `${doctor.firstName} ${doctor.lastName}`,
    email: doctor.email,
    age: calculateAge(doctor.date),
    gender: doctor.gender,
    phone: doctor.contact,
    position: doctor.staffType,
  }));

  return (
    <Container maxWidth="100%">
      <Box m="20px" minHeight="100vh">
        <Table
          rows={rows}
          columns={columns}
          title={"STAFF"}
          subtitle={"Managing the Staff Members"}
        />
      </Box>
    </Container>
  );
};

export default ManageStaffMemers;
