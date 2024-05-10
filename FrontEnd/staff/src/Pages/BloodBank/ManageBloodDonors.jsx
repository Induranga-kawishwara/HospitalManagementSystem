import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Table from "../../Components/Table/Table";

const ManageBloodDonors = () => {
  const { BloodID } = useParams();
  console.log(BloodID);
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
      flex: 1,
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
    <Container maxWidth="100%">
      <Box m="20px" minHeight="100vh">
        <Table
          rows={rows}
          columns={columns}
          title={`Blood Type: ${bloods[0]?.bloodType}`}
          subtitle={"Donation List"}
        />
      </Box>
    </Container>
  );
};

export default ManageBloodDonors;
