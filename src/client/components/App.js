import React, { PropTypes } from 'react';
import LineChart from 'src/lib/components/LineChart';
import Notification from './Notification';
import classes from './app.css';
import { actions } from '../reducer';

class App extends React.Component {
  state = {
    stressTestOn: false,
  }

  handleStressBtnClick = () => {
    if (!this.state.stressTestOn) {
      this.props.socket.emit('startIncreaseLoad');
    } else {
      this.props.socket.emit('stopIncreaseLoad');
    }
    this.setState({ stressTestOn: !this.state.stressTestOn });
  }

  render() {
    const { history, notifications, server: { numCores } } = this.props.model;
    return (
      <div>
        <header className={classes.header} >
          <h1>{'Simple Load Monitor'}</h1>
        </header>

        <div className={classes.appBody} >
          <section>
            <h2>{'CPU Load Average over the past 10 minutes'}</h2>
            <LineChart data={history} yDomain={[0, numCores]} />
            <button onClick={this.handleStressBtnClick} >
              {this.state.stressTestOn ? 'Stop Stress Test' : 'Start stress test'}
            </button>
          </section>

          <section>
            <h2>{'Events'}</h2>
            <div className={classes.notifications} >
              {notifications.map((notification) => (
                <Notification key={notification.timestamp} {...notification} />
              ))}
            </div>
          </section>
        </div>
      </div>);
  }
}

App.propTypes = {
  model: PropTypes.object.isRequired,
};

export default App;
