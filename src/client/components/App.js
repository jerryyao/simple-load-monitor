import React, { PropTypes } from 'react';
import LineChart from 'src/lib/components/LineChart';
import Notification from './Notification';
import classes from './app.css';

class App extends React.Component {
  render() {
    const { history, notifications } = this.props.model;
    console.log(history)
    return (
      <div className={classes.app} >
        <LineChart data={history} >
        </LineChart>

        <h2>{'Events'}</h2>
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
