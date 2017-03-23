import React, { PropTypes } from 'react';
import Notification from './Notification';
import classes from './app.css';

class App extends React.Component {
  render() {
    const { notifications } = this.props.model;
    return (
      <div className={classes.app} >
        Text
        <div className={classes.notifications} >
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
