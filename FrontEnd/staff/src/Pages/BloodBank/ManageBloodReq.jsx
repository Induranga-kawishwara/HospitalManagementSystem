import axios from "axios";
import { Box, Container } from "@mui/material";
import Table from "../../Components/Table/Table";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

const ManageBloodReq = () => {
  const [bloods, setBlood] = useState([]);

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

  const handleDelete = async (bloodtype, id) => {
    try {
      await axios.delete(
        `http://localhost:5000/bloodReqest/${bloodtype}/${id}`
      );
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
      field: "bloodtype",
      headerName: "Blood Type",
      flex: 1,
    },
    {
      field: "bloodCount",
      headerName: "Blood Count",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "branch",
      headerName: "Branch",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row.bloodtype, params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  let rr = 0;

  const rows = bloods.flatMap((it) =>
    it.requestBlood.map((pat) => {
      rr++;
      return {
        id: pat._id || "",
        no: rr,
        bloodtype: it.bloodType,
        name: `${pat.firstName} ${pat.lastName}`,
        phone: pat.contactNum,
        branch: pat.HospitalBranch,
        date: new Date(pat.submittedAt).toISOString().split("T")[0],
        bloodCount: pat.requestedBloodCount,
      };
    })
  );
  // .filter((row) => row !== null);

  return (
    <Container maxWidth="100%">
      <Box m="20px" minHeight="100vh">
        <Table
          rows={rows}
          columns={columns}
          title={"Blood Request Information"}
          subtitle={"Managing Blood Requests"}
        />
      </Box>
    </Container>
  );
};

export default ManageBloodReq;
