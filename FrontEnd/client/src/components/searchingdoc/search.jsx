import React, { useEffect, useState } from "react";
import axios from "axios";
import "./search.css";

export default function Profile() {
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [branch, setBranch] = useState("");
  const [userdata, setUserdata] = useState({});
  const [phone, setPhone] = useState("");

  // const [data , setData] = useState({ doctorId: "", patientId: "", consultationDate: "", contactNum: ""})
  const [specializations, setSpecializations] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setdate] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("user");
    const userObject = JSON.parse(data);
    setUserdata(userObject);
    // setPhone(data.phonenumber);
    setPhone(userObject.phonenumber);
    console.log(userObject);

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get("http://localhost:5000/users/Doctor");
        setDoctors(result.data);
        const uniqueSpecializations = [
          ...new Set(result.data.map((doc) => doc.roleDetails.specialization)),
        ];
        setSpecializations(uniqueSpecializations);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data. Please try again later.");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDoctorBranchChange = (event) => {
    setBranch(event.target.value);
  };
  const handleDateChange = (event) => {
    setdate(event.target.value);
  };

  const handleDoctorChange = (event) => {
    const selectedDoc = doctors.find(
      (doc) => doc.staffID === event.target.value
    );
    setDoctor(selectedDoc);
  };

  const handleSpecializationChange = (event) => {
    setSpecialization(event.target.value);
  };
  const handlePhonenumberChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      style={{
        marginTop: "120px",
        marginBottom: "20px",
        marginLeft: "40px",
        marginRight: "40px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h1>Search Doctor</h1>
        <br />
        <div className="paddingspace">
          <div className="form-group row">
            <label
              htmlFor="inputSpecialization"
              className="col-sm-2 col-form-label"
            >
              Any Specialization
            </label>
            <div className="col-sm-10">
              <select
                id="inputSpecialization"
                className="form-control"
                value={specialization}
                onChange={handleSpecializationChange}
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
        <div className="paddingspace">
          <div className="form-group row">
            <label htmlFor="inputDoctor" className="col-sm-2 col-form-label">
              Doctor Name
            </label>
            <div className="col-sm-10">
              <select
                id="inputDoctor"
                className="form-control"
                onChange={handleDoctorChange}
                disabled={!doctors || !specialization}
              >
                <option value="default">Select a Doctor</option>
                {doctors
                  .filter(
                    (doc) => doc.roleDetails.specialization === specialization
                  )
                  .map((doc, index) => (
                    <option
                      key={index}
                      value={doc.staffID}
                    >{`Dr. ${doc.firstName} ${doc.lastName}`}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="paddingspace">
          <div className="form-group row">
            <label htmlFor="inputHospital" className="col-sm-2 col-form-label">
              Any Hospital
            </label>
            <div className="col-sm-10">
              <select
                id="inputHospital"
                className="form-control"
                value={branch}
                onChange={handleDoctorBranchChange}
                disabled={!doctors || !specialization || !doctor}
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
        <div className="paddingspace">
          <div className="form-group row">
            <label htmlFor="date" className="col-sm-2 col-form-label">
              Appointment Date
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                disabled={!doctors || !specialization || !doctor || !branch}
                className="form-control"
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>
        <div className="paddingspace">
          <div className="form-group row">
            <label htmlFor="date" className="col-sm-2 col-form-label">
              Phone Number
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                id="phoneNo"
                name="PhoneNo"
                value={phone}
                placeholder="Phone Number"
                disabled={
                  !doctors || !specialization || !doctor || !branch || !date
                }
                className="form-control"
                onChange={handlePhonenumberChange}
              />
            </div>
          </div>
        </div>
        <button type="button" className="buttonpri">
          Book Appoinment
        </button>
        <button type="submit" className="buttonpri2">
          Appointment History
        </button>
      </form>
    </div>
  );
}
