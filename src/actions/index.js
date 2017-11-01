import axios from 'axios';
import actionTypes from './actionTypes';

export function setData(payload) {
  return {
    type: actionTypes.SET_DATA,
    payload,
  };
}

export function fetchLoading() {
  return {
    type: actionTypes.FETCH_LOADING,
    isLoading: false,
  };
}

export function fetchError(error) {
  return {
    type: actionTypes.FETCH_ERROR,
    payload: error,
  };
}


// action creators

export const fetchData = () =>
  // make axios and thunk and async call here...
  async (dispatch) => {
    try {
      // this will hit our test url by default.
      const API_URL = '/api/v1';
      const url = `${API_URL}/marco`;
      const response = await axios.get(url);
      dispatch(setData(response.data));
    } catch (e) {
      dispatch(fetchError(e));
    }
  };
