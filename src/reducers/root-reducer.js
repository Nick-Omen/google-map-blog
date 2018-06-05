import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import placesReducer from './places';
import contentReducer from './content';

const reducers = {
  routing: routerReducer,
  content: contentReducer,
  places: placesReducer,
};

export default combineReducers(reducers);
