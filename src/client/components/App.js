import React, { PropTypes } from 'react';
import Notification from './Notification';

class App extends React.Component {
  render() {
    const { notifications } = this.props.model;
    return (
      <div>
        <div className={'notifications'} >
          {notifications.map((notification) => (
            <Notification key={notification.timestamp} {...notification} />
          ))}
        </div>
      </div>);
  }
}

App.propTypes = {
  model: PropTypes.object.isRequired,
};

export default App;
