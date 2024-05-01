import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/Header/Header";
import { MenuItem } from "@mui/material";
import axios from "axios";

const AddPatients = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    birthday: "",
    phonenumber: "",
    address: "",
    city: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      console.log(values);
      const updatedValues = { ...values, password: `${values.firstName}@1A` };

      const response = await axios.post(
        "http://localhost:5000/patients",
        updatedValues
      );
      alert(
        `${response.data.message}  tempory Password :-${values.firstName}@1A`
      );
      console.log(updatedValues);
      actions.resetForm();
    } catch (error) {
      console.error("Error adding StaffMember:", error);
      alert(error.response.data.message);
    }
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    birthday: yup.date().required("Date of birth is required"),
    phonenumber: yup
      .string()
      .matches(
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
        "Invalid phone number"
      )
      .required("Contact number is required"),
    address: yup.string().required("Address line is required"),
    city: yup.string().required("City is required"),
    gender: yup.string().required("Gender is required"),
  });

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <Formik
        onSubmit={handleSubmit}
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
                type="date" // Change type to "date"
                label="Date Of Birth" // Change label to appropriate label
                name="birthday" // Change name to appropriate name
                sx={{ gridColumn: "span 4" }}
                error={!!touched.birthday && !!errors.birthday}
                helperText={touched.birthday && errors.birthday}
                onBlur={handleBlur}
                onChange={handleChange}
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
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phonenumber}
                name="phonenumber"
                error={!!touched.phonenumber && !!errors.phonenumber}
                helperText={touched.phonenumber && errors.phonenumber}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Patients
              </Button>
            </Box>
            {/* <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Edit And Save
              </Button>
            </Box> */}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddPatients;
