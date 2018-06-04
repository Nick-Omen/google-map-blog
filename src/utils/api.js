import axios from 'axios';

import { push } from 'react-router-redux';
import { dummyAction } from '../reducers/common';
import { LocalStorage } from '../utils/storages';
import { BASE_URL, API_TEST } from '../const';
import mockApi from '../mock-api';

export const api = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
  validateStatus: () => true
});

// Set token from localStore for initial api creation
if (LocalStorage.get('bearer_token')) {
  api.defaults.headers.common['Authorization'] = `Bearer ${LocalStorage.get('bearer_token')}`;
}

export default function (options) {

  if (API_TEST) {
    if (options.returnPromise) {
      return Promise.resolve(mockApi(options));
    }

    return options.onSuccess(mockApi(options));
  }

  const onSuccess = function (response) {

    // Handle success
    if (response.status >= 200 && response.status < 300) {
      if (options.returnPromise === true) {
        return Promise.resolve(response.data);
      }

      if (typeof(options.onSuccess) === 'function') {
        return options.onSuccess(response.data);
      }
      console.error('You should pass an action to the `onSuccess` attribute');
      return dummyAction();
    }

    if (options.returnPromise) {
      return Promise.reject(response.data);
    }

    // Handle error
    if (response.status === 401) {
      // Logout on 401
      return dummyAction();
    }

    // Handle error
    if (response.status === 404) {
      return push('/404');
    }
    if (options.onError) {
      return options.onError(response);
    }

    // Unknown errors
    console.error(response);
    return dummyAction();
  };

  return api(options)
    .then(onSuccess);
}
