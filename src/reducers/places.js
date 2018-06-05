import { createReducer, createAction } from 'redux-act';
import request from '../utils/api';

const initialState = {
  list: []
};

export const receivePlacesAction = createAction('Receive places');

export const fetchPlaces = () => request({
  method: 'GET',
  url: '/places/',
  onSuccess: res => receivePlacesAction(res)
});

export default createReducer({
  [receivePlacesAction]: (state, payload) => ({
    ...state,
    list: payload
  })
}, initialState)
