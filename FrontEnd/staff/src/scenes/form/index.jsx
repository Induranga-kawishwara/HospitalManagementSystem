import React from "react";
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
  const initialValues = {
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

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
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
    address: yup.string().required("Address line is required"),
    image: yup.mixed().required("Image upload is required"),
    date: yup.date().required("Date of birth is required"),
    gender: yup.string().required("Gender is required"),
    staffType: yup.string().required("Position is required"),
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
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
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
                value={values.firstName}
                error={touched.firstName && errors.firstName}
                helperText={touched.firstName && errors.firstName}
                onBlur={handleBlur}
                name="firstName"
                onChange={handleChange}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                value={values.lastName}
                onBlur={handleBlur}
                error={touched.lastName && errors.lastName}
                helperText={touched.lastName && errors.lastName}
                name="lastName"
                onChange={handleChange}
                sx={{ gridColumn: "span 2" }}
              />

              <Input
                fullWidth
                variant="filled"
                type="file"
                label="Upload Image Of Employee"
                name="image"
                onChange={handleChange}
                error={touched.image && errors.image}
                helperText={touched.image && errors.image}
                onBlur={handleBlur}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date Of Birth"
                name="date"
                error={touched.date && errors.date}
                helperText={touched.date && errors.date}
                onBlur={handleBlur}
                onChange={handleChange}
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
                  error={touched.gender && errors.gender}
                  helperText={touched.gender && errors.gender}
                  onBlur={handleBlur}
                  value={values.gender}
                  onChange={handleChange}
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
                  error={touched.staffType && errors.staffType}
                  helperText={touched.staffType && errors.staffType}
                  onBlur={handleBlur}
                  value={values.staffType}
                  onChange={handleChange}
                >
                  <MenuItem value="Doctor">Doctor</MenuItem>
                  <MenuItem value="Nurse">Nurse</MenuItem>
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
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onChange={handleChange}
                error={touched.contact && errors.contact}
                helperText={touched.contact && errors.contact}
                onBlur={handleBlur}
                value={values.contact}
                name="contact"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onChange={handleChange}
                value={values.address}
                error={touched.address && errors.address}
                helperText={touched.address && errors.address}
                onBlur={handleBlur}
                name="address"
                sx={{ gridColumn: "span 4" }}
              />
              {values.staffType === "Doctor" && (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Specialization"
                  error={touched.specialization && errors.specialization}
                  helperText={touched.specialization && errors.specialization}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.specialization}
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
                  value={values.hospitalBranch}
                  error={touched.hospitalBranch && errors.hospitalBranch}
                  helperText={touched.hospitalBranch && errors.hospitalBranch}
                  onBlur={handleBlur}
                  name="hospitalBranch"
                  onChange={handleChange}
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
                  value={values.department}
                  onChange={handleChange}
                  error={touched.department && errors.department}
                  helperText={touched.department && errors.department}
                  onBlur={handleBlur}
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
                  value={values.workingTimeStart}
                  onChange={handleChange}
                  error={touched.workingTimeStart && errors.workingTimeStart}
                  helperText={
                    touched.workingTimeStart && errors.workingTimeStart
                  }
                  onBlur={handleBlur}
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
                  value={values.workingTimeEnd}
                  onChange={handleChange}
                  error={touched.workingTimeEnd && errors.workingTimeEnd}
                  helperText={touched.workingTimeEnd && errors.workingTimeEnd}
                  onBlur={handleBlur}
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
                  value={values.workingTimeStartMin}
                  onChange={handleChange}
                  error={
                    touched.workingTimeStartMin && errors.workingTimeStartMin
                  }
                  helperText={
                    touched.workingTimeStartMin && errors.workingTimeStartMin
                  }
                  onBlur={handleBlur}
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
                  value={values.workingTimeEndMin}
                  onChange={handleChange}
                  error={touched.workingTimeEndMin && errors.workingTimeEndMin}
                  helperText={
                    touched.workingTimeEndMin && errors.workingTimeEndMin
                  }
                  onBlur={handleBlur}
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
                          checked={values.selectedDays.includes(day)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            if (isChecked) {
                              handleChange({
                                target: {
                                  name: "selectedDays",
                                  value: [...values.selectedDays, day],
                                },
                              });
                            } else {
                              handleChange({
                                target: {
                                  name: "selectedDays",
                                  value: values.selectedDays.filter(
                                    (selectedDay) => selectedDay !== day
                                  ),
                                },
                              });
                            }
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
