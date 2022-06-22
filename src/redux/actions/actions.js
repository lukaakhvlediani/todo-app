import {
    ADD_WEATHER,
    EDIT_WEATHER,
    DELETE_WEATHER,
    SET_WEATHER,
    REMOVE_WEATHER,
  } from '../constants/constants';
  
  const addWeather = (payload) => ({
    type: ADD_WEATHER,
    payload,
  });
  
  const weatherEdit = (payload) => ({
    type: EDIT_WEATHER,
    payload,
  });
  
  const deleteWeather = (payload) => ({
    type: DELETE_WEATHER,
    payload,
  });
  const getWeather = (payload) => ({
    type: SET_WEATHER,
    payload,
  });
  const removeWeather = (payload = {}) => ({
    type: REMOVE_WEATHER,
    payload,
  });
  
  export { addWeather, weatherEdit, deleteWeather, getWeather, removeWeather };