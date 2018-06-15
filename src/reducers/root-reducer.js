import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import placesReducer from './places';
import contentReducer from './content';
import mapReducer from './map';

const reducers = {
  routing: routerReducer,
  content: contentReducer,
  places: placesReducer,
  map: mapReducer,
};

export default combineReducers(reducers);
