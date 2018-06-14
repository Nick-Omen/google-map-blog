import { createReducer, createAction } from 'redux-act';
import request from '../utils/api';

const initialState = {
  list: [],
  listToShow: [],
};

export const receivePlacesAction = createAction('Receive places');

export const receivePlacesToShowAction = createAction('Receive places to show');

export const fetchPlaces = () => request({
  method: 'GET',
  url: '/places/',
  onSuccess: res => receivePlacesAction(res)
});

export const fetchPlacesToShow = ids => receivePlacesToShowAction(ids);

export default createReducer({
  [receivePlacesAction]: (state, payload) => ({
    ...state,
    list: payload
  }),
  [receivePlacesToShowAction]: (state, payload) => ({
    ...state,
    listToShow: payload.length === 0 ? [] : state.list.filter(i => payload.indexOf(i.id) !== -1)
  }),
}, initialState)
