import React from "react";
import { Box, Button, TextField, Input } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/Header/Header";

import {
  FormControl,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../config/firebase.config";
import axios from "axios";

// Initialize Firebase app
initializeApp(firebaseConfig);

const AddStaffMembers = () => {
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
    shift: "",
    selectedDays: [],
    workingTimeStart: "",
    workingTimeEnd: "",
    workingTimeStartMin: "",
    workingTimeEndMin: "",
  };
  const storage = getStorage();

  const uploadImageToFirebase = async (file) => {
    if (!file) return null;

    const storageRef = ref(storage, `Doctors/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      console.log("Image uploaded successfully!");
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (values, actions) => {
    try {
      console.log(values.image);
      const downloadURL = await uploadImageToFirebase(values.image);

      const updatedValues = { ...values, image: downloadURL };

      const response = await axios.post(
        "http://localhost:5000/users",
        updatedValues
      );
      alert(response.data);
      console.log(updatedValues);
      actions.resetForm();
    } catch (error) {
      console.error("Error adding StaffMember:", error);
      alert(error.response.data);
    }
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

              <div>
                <Input
                  fullWidth
                  variant="filled"
                  type="file"
                  label="Upload Image Of Employee"
                  name="image"
                  onChange={(e) => {
                    const fileName = e.target.files[0];
                    handleChange({
                      target: {
                        name: "image",
                        value: fileName,
                      },
                    });
                  }}
                  onBlur={handleBlur}
                  sx={{ gridColumn: "span 4" }}
                />
                {touched.image && errors.image && (
                  <div style={{ color: "red" }}>{errors.image}</div>
                )}
              </div>

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

              <TextField
                select
                fullWidth
                variant="filled"
                label="Gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                variant="filled"
                label="Position"
                value={values.staffType}
                onChange={handleChange}
                onBlur={handleBlur}
                name="staffType"
                error={!!touched.staffType && !!errors.staffType}
                helperText={touched.staffType && errors.staffType}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Nurse">Nurse</MenuItem>
                <MenuItem value="Cleaner">Cleaner</MenuItem>
                <MenuItem value="Administrative">Admin</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>

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
              {values.staffType === "Doctor" ? (
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
              ) : (
                <TextField
                  select
                  fullWidth
                  variant="filled"
                  label="Shift"
                  error={touched.shift && errors.shift}
                  helperText={touched.shift && errors.shift}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shift}
                  name="shift"
                  sx={{ gridColumn: "span 4" }}
                >
                  <MenuItem value="day">day</MenuItem>
                  <MenuItem value="night">Night</MenuItem>
                </TextField>
              )}

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
                label="Department"
                value={values.department}
                onChange={handleChange}
                onBlur={handleBlur}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="dental">Dental</MenuItem>
                <MenuItem value="OPD">OPD</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                variant="filled"
                label="Starting Hour"
                value={values.workingTimeStart}
                onChange={handleChange}
                onBlur={handleBlur}
                name="workingTimeStart"
                error={!!touched.workingTimeStart && !!errors.workingTimeStart}
                helperText={touched.workingTimeStart && errors.workingTimeStart}
                sx={{ gridColumn: "span 2" }}
              >
                {Array.from(Array(24).keys()).map((hour) => (
                  <MenuItem key={hour} value={hour + 1}>
                    {hour + 1}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                variant="filled"
                label="Ending Hour"
                value={values.workingTimeEnd}
                onChange={handleChange}
                onBlur={handleBlur}
                name="workingTimeEnd"
                error={!!touched.workingTimeEnd && !!errors.workingTimeEnd}
                helperText={touched.workingTimeEnd && errors.workingTimeEnd}
                sx={{ gridColumn: "span 2" }}
              >
                {Array.from(Array(24).keys()).map((hour) => (
                  <MenuItem key={hour} value={hour + 1}>
                    {hour + 1}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                variant="filled"
                label="Starting Minute"
                value={values.workingTimeStartMin}
                onChange={handleChange}
                onBlur={handleBlur}
                name="workingTimeStartMin"
                error={
                  !!touched.workingTimeStartMin && !!errors.workingTimeStartMin
                }
                helperText={
                  touched.workingTimeStartMin && errors.workingTimeStartMin
                }
                sx={{ gridColumn: "span 2" }}
              >
                {Array.from(Array(60).keys()).map((hour) => (
                  <MenuItem
                    key={hour}
                    value={hour < 10 ? `0${hour}` : `${hour}`}
                  >
                    {hour < 10 ? `0${hour}` : `${hour}`}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                variant="filled"
                label="Ending Minute"
                value={values.workingTimeEndMin}
                onChange={handleChange}
                onBlur={handleBlur}
                name="workingTimeEndMin"
                error={
                  !!touched.workingTimeEndMin && !!errors.workingTimeEndMin
                }
                helperText={
                  touched.workingTimeEndMin && errors.workingTimeEndMin
                }
                sx={{ gridColumn: "span 2" }}
              >
                {Array.from(Array(60).keys()).map((hour) => (
                  <MenuItem
                    key={hour}
                    value={hour < 10 ? `0${hour}` : `${hour}`}
                  >
                    {hour < 10 ? `0${hour}` : `${hour}`}
                  </MenuItem>
                ))}
              </TextField>

              <FormControl
                fullWidth
                variant="filled"
                sx={{
                  gridColumn: "span 4",
                  display: "flex",
                  alignItems: "center",
                }}
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
                {touched.selectedDays && errors.selectedDays && (
                  <div style={{ color: "red" }}>{errors.selectedDays}</div>
                )}
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

export default AddStaffMembers;
