import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {
  componentWillMount() {
    const log = data => console.log(data)
    const socket = io.connect('http://localhost:3000/');
    socket.on('initialState', data => {console.log(data)});
    socket.on('monitor', (e, data) => log(e, data));
    socket.on('notification', (data) => log(data));
    // socket.emit('startIncreaseLoad');
  }

  render() {
    return <div>Test!</div>;
  }
}

export default App;
