import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signup.module.css";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthday: "",
    phonenumber: "",
    address: "",
    city: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }

    if (!/^[a-zA-Z]*$/.test(data.firstName.trim())) {
      setError("Please enter a valid first name.");
      return;
    }

    if (!data.lastName.trim()) {
      setError("Please enter your last name.");
      return;
    }

    if (!/^[a-zA-Z]*$/.test(data.lastName.trim())) {
      setError("Please enter a valid last name.");
      return;
    }

    if (!data.gender) {
      setError("Please select your gender.");
      return;
    }
    if (!data.birthday) {
      setError("Please Enter your birthday.");
      return;
    }

    if (!data.phonenumber.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!/^\d{10}$/.test(data.phonenumber.trim())) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!data.address.trim()) {
      setError("Please enter your address.");
      return;
    }

    if (!data.city.trim()) {
      setError("Please enter your city.");
      return;
    }

    if (!data.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email.trim())
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!data.password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/patients", data);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="form-box" style={{ marginTop: "100px" }}>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Do you already have an Account?</h1>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                Login
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
                className={styles.input}
              />
              <select
                id="gender"
                name="gender"
                className={styles.input}
                value={data.gender}
                onChange={handleChange}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="date"
                id="date"
                name="birthday"
                value={data.birthday}
                className={styles.input}
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Phone Number"
                name="phonenumber"
                onChange={handleChange}
                value={data.phonenumber}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={handleChange}
                value={data.address}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                onChange={handleChange}
                value={data.city}
                required
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
