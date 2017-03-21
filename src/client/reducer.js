import createActions from 'src/lib/utils/create-actions';
import { createReducer } from 'redux-act';

export const initialState = {
  value: null,
};

export const Actions = createActions('simpleLoadMonitor', [
  'action',
]);

export const reducer = createReducer({
  [Actions.action](state, value) {
    return { ...state, value };
  },
}, initialState);
