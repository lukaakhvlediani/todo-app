import axios from 'axios';
import {
  ADD_WEATHER,
  EDIT_WEATHER,
  DELETE_WEATHER,
  SET_WEATHER,
  REMOVE_WEATHER,
} from '../constants/constants';

export const initialState = {
  weatherArray: [],
  currentWeather: null,
};
const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(initialState, "THIS IS INITIAL")
  switch (type) {
    case ADD_WEATHER: {
      return {
        ...state,
        weatherArray: [...state.weatherArray, payload],
      };
    }
    default:
      return state;
  }
};

export default rootReducer;