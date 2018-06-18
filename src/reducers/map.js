import { createReducer, createAction } from 'redux-act';

const initialState = {
  center: {
    latLng: null,
    stamp: 0
  },
  toggle: {
    id: null,
    slug: null,
    stamp: 0
  }
};

const getStamp = () => new Date().getTime();

export const centerMapAction = createAction('Center map');

export const toggleMapMarkerAction = createAction('Toggle map marker');

export default createReducer({
  [centerMapAction]: (state, payload) => ({
    ...state,
    center: {
      latLng: payload,
      stamp: getStamp()
    },
  }),
  [toggleMapMarkerAction]: (state, payload) => ({
    ...state,
    toggle: {
      id: payload.id,
      slug: payload.slug,
      stamp: getStamp()
    }
  })
}, initialState);
