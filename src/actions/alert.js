import { v4 as uuidV4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: { id: uuidV4(), msg, alertType }
  });
};
