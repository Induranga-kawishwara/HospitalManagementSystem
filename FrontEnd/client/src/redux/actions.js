export const SET_DOCTORS = "SET_DOCTORS";
export const ADD_DOCTOR = "ADD_DOCTOR";

export const setDoctors = (doctors) => ({
  type: SET_DOCTORS,
  payload: doctors,
});

export const addDoctor = (doctor) => ({
  type: ADD_DOCTOR,
  payload: doctor,
});
