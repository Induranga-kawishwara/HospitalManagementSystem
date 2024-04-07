import React, { useEffect, useState } from "react";
import "./search.css";
import axios from "axios";

export default function Profile() {
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState("default");
  const [specializations, setSpecializations] = useState([]);
  const [specialization, setSpecialization] = useState("default");
  const [hospital, setHospital] = useState("default");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/users/Doctor");
        setDoctors(result.data);
        const fetchedSpecializations = result.data.map((doctor) => {
          return doctor.roleDetails.specialization;
        });
        setSpecializations(fetchedSpecializations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDoctorChange = (event) => {
    setDoctor(event.target.value);
  };

  const handleSpecializationChange = (event) => {
    setSpecialization(event.target.value);
  };

  const handleHospitalChange = (event) => {
    setHospital(event.target.value);
  };

  return (
    <div
      style={{
        marginTop: "120px",
        marginBottom: "20px",
        marginLeft: "40px",
        marginRight: "40px",
      }}
    >
      <form>
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
                <option value="default">Any Specialization</option>
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
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Doctor Name
            </label>
            <div className="col-sm-10">
              <select
                id="inputDoctor"
                className="form-control"
                value={doctor}
                onChange={handleDoctorChange}
              >
                <option value="default">Select a Doctor</option>
                {doctors.map(
                  (doc, index) =>
                    doc.roleDetails.specialization === specialization && (
                      <option key={index} value={doc.staffID}>
                        {`Dr. ${doc.firstName} ${doc.lastName}`}
                      </option>
                    )
                )}
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
                value={hospital}
                onChange={handleHospitalChange}
              >
                <option value="default">Which Hospital</option>
                <option value="colombo">Colombo</option>
              </select>
            </div>
          </div>
        </div>
        <div className="paddingspace">
          <div className="form-group row">
            <label htmlFor="birthday" className="col-sm-2 col-form-label">
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
        <button type="submit" className="buttonpri2">
          Booked Appointment
        </button>
      </form>
    </div>
  );
}
