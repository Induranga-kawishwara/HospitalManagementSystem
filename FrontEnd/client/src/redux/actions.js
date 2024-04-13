export const FETCH_DOCTORS = "FETCH_DOCTORS";
export const ADD_DOCTOR = "ADD_DOCTOR";

export const fetchDoctors = (doctors) => ({
  type: FETCH_DOCTORS,
  payload: doctors,
});

export const addDoctor = (doctor) => ({
  type: ADD_DOCTOR,
  payload: doctor,
});
