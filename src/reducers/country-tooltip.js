import { createAction, createReducer } from 'redux-act';
import request from '../utils/api';
import { dummyAction } from './common';

const initialState = {
  isOpen: false,
  countryCode: null,
  positionX: null,
  positionY: null,
  data: {}
};

export const showCountryTooltipAction = createAction('Show country tooltip');

export const receiveCountryTooltipInfoAction = createAction('Receive country tooltip');

export const hideCountryTooltipAction = createAction('Hide country tooltip');

export const fetchCountryTooltipInfo = (countryCode, data) => {
  if (data && data[countryCode]) {
    return dummyAction();
  }
  return request({
    method: 'GET',
    url: `/country/${countryCode}/`,
    onSuccess: res => receiveCountryTooltipInfoAction({ key: countryCode, data: res.data })
  });
};

export default createReducer({
  [showCountryTooltipAction]: (state, payload) => ({
    ...state,
    isOpen: true,
    ...payload,
    data: {
      ...state.data,
      [payload.countryCode]: {}
    }
  }),
  [hideCountryTooltipAction]: state => ({
    // ...initialState,
    // data: state.data
    ...state
  }),
  [receiveCountryTooltipInfoAction]: (state, payload) => ({
    ...state,
    data: {
      ...state.data,
      [payload.key]: payload.data
    }
  })
}, initialState);
