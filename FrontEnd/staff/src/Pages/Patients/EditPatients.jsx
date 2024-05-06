import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/Header/Header";
import { MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddPatients = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthday: "",
    phonenumber: "",
    address: "",
    city: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResult = await axios.get("http://localhost:5000/patients");
        const filteredStaff = patientResult.data.find(
          (staff) => staff._id === id
        );

        if (filteredStaff) {
          const updatedInitialValues = {
            ...initialValues,
            firstName: filteredStaff.firstName,
            lastName: filteredStaff.lastName,
            email: filteredStaff.email,
            phonenumber: filteredStaff.phonenumber,
            address: filteredStaff.address,
            birthday: filteredStaff.birthday
              ? new Date(filteredStaff.birthday).toISOString().split("T")[0]
              : "",
            gender: filteredStaff.gender,
            city: filteredStaff.city,
          };
          setInitialValues(updatedInitialValues);
        } else {
          console.log("Staff member not found");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = ({ target }) => {
    if (!target) return;

    const { name, value } = target;
    if (!name) return;
    setInitialValues({ ...initialValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/patients/${id}`,
        initialValues
      );
      alert(response.data.message);
      navigate("/patients");
    } catch (error) {
      console.error("Error adding StaffMember:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <Box m="20px">
      <Header title="EDIT USER" subtitle="Edit User Profile" />
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name"
            onChange={handleChange}
            value={initialValues.firstName}
            name="firstName"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Last Name"
            onChange={handleChange}
            value={initialValues.lastName}
            name="lastName"
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Date Of Birth"
            name="birthday"
            value={initialValues.birthday}
            sx={{ gridColumn: "span 4" }}
            onChange={handleChange}
          />

          <TextField
            select
            fullWidth
            variant="filled"
            label="Gender"
            value={initialValues.gender}
            name="gender"
            sx={{ gridColumn: "span 4" }}
            onChange={handleChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            value={initialValues.email}
            name="email"
            sx={{ gridColumn: "span 4" }}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Contact Number"
            value={initialValues.phonenumber}
            name="phonenumber"
            sx={{ gridColumn: "span 4" }}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address"
            value={initialValues.address}
            name="address"
            sx={{ gridColumn: "span 4" }}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="City"
            value={initialValues.city}
            name="city"
            sx={{ gridColumn: "span 4" }}
            onChange={handleChange}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Edit and Save Patients
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddPatients;
