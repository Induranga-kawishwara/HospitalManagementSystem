import React, { useEffect, useState } from "react";
import axios from "axios";
import "./search.css";

export default function Profile() {
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [branch, setBranch] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  const handleDoctorChange = (event) => {
    const selectedDoc = doctors.find(
      (doc) => doc.staffID === event.target.value
    );
    setDoctor(selectedDoc);
  };

  const handleSpecializationChange = (event) => {
    setSpecialization(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for appointments", { doctor, branch });
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
                disabled={!specialization}
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
                disabled={!doctor}
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
                className="form-control"
              />
            </div>
          </div>
        </div>
        <button type="submit" className="buttonpri">
          Search
        </button>
        <button type="button" className="buttonpri2">
          Booked Appointment
        </button>
      </form>
    </div>
  );
}
