import axios from 'axios';

import { GET_PROFILE, PROFILE_ERROR } from './types';
// import { setAlert } from './alert';

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
