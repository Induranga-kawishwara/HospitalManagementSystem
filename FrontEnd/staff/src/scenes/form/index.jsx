import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Input } from "@mui/material"; // Inside your component
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";

const Farm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
              <Input
                fullWidth
                variant="filled"
                type="file" // Set type to "file" for image input
                label="Upload Image Of Employee" // Label for the input (optional)
                name="image" // Name of the input (optional, used for form submission)
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date" // Change type to "date"
                label="Date Of Birth" // Change label to appropriate label
                name="date" // Change name to appropriate name
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
                  name="gender" // Name of the input (optional, used for form submission)
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
                <InputLabel id="gender-label">Position</InputLabel>
                <Select
                  labelId="position"
                  id="position"
                  label="Position"
                  name="position" // Name of the input (optional, used for form submission)
                >
                  <MenuItem value="male">Doctor </MenuItem>
                  <MenuItem value="female">Admin</MenuItem>
                  <MenuItem value="other">Cleaner</MenuItem>
                  <MenuItem value="male">Nurse </MenuItem>
                  <MenuItem value="female">Admin</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

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
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="gender-label">Hospital Branch</InputLabel>
                <Select
                  labelId="hospital-label"
                  id="hospital"
                  label="Hospital Branch"
                  name="gender" // Name of the input (optional, used for form submission)
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
                  name="department" // Name of the input (optional, used for form submission)
                >
                  <MenuItem value="dental">Dental</MenuItem>
                  <MenuItem value="OPD">OPD</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />

              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Select Days"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.selectedDays}
                name="selectedDays"
                error={!!touched.selectedDays && !!errors.selectedDays}
                helperText={touched.selectedDays && errors.selectedDays}
                sx={{ gridColumn: "span 4" }}
              /> */}

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Select Days"
                onBlur={handleBlur}
                value={values.selectedDays}
                name="selectedDays"
                error={!!touched.selectedDays && !!errors.selectedDays}
                helperText={touched.selectedDays && errors.selectedDays}
                sx={{ gridColumn: "span 4" }}
              />

              <FormControlLabel
                control={<Checkbox />}
                label="Mo"
                name="selectedDays"
                onBlur={handleBlur}
                onChange={handleChange}
                value="Mo"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Tu"
                name="selectedDays"
                onBlur={handleBlur}
                onChange={handleChange}
                value="Tu"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="We"
                name="selectedDays"
                onBlur={handleBlur}
                onChange={handleChange}
                value="We"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Th"
                name="selectedDays"
                onBlur={handleBlur}
                onChange={handleChange}
                value="Th"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Fr"
                name="selectedDays"
                onBlur={handleBlur}
                onChange={handleChange}
                value="Fr"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Sa"
                name="selectedDays"
                onBlur={handleBlur}
                onChange={handleChange}
                value="Sa"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Su"
                name="selectedDays"
                onBlur={handleBlur}
                onChange={handleChange}
                value="Su"
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel id="gender-label">Starting Hour</InputLabel>
                <Select
                  labelId="hospital-label"
                  id="hospital"
                  label="Hospital Branch"
                  name="gender" // Name of the input (optional, used for form submission)
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
                <InputLabel id="gender-label">Ending Hour</InputLabel>
                <Select
                  labelId="hospital-label"
                  id="hospital"
                  label="Hospital Branch"
                  name="gender" // Name of the input (optional, used for form submission)
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
                <InputLabel id="gender-label">Starting Minute</InputLabel>
                <Select
                  labelId="hospital-label"
                  id="hospital"
                  label="Hospital Branch"
                  name="gender" // Name of the input (optional, used for form submission)
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
                <InputLabel id="gender-label">Ending Minute</InputLabel>
                <Select
                  labelId="hospital-label"
                  id="hospital"
                  label="Hospital Branch"
                  name="gender" // Name of the input (optional, used for form submission)
                >
                  {Array.from(Array(60).keys()).map((hour) => (
                    <MenuItem key={hour} value={hour + 1}>
                      {hour + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>{" "}
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Edit And Save
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Farm;
