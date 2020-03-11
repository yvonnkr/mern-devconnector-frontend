import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import { setAlert } from './alert';
import setAuthToken from './../utils/setAuthToken';

const url = process.env.REACT_APP_BACKEND_URL;

//Load user (Action)
export const loadUser = () => async dispatch => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(`${url}/api/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    // dispatch(setAlert(err.response.msg,'danger'))
    dispatch({ type: AUTH_ERROR });
  }
};

//Register User (Action)
export const register = ({ name, email, password }) => async dispatch => {
  try {
    const response = await axios.post(`${url}/api/users`, {
      name,
      email,
      password
    });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//Login User (Action)
export const login = (email, password) => async dispatch => {
  try {
    const response = await axios.post(`${url}/api/auth`, { email, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//Logout user  / Clear profile(action)
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
