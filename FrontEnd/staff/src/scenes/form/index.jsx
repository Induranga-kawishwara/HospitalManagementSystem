import React, { useState } from "react";
import { Box, Button, TextField, Input } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const Farm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const formData = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
    image: null,
    date: "",
    gender: "",
    staffType: "",
    specialization: "",
    hospitalBranch: "",
    department: "",
    selectedDays: [],
    workingTimeStart: "",
    workingTimeEnd: "",
    workingTimeStartMin: "",
    workingTimeEndMin: "",
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    contact: yup
      .string()
      .matches(
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
        "Invalid phone number"
      )
      .required("Contact number is required"),
    address: yup.string().required("Address line  is required"),
    image: yup.mixed().required("Image upload is required"),
    date: yup.date().required("Date of birth is required"),
    gender: yup.string().required("Gender is required"),
    staffType: yup.string().required("Position is required"),
    // specialization: yup.string().required("Specialization is required"),
    hospitalBranch: yup.string().required("Hospital branch is required"),
    department: yup.string().required("Department is required"),
    selectedDays: yup.array().min(1, "At least one day must be selected"),
    workingTimeStart: yup.number().required("Starting hour is required"),
    workingTimeEnd: yup.number().required("Ending hour is required"),
    workingTimeStartMin: yup.number().required("Starting minute is required"),
    workingTimeEndMin: yup.number().required("Ending minute is required"),
  });

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        initialValues={formData}
        onSubmit={(values, actions) => {
          handleFormSubmit(values);
          actions.resetForm(); // Reset the form after submission
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
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
                value={formikProps.values.firstName}
                error={
                  !!formikProps.touched.firstName &&
                  !!formikProps.errors.firstName
                }
                helperText={
                  formikProps.touched.firstName && formikProps.errors.firstName
                }
                onBlur={formikProps.handleBlur}
                name="firstName"
                onChange={formikProps.handleChange}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                value={formikProps.values.lastName}
                error={
                  !!formikProps.touched.firstName &&
                  !!formikProps.errors.firstName
                }
                helperText={
                  formikProps.touched.firstName && formikProps.errors.firstName
                }
                name="lastName"
                onChange={formikProps.handleChange}
                sx={{ gridColumn: "span 2" }}
              />

              <Input
                fullWidth
                variant="filled"
                type="file"
                label="Upload Image Of Employee"
                name="image"
                onChange={formikProps.handleChange}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date Of Birth"
                name="date"
                onChange={formikProps.handleChange}
                sx={{ gridColumn: "span 4" }}
              />

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  label="Gender"
                  name="gender"
                  value={formikProps.values.gender}
                  onChange={formikProps.handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="staffType">Position</InputLabel>
                <Select
                  labelId="staffType"
                  id="staffType"
                  label="staffType"
                  name="staffType"
                  value={formikProps.values.staffType}
                  onChange={formikProps.handleChange}
                >
                  <MenuItem value="Doctor">Doctor </MenuItem>
                  <MenuItem value="Nurse">Nurse </MenuItem>
                  <MenuItem value="Cleaner">Cleaner</MenuItem>
                  <MenuItem value="Administrative">Admin</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                // onBlur={handleBlur}
                onChange={formikProps.handleChange}
                value={formikProps.values.email}
                name="email"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                // onBlur={handleBlur}
                onChange={formikProps.handleChange}
                value={formikProps.values.contact}
                name="contact"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                // onBlur={handleBlur}
                onChange={formikProps.handleChange}
                value={formikProps.values.address}
                name="address"
                sx={{ gridColumn: "span 4" }}
              />
              {formikProps.values.staffType === "Doctor" && (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Specialization"
                  onChange={formikProps.handleChange}
                  value={formikProps.values.specialization}
                  name="specialization"
                  sx={{ gridColumn: "span 4" }}
                />
              )}

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="hospitalBranch">Hospital Branch</InputLabel>
                <Select
                  labelId="hospitalBranch"
                  id="hospital"
                  label="Hospital Branch"
                  value={formikProps.values.hospitalBranch}
                  name="hospitalBranch"
                  onChange={formikProps.handleChange}
                >
                  <MenuItem value="Malabe">Malabe</MenuItem>
                  <MenuItem value="Kottawa">Kottawa</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="gender-label">Department</InputLabel>
                <Select
                  labelId="department"
                  id="department"
                  label="department"
                  name="department"
                  value={formikProps.values.department}
                  onChange={formikProps.handleChange}
                >
                  <MenuItem value="dental">Dental</MenuItem>
                  <MenuItem value="OPD">OPD</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel id="workingTimeStart">Starting Hour</InputLabel>
                <Select
                  labelId="workingTimeStart"
                  id="workingTimeStart"
                  label="workingTimeStart"
                  name="workingTimeStart"
                  value={formikProps.values.workingTimeStart}
                  onChange={formikProps.handleChange}
                >
                  {Array.from(Array(24).keys()).map((hour) => (
                    <MenuItem key={hour} value={hour + 1}>
                      {hour + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel id="workingTimeEnd">Ending Hour</InputLabel>
                <Select
                  labelId="workingTimeEnd"
                  id="workingTimeEnd"
                  label="workingTimeEnd"
                  name="workingTimeEnd"
                  value={formikProps.values.workingTimeEnd}
                  onChange={formikProps.handleChange}
                >
                  {Array.from(Array(24).keys()).map((hour) => (
                    <MenuItem key={hour} value={hour + 1}>
                      {hour + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel id="workingTimeStartMin">
                  Starting Minute
                </InputLabel>
                <Select
                  labelId="workingTimeStartMin"
                  id="workingTimeStartMin"
                  label="workingTimeStartMin"
                  name="workingTimeStartMin"
                  value={formikProps.values.workingTimeStartMin}
                  onChange={formikProps.handleChange}
                >
                  {Array.from(Array(60).keys()).map((hour) => (
                    <MenuItem key={hour} value={hour + 1}>
                      {hour + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel id="workingTimeEndMin">Ending Minute</InputLabel>
                <Select
                  labelId="workingTimeEndMin"
                  id="workingTimeEndMin"
                  label="workingTimeEndMin"
                  name="workingTimeEndMin"
                  value={formikProps.values.workingTimeEndMin}
                  onChange={formikProps.handleChange}
                >
                  {Array.from(Array(60).keys()).map((hour) => (
                    <MenuItem key={hour} value={hour + 1}>
                      {hour + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={formikProps.values.selectedDays.includes(
                            day
                          )}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            formikProps.setFieldValue(
                              "selectedDays",
                              isChecked
                                ? [...formikProps.values.selectedDays, day]
                                : formikProps.values.selectedDays.filter(
                                    (selectedDay) => selectedDay !== day
                                  )
                            );
                          }}
                          name={day.toLowerCase()}
                        />
                      }
                      label={day}
                    />
                  ))}
                </Box>
              </FormControl>
              <Box
                display="flex"
                justifyContent="end"
                mt="20px"
                gridColumn="span 4"
              >
                <Button type="submit" color="secondary" variant="contained">
                  Create New User
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Farm;
