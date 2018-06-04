import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import multi from 'redux-multi';

import rootReducer from '../reducers/root-reducer';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const addPromiseSupport = store => {
  const rawDispatch = store.dispatch;

  return action => {
    if (action && typeof(action.then) === 'function') {
      return action.then(rawDispatch);
    }
    return rawDispatch(action);
  }
};

const reduxMiddlewares = [
  thunk,
  multi,
];


const newStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        ...reduxMiddlewares,
      ),
    ),
  );
  store.dispatch = addPromiseSupport(store);
  return store;
};

export default newStore();
