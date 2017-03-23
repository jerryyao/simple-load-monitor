import createActions from 'src/lib/utils/create-actions';
import { createReducer } from 'redux-act';

export const initialState = {
  history: [],
  notifications: [],
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
