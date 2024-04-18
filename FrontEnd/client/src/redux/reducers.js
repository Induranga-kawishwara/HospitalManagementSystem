import { SET_DOCTORS, ADD_DOCTOR, SET_CONSULTATIONS } from "./actions";

const initialState = {
  doctors: [],
  consultations: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOCTORS:
      return { ...state, doctors: action.payload };
    case ADD_DOCTOR:
      return { ...state, doctors: [...state.doctors, action.payload] };

    case SET_CONSULTATIONS:
      return { ...state, consultations: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
