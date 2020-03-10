import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlert } from './alert';

const url = process.env.REACT_APP_BACKEND_URL;

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
