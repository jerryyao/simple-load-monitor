import React, { PropTypes } from 'react';
import classes from './notifications.css';

const Notification = (props) => (
  <div className={classes.notification} >
    <img />
    <span>{props.loadAvg}</span>
  </div>
);

Notification.propTypes = {
  loadAvg: PropTypes.number.isRequired,
  isAlert: PropTypes.bool.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default Notification;
