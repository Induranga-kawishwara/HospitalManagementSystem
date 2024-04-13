import React, { useEffect, useState } from "react";
import axios from "axios";
import "./search.css";

function Profile() {
  const [doctors, setDoctors] = useState([]);
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

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      try {
        setUserdata(JSON.parse(userDataString));
        setData((data) => ({
          ...data,
          PhoneNo: userdata.phonenumber || "",
          patientId: userdata.id || "",
        }));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setError("Failed to parse user data. Please try again later.");
      }
    }
  }, [userdata.id, userdata.phonenumber]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleDoctorChange = (event) => {
    const selectedDoc = doctors.find((doc) => doc._id === event.target.value);
    setDoctor(selectedDoc);
    setData({ ...data, doctorId: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/consultations", data);
      setData((data) => ({
        ...data,
        PhoneNo: userdata.phonenumber || "",
        doctorId: "",
        consultationDate: "",
        specialization: "",
        branch: "",
      }));
      alert(res.data);
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
        <div className="paddingspace">
          <div className="form-group row">
            <label htmlFor="inputHospital" className="col-sm-2 col-form-label">
              Any Hospital
            </label>
            <div className="col-sm-10">
              <select
                id="inputHospital"
                className="form-control"
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
        <div className="paddingspace">
          <div className="form-group row">
            <label htmlFor="date" className="col-sm-2 col-form-label">
              Appointment Date
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                id="date"
                name="consultationDate"
                value={data.consultationDate}
                disabled={
                  !doctors || !data.specialization || !doctor || !data.branch
                }
                className="form-control"
                onChange={handleChange}
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
                value={data.PhoneNo}
                placeholder="Phone Number"
                disabled={
                  !doctors ||
                  !data.specialization ||
                  !doctor ||
                  !data.branch ||
                  !data.consultationDate
                }
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="buttonpri">
          Book Appointment
        </button>
        <button type="button" className="buttonpri2">
          Appointment History
        </button>
      </form>
    </div>
  );
}

export default Profile;
