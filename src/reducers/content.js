import { createReducer, createAction } from 'redux-act';

const initialState = {
  hidden: false
};

export const showContentAction = createAction('Show content');

export const hideContentAction = createAction('Hide content');

export default createReducer({
  [showContentAction]: state => ({
    hidden: false
  }),
  [hideContentAction]: state => ({
    hidden: false
  }),
}, initialState);
