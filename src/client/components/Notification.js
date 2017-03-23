import React, { PropTypes } from 'react';
import classes from './notification.css';

const Notification = (props) => (
  <div className={classes.notification} >
    <div className={classes.notificationBody} >
      <img className={classes.serviceImg} src="/img/monitor.png" alt="" />
      <span className={classes.title} >{'Title of event'}</span>
      <span>{props.loadAvg}</span>
    </div>
    <div className={classes.notificationFooter} />
  </div>
);

Notification.propTypes = {
  loadAvg: PropTypes.number.isRequired,
  isAlert: PropTypes.bool.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default Notification;
