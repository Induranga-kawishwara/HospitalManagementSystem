import { SET_DOCTORS, ADD_DOCTOR, SET_REVIEWS } from "./actions";

const initialState = {
  doctors: [],
  reviews: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOCTORS:
      return { ...state, doctors: action.payload };
    case ADD_DOCTOR:
      return { ...state, doctors: [...state.doctors, action.payload] };

    case SET_REVIEWS:
      return { ...state, reviews: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
