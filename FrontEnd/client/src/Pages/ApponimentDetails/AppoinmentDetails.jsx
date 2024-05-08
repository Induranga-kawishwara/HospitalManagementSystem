import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import style from "./appoinmentDetails.module.css";
import { useNavigate } from "react-router-dom";
import { setDoctors } from "../../redux/actions";
import jsPDF from "jspdf";

function AppointmentDetails() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [userdata, setUserdata] = useState({});
  const [data, setData] = useState({
    doctorId: "",
    patientId: "",
    consultationDate: "",
    specialization: "",
    branch: "",
    PhoneNo: "",
  });
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const doctors = useSelector((state) => state.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!doctors || doctors.length === 0) {
        try {
          const result = await axios.get("http://localhost:5000/users/Doctor", {
            headers: { authorization: localStorage.getItem("token") },
          });
          dispatch(setDoctors(result.data));
        } catch (error) {
          console.error("Failed to fetch data:", error);
          if (error.response && error.response.status === 401) {
            // Refresh the page
            window.location.reload();
          }
        }
      }
    };
    fetchData();
  }, [doctors, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setSpecializations([
          ...new Set(doctors.map((doc) => doc.roleDetails.specialization)),
        ]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data. Please try again later.");
      }
      setLoading(false);
    };
    fetchData();
  }, [doctors]);

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setUserdata(userData);
        setData((prevData) => ({
          ...prevData,
          PhoneNo: userData.phonenumber || "",
          patientId: userData.id || "",
        }));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setError("Failed to parse user data. Please try again later.");
      }
    }
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    setError(null);
  };

  const handleDoctorChange = (event) => {
    const selectedDoc = doctors.find((doc) => doc._id === event.target.value);
    setDoctor(selectedDoc);
    setData({ ...data, doctorId: event.target.value });
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const specializationRegex = /^[a-zA-Z\s]*$/;
    const phoneRegex = /^[0-9]{10}$/;

    // Validate form inputs
    if (!data.specialization.trim()) {
      setError("Please select a specialization.");
      return;
    } else if (!specializationRegex.test(data.specialization.trim())) {
      setError("Please enter a valid specialization.");
      return;
    }

    if (!data.doctorId.trim()) {
      setError("Please select a doctor.");
      return;
    }

    if (!data.branch.trim()) {
      setError("Please select a hospital.");
      return;
    }

    if (!data.consultationDate.trim()) {
      setError("Please select an appointment date.");
      return;
    }

    if (!data.PhoneNo.trim()) {
      setError("Please enter a phone number.");
      return;
    } else if (!phoneRegex.test(data.PhoneNo.trim())) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Submit appointment data
    try {
      const res = await axios.post(
        "http://localhost:5000/consultations",
        data,
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
      setData((prevData) => ({
        ...prevData,
        PhoneNo: userdata.phonenumber || "",
        doctorId: "",
        specialization: "",
        branch: "",
        consultationDate: "",
      }));
      downloadPdf(res.data.data);

      alert(res.data.message);
    } catch (error) {
      alert(error.response.data);
    }
  };

  const doneAppointmentHistory = () => {
    const patientId = userdata.id;
    navigate(`/doneappointment/${patientId}`);
  };

  const AppointmentHistory = () => {
    const patientId = userdata.id;
    navigate(`/appointmenthistory/${patientId}`);
  };

  const downloadPdf = (dataset) => {
    const doc = new jsPDF();

    const date = new Date(dataset.consultationStartTime);

    const formattedDate = formatDate(date);
    const formattedTime = formatTime(date);

    doc.text("Appointment Details", 10, 10);
    doc.text(`Patient Name: ${userdata.name}`, 10, 20);
    doc.text(`Doctor Name: ${dataset.doctorName}`, 10, 30);
    doc.text(`Appointment Date: ${formattedDate}`, 10, 40);
    doc.text(`Appointment Time: ${formattedTime}`, 10, 50);
    doc.text(`Specialization: ${dataset.specialization}`, 10, 60);
    doc.text(`Hospital Branch: ${dataset.branchName}`, 10, 70);
    doc.text(`Patient Phone Number: ${dataset.contactNum}`, 10, 80);

    doc.save("appointment_details.pdf");
  };

  const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={style.search_container}>
      <form onSubmit={handleSubmit}>
        <h1>Book An Appointment</h1>
        <br />
        {error && <div className={style.error_msg}>{error}</div>}
        <div className={style.paddingspace}>
          <div className={style.form_group_row}>
            <label
              htmlFor="inputSpecialization"
              className={`${style.col_sm_2} ${style.col_form_label}`}
            >
              Any Specialization
            </label>
            <div className={style.col_sm_10}>
              <select
                id="inputSpecialization"
                className={style.form_control}
                value={data.specialization}
                name="specialization"
                onChange={handleChange}
              >
                <option value="">Any Specialization</option>
                {specializations.map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={style.paddingspace}>
          <div className={style.form_group_row}>
            <label
              htmlFor="inputDoctor"
              className={`${style.col_sm_2} ${style.col_form_label}`}
            >
              Doctor Name
            </label>
            <div className={style.col_sm_10}>
              <select
                id="inputDoctor"
                className={style.form_control}
                onChange={handleDoctorChange}
                disabled={!doctors || !data.specialization}
              >
                <option value="default">Select a Doctor</option>
                {doctors
                  .filter(
                    (doc) =>
                      doc.roleDetails.specialization === data.specialization
                  )
                  .map((doc, index) => (
                    <option key={index} value={doc._id}>
                      {`Dr. ${doc.firstName} ${doc.lastName}`}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className={style.paddingspace}>
          <div className={style.form_group_row}>
            <label
              htmlFor="inputHospital"
              className={`${style.col_sm_2} ${style.col_form_label}`}
            >
              Any Hospital
            </label>
            <div className={style.col_sm_10}>
              <select
                id="inputHospital"
                className={style.form_control}
                name="branch"
                value={data.branch}
                onChange={handleChange}
                disabled={!doctors || !data.specialization || !doctor}
              >
                <option value="default">Which Hospital</option>
                {doctor &&
                  doctor.hospitalBranch &&
                  doctor.hospitalBranch.map((branch, index) => (
                    <option key={index} value={branch}>
                      {branch}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className={style.paddingspace}>
          <div className={style.form_group_row}>
            <label
              htmlFor="date"
              className={`${style.col_sm_2} ${style.col_form_label}`}
            >
              Appointment Date
            </label>
            <div className={style.col_sm_10}>
              <input
                type="date"
                id="date"
                name="consultationDate"
                value={data.consultationDate}
                disabled={
                  !doctors || !data.specialization || !doctor || !data.branch
                }
                className={style.form_control}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className={style.paddingspace}>
          <div className={style.form_group_row}>
            <label
              htmlFor="date"
              className={`${style.col_sm_2} ${style.col_form_label}`}
            >
              Phone Number
            </label>
            <div className={style.col_sm_10}>
              <input
                type="text"
                id="phoneNo"
                name="PhoneNo"
                value={data.PhoneNo}
                placeholder="Phone Number"
                disabled={
                  !doctors ||
                  !data.specialization ||
                  !doctor ||
                  !data.branch ||
                  !data.consultationDate
                }
                className={style.form_control}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button type="submit" className={style.buttonpri}>
          Book Appointment
        </button>
        <button
          type="button"
          className={style.buttonpri2}
          onClick={AppointmentHistory}
        >
          Upcoming Appointments
        </button>
        <button
          type="button"
          className={style.buttonpri2}
          onClick={doneAppointmentHistory}
        >
          Appointment History
        </button>
      </form>
    </div>
  );
}

export default AppointmentDetails;
