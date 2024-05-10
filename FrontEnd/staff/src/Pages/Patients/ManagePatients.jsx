import { useTheme, Box, Container } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import Table from "../../Components/Table/Table";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ManagePatients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [patient, setPatient] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResult = await axios.get("http://localhost:5000/patients");
        setPatient(patientResult.data);
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
    try {
      await axios.delete(`http://localhost:5000/patients/${id}`);
      await axios.delete(`http://localhost:5000/auth/${id}`);

      const patientResult = await axios.get("http://localhost:5000/patients");
      setPatient(patientResult.data);
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
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "birthday",
      headerName: "Birth Day",
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
      field: "editdetails",
      headerName: "Edit Details",
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.greenAccent[700], color: "#ffffff" }}
          onClick={() => {
            navigate(`/editpatients/${params.row.id}`);
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
  const calculateDate = (birthday) => {
    const date = new Date(birthday);
    return date.toISOString().split("T")[0];
  };

  const rows = patient.map((patient, index) => ({
    id: patient._id,
    no: index + 1,
    name: `${patient.firstName} ${patient.lastName}`,
    age: calculateAge(patient.birthday),
    gender: patient.gender,
    birthday: calculateDate(patient.birthday),
    email: patient.email,
    phone: patient.phonenumber,
  }));

  return (
    <Container maxWidth="100%">
      <Box m="20px" minHeight="100vh">
        <Table
          rows={rows}
          columns={columns}
          title={"PATIENTS"}
          subtitle={"Managing the Patients"}
        />
      </Box>
    </Container>
  );
};

export default ManagePatients;
