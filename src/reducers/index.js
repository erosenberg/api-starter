import { combineReducers } from 'redux';
import actionTypes from '../actions/actionTypes';
import { AppState } from '../store/initialState';

function appReducer(state = AppState, action) {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return {
        ...state,
        portfolio: action.payload,
      };
    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        connectionError: action.payload,
      };
    case actionTypes.FETCH_LOADING:
      debugger;
      return {
        ...state,
        payload: action.payload,
      };
    default:
      return state;
  }
}

export default appReducer;
