import { createReducer, createAction } from 'redux-act';
import request from '../utils/api';

const initialState = {
  list: [],
  listToShow: [],
  details: null
};

export const receivePlacesAction = createAction('Receive places');

export const receivePlacesToShowAction = createAction('Receive places to show');

export const setPlaceDetailsFromListAction = createAction('Receive place details');

export const receivePlaceDetailsAction = createAction('Receive place details');

export const fetchPlaces = () => request({
  method: 'GET',
  url: '/places/',
  onSuccess: res => receivePlacesAction(res)
});

export const fetchPlacesToShow = payload => receivePlacesToShowAction(payload);

export default createReducer({
  [receivePlacesAction]: (state, payload) => ({
    ...state,
    list: payload
  }),
  [receivePlacesToShowAction]: (state, payload) => {
    const mIds = payload.map(m => m.id);
    return {
      ...state,
      listToShow: payload.length === 0
        ? []
        : state.list.filter(m => mIds.indexOf(m.id) !== -1)
    }
  },
  [setPlaceDetailsFromListAction]: (state, payload) => ({
    ...state,
    details: state.list.find(p => p.id === payload || p.slug === payload)
  })
}, initialState)
