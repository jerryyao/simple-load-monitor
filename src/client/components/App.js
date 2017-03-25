import React, { PropTypes } from 'react';
import LineChart from 'src/lib/components/LineChart';
import classesBtn from 'src/lib/styles/buttons.css';
import classes from './app.css';
import Notification from './Notification';
import { actions } from '../reducer';

class App extends React.Component {
  state = {
    stressTestCount: 0,
  }

  handleStressStart = () => {
    this.props.socket.emit('startIncreaseLoad');
    this.setState({ stressTestCount: this.state.stressTestCount + 1 });
  }

  handleStressStop = () => {
    this.props.socket.emit('stopIncreaseLoad');
    this.setState({ stressTestCount: 0 });
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
            <div className={classes.actionBtns} >
              <button className={classesBtn.btn} onClick={this.handleStressStart} >
                {!this.state.stressTestCount ? 'Start Stress Test' : 'Increase Load'}
              </button>
              <button className={classesBtn.btn} onClick={this.handleStressStop} >
                {'Stop Stress Test'}
              </button>
            </div>
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
