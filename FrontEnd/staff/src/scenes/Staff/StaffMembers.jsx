import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const StaffMembers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

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
      field: "position", // New field for Position or Rank
      headerName: "Position", // Column header
      flex: 1, // Flex size
    },
    {
      field: "editdetails",
      headerName: "Edit Details",
      renderCell: () => (
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.greenAccent[700], color: "#ffffff" }}
          onClick={() => {
            navigate("/form");
          }} // handleButtonClick function to be defined
        >
          Edit Details
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: () => (
        <Button variant="contained" color="error" onClick={() => {}}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="STAFF" subtitle="Managing the Staff Members" />
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

export default StaffMembers;
