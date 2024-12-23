import React from "react";
import { Box, Button, TextField, MenuItem, Container } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/Header/Header";
import axios from "axios";

const ReqBlood = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    contact: "",
    bloodType: "",
    requestedBloodCount: "",
    hospitalBranch: "",
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, actions) => {
    console.log("Submitting form with values:", values);
    try {
      const response = await axios.post(
        "http://localhost:5000/bloodReqest",
        values
      );
      console.log("Response:", response.data);
      alert(response.data);
      actions.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.response.data);
    }
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    contact: yup
      .string()
      .matches(
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
        "Invalid phone number"
      )
      .required("Contact number is required"),
    hospitalBranch: yup.string().required("Hospital branch is required"),
    bloodType: yup.string().required("Blood type is required"),
    requestedBloodCount: yup.number().required("Count is required"),
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <Container maxWidth="lg">
      <Box m="20px" minHeight="100vh">
        <Header title="Request Blood" />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Contact Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  select
                  fullWidth
                  variant="filled"
                  label="Hospital Branch"
                  value={values.hospitalBranch}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="hospitalBranch"
                  error={!!touched.hospitalBranch && !!errors.hospitalBranch}
                  helperText={touched.hospitalBranch && errors.hospitalBranch}
                  sx={{ gridColumn: "span 4" }}
                >
                  <MenuItem value="Malabe">Malabe</MenuItem>
                  <MenuItem value="Kottawa">Kottawa</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>

                <TextField
                  select
                  fullWidth
                  variant="filled"
                  label="Blood Type"
                  value={values.bloodType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="bloodType"
                  error={!!touched.bloodType && !!errors.bloodType}
                  helperText={touched.bloodType && errors.bloodType}
                  sx={{ gridColumn: "span 4" }}
                >
                  {bloodTypes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  variant="filled"
                  name="requestedBloodCount"
                  type="text"
                  label="Count Of Blood"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.requestedBloodCount}
                  error={
                    !!touched.requestedBloodCount &&
                    !!errors.requestedBloodCount
                  }
                  helperText={
                    touched.requestedBloodCount && errors.requestedBloodCount
                  }
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Book Blood
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};
export default ReqBlood;
