export const SET_DOCTORS = "SET_DOCTORS";
export const ADD_DOCTOR = "ADD_DOCTOR";
export const SET_REVIEWS = "SET_REVIEWS";

export const setDoctors = (doctors) => ({
  type: SET_DOCTORS,
  payload: doctors,
});

export const addDoctor = (doctor) => ({
  type: ADD_DOCTOR,
  payload: doctor,
});

export const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  payload: reviews,
});
