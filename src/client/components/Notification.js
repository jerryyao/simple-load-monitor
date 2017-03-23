import React, { PropTypes } from 'react';

const Notification = (props) => (
  <div className={'test'} >
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
