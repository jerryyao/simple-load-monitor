import io from 'socket.io-client';
import { actions } from './reducer';

const initSocket = (dispatch) => {
  const socket = io.connect('http://localhost:3000/');

  socket.on('initialState', (data) => {
    dispatch(actions.setField({ key: 'serverInfo', value: data.serverInfo }));
  });

  socket.on('monitor', (history) => {
    dispatch(actions.setHistory(history));
  });

  socket.on('notification', (notification) => {
    dispatch(actions.addNotification(notification));
  });

  return socket;
};

export default initSocket;
