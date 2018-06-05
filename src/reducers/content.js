import { createReducer, createAction } from 'redux-act';

const initialState = {
  hidden: true
};

export const showContentAction = createAction('Show content');

export const hideContentAction = createAction('Hide content');

export default createReducer({
  [showContentAction]: state => ({
    hidden: false
  }),
  [hideContentAction]: state => ({
    hidden: true
  }),
}, initialState);
