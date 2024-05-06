import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Input } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";

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
initializeApp(firebaseConfig.firebaseConfig);

const AddStaffMembers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [img, setImg] = useState(null);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [initialValues, setInitialValues] = useState({
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
  });
  const storage = getStorage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffResult = await axios.get(`http://localhost:5000/users`);
        const filteredStaff = staffResult.data.find(
          (staff) => staff._id === id
        );

        // Check if staff member is found
        if (filteredStaff) {
          const updatedInitialValues = {
            ...initialValues,
            firstName: filteredStaff.firstName,
            lastName: filteredStaff.lastName,
            email: filteredStaff.email,
            contact: filteredStaff.contact,
            address: filteredStaff.address,
            image: filteredStaff.image,
            date: filteredStaff.date
              ? new Date(filteredStaff.date).toISOString().split("T")[0]
              : "",
            gender: filteredStaff.gender,
            staffType: filteredStaff.staffType,
            specialization: filteredStaff.roleDetails.specialization,
            hospitalBranch: filteredStaff.hospitalBranch,
            department: filteredStaff.roleDetails.department,
            shift: filteredStaff.roleDetails.shift,
            selectedDays: filteredStaff.selectedDays,
            workingTimeStart: parseInt(
              filteredStaff.workingTimeStart.split(":")[0]
            ),
            workingTimeEnd: parseInt(
              filteredStaff.workingTimeEnd.split(":")[0]
            ),
            workingTimeStartMin: filteredStaff.workingTimeStart.split(":")[1],
            workingTimeEndMin: filteredStaff.workingTimeEnd.split(":")[1],
          };
          setImg(filteredStaff.image);
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

  const handeleIMage = (e) => {
    const imageFile = e.target.files[0];
    // setFile(imageFile);
    setInitialValues({
      ...initialValues,
      image: imageFile,
    });
    setImg(URL.createObjectURL(imageFile));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const downloadURL = await uploadImageToFirebase(initialValues.image);

      const updatedValues = { ...initialValues, image: downloadURL };

      const response = await axios.put(
        `http://localhost:5000/users/${id}`,
        updatedValues
      );
      alert(response.data);
      navigate("/team");
    } catch (error) {
      console.error("Error adding StaffMember:", error);
      alert(error.response.data);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="EDIT STAFF MEMBER"
        subtitle="Edit the Staff Member Profile"
      />
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
            value={initialValues.firstName}
            name="firstName"
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Last Name"
            value={initialValues.lastName}
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
              accept=".jpeg, .png, .jpg"
              onChange={handeleIMage}
              sx={{ gridColumn: "span 4" }}
            />
            <img
              src={img}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
              }}
            />
          </div>

          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Date Of Birth"
            name="date"
            value={initialValues.date}
            onChange={handleChange}
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            select
            fullWidth
            variant="filled"
            label="Gender"
            value={initialValues.gender}
            onChange={handleChange}
            name="gender"
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
            value={initialValues.staffType}
            onChange={handleChange}
            name="staffType"
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
            onChange={handleChange}
            value={initialValues.email}
            name="email"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Contact Number"
            onChange={handleChange}
            value={initialValues.contact}
            name="contact"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address"
            onChange={handleChange}
            value={initialValues.address}
            name="address"
            sx={{ gridColumn: "span 4" }}
          />
          {initialValues.staffType === "Doctor" ? (
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Specialization"
              onChange={handleChange}
              value={initialValues.specialization}
              name="specialization"
              sx={{ gridColumn: "span 4" }}
            />
          ) : (
            <TextField
              select
              fullWidth
              variant="filled"
              label="Shift"
              onChange={handleChange}
              value={initialValues.shift}
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
            value={initialValues.hospitalBranch}
            onChange={handleChange}
            name="hospitalBranch"
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
            value={initialValues.department}
            onChange={handleChange}
            name="department"
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
            value={initialValues.workingTimeStart}
            onChange={handleChange}
            name="workingTimeStart"
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
            value={initialValues.workingTimeEnd}
            onChange={handleChange}
            name="workingTimeEnd"
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
            value={initialValues.workingTimeStartMin}
            onChange={handleChange}
            name="workingTimeStartMin"
            sx={{ gridColumn: "span 2" }}
          >
            {Array.from(Array(60).keys()).map((hour) => (
              <MenuItem key={hour} value={hour < 10 ? `0${hour}` : `${hour}`}>
                {hour < 10 ? `0${hour}` : `${hour}`}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            variant="filled"
            label="Ending Minute"
            value={initialValues.workingTimeEndMin}
            onChange={handleChange}
            name="workingTimeEndMin"
            sx={{ gridColumn: "span 2" }}
          >
            {Array.from(Array(60).keys()).map((hour) => (
              <MenuItem key={hour} value={hour < 10 ? `0${hour}` : `${hour}`}>
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
                      checked={initialValues.selectedDays.includes(day)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          handleChange({
                            target: {
                              name: "selectedDays",
                              value: [...initialValues.selectedDays, day],
                            },
                          });
                        } else {
                          handleChange({
                            target: {
                              name: "selectedDays",
                              value: initialValues.selectedDays.filter(
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
              Edit and Save User
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddStaffMembers;
