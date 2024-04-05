import Dropdown from "react-bootstrap/Dropdown";
import React, { useState } from "react";
import "./search.css";
import axios from "axios";



export default function Profile() {



  return (
    <div>
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
              
              <label htmlFor="inputName" className="col-sm-2 col-form-label">
                Doctor Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Doctor Name"
                />
              </div>
            </div>
          </div>

          <div className="paddingspace">
            <div className="form-group row">
              <label htmlFor="inputState" className="col-sm-2 col-form-label">
                Any Specialization
              </label>
              <div className="col-sm-10">
                <select
                  id="inputState"
                  className="form-control"
                >
                  <option disabled selected>
                    Any Specialization
                  </option>
                  <option value="Counselor">Counselor</option>
                </select>
              </div>
            </div>
          </div>

          <div className="paddingspace">
            <div className="form-group row">
              <label htmlFor="inputState" className="col-sm-2 col-form-label">
                Any Hospital
              </label>
              <div className="col-sm-10">
                <select
                  id="inputState"
                  className="form-control"
                >
                  <option disabled selected>
                    Witch Hospital
                  </option>
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
    </div>
  );
}
