import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Patients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
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
      renderCell: () => (
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.greenAccent[700], color: "#ffffff" }}
          onClick={() => handleButtonClick} // handleButtonClick function to be defined
        >
          Edit Details
        </Button>
      ),
    },
    {
      field: "delete", // New field for Delete button
      headerName: "Delete", // Column header
      renderCell: () => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteButtonClick} // handleDeleteButtonClick function to be defined
        >
          Delete
        </Button>
      ),
    },
  ];
  const navigate = useNavigate();

  const handleDeleteButtonClick = (id) => {
    // Implement the action to be performed when the delete button is clicked, using the id parameter
  };
  const handleButtonClick = (id) => {
    navigate("/addpatients");
  };

  return (
    <Box m="20px">
      <Header title="PATIENTS" subtitle="Managing the Patients" />
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
        <DataGrid rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Patients;
