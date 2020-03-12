import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE
} from './types';
import { setAlert } from './alert';

const url = process.env.REACT_APP_BACKEND_URL;

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const response = await axios.get(`${url}/api/profile/me`);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Create or Update a Profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const response = await axios.post(`${url}/api/profile`, formData);

    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    history.push('/dashboard'); //redirect via history object

    // if (!edit) {
    //   history.push('/dashboard'); //redirect via history object
    // }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(e => dispatch(setAlert(e.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const res = await axios.put(`${url}/api/profile/experience`, formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard'); //redirect via history object
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(e => dispatch(setAlert(e.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const res = await axios.put(`${url}/api/profile/education`, formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard'); //redirect via history object
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(e => dispatch(setAlert(e.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`${url}/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`${url}/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete account and profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This cannot be undone!')) {
    try {
      await axios.delete(`${url}/api/profile`);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted.'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
    }
  }
};
