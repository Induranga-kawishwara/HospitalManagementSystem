import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "../../Components/Table/Table";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

const ManageBloodBank = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [bloods, setBlood] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bloodResult = await axios.get("http://localhost:5000/bloodBank");
        setBlood(bloodResult.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:5000/bloodBank/${id}`);
      const bloodResult = await axios.get("http://localhost:5000/bloodBank");
      setBlood(bloodResult.data);
    } catch (error) {
      console.error("Failed to delete doctor:", error);
    }
  };

  const columns = [
    { field: "no", headerName: "No" },
    {
      field: "bloodtype",
      headerName: "Blood Type",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "bloodCount",
      headerName: "Blood Count",
      flex: 1,
    },
    {
      field: "donater",
      headerName: "Donors",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.greenAccent[700], color: "#ffffff" }}
          onClick={() => {
            navigate(`/bloodType/${params.row.id}`);
          }}
        >
          View
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
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
    bloodtype: patient.bloodType,
    bloodCount: patient.bloodCount,
  }));

  return (
    <Table
      rows={rows}
      columns={columns}
      title={"Blood Bank"}
      subtitle={"Managing Blood Bank"}
    />
  );
};

export default ManageBloodBank;
