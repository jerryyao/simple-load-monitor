import io from 'socket.io-client';
import { actions } from './reducer';

const initSocket = (dispatch) => {
  const socket = io.connect('http://localhost:3000/');

  socket.on('initialState', (data) => {
    // dispatch(actions.);
  });

  socket.on('monitor', (history) => {
    dispatch(actions.setField({ key: 'history', value: history }));
  });

  socket.on('notification', (notification) => {
    dispatch(actions.addNotification(notification));
  });

  // socket.emit('startIncreaseLoad');
};

export default initSocket;
