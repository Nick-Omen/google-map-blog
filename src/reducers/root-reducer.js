import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import countryTooltipReducer from './country-tooltip';

const reducers = {
  routing: routerReducer,
  countryTooltip: countryTooltipReducer,
};

export default combineReducers(reducers);
