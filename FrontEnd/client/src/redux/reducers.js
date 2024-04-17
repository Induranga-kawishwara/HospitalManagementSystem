import { SET_DOCTORS, ADD_DOCTOR } from "./actions";

const initialState = {
  doctors: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOCTORS:
      return { ...state, doctors: action.payload };
    case ADD_DOCTOR:
      return { ...state, doctors: [...state.doctors, action.payload] };
    default:
      return state;
  }
};

export default rootReducer;
