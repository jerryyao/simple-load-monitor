import createActions from 'src/lib/utils/create-actions';
import { createReducer } from 'redux-act';

export const initialState = {
  history: [],
  notifications: [
    {
      "loadAvg": 1.9803873697916667,
      "isAlert": false,
      "timestamp": 149032334498351
    },
    {
      "loadAvg": 1.9803873697916667,
      "isAlert": true,
      "timestamp": 149032343498351
    },
    {
      "loadAvg": 1.9803873697916667,
      "isAlert": false,
      "timestamp": 149032349834351
    },
  ],
};

export const actions = createActions('simpleLoadMonitor', [
  'setField', 'addNotification',
]);

export const reducer = createReducer({
  [actions.setField](state, { key, value }) {
    return { ...state, [key]: value };
  },

  [actions.addNotification](state, notification) {
    return { ...state, notifications: [notification, ...state.notifications] };
  },
}, initialState);
