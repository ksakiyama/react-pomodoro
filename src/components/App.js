import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import RadioButton from "./RadioButton";
import "./../styles/App.css";

const TIMERS = {
  // Work: 3, // DEBUG: correctly 25 * 60
  Work: 25 * 60,
  Short: 5 * 60,
  Long: 15 * 60
};

class App extends React.Component {
  constructor() {
    super();
    const initialTimer = "Work";
    this.state = {
      remainingTime: TIMERS[initialTimer],
      maxTime: TIMERS[initialTimer],
      timerId: 0,
      selectedOption: initialTimer
    };

    this.countDown = this.countDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(buttonName) {
    this.setState(controllOperation(this.state, buttonName, this.countDown));
  }

  handleChange(radioButtonName) {
    this.setState(
      controllTimerType(this.state, radioButtonName, this.countDown)
    );
  }

  countDown() {
    const remainingTime = this.state.remainingTime;
    if (remainingTime > 0) {
      this.setState({ remainingTime: remainingTime - 1 });
    } else if (this.state.timerId !== 0) {
      clearInterval(this.state.timerId);
      // TODO, I need free license mp3
      //new Audio('resources/sound.mp3').play();

      this.notificate();

      this.setState({
        remainingTime: 0,
        timerId: 0
      });
    }
  }

  render() {
    return (
      <div>
        <header className="header">
          <h1>Simple Pomodoro Timer</h1>
        </header>
        <div className="main">
          <p>
            <RadioButton
              name="Work"
              changeHandler={this.handleChange}
              selectedOption={this.state.selectedOption}
            />
            <RadioButton
              name="Short"
              changeHandler={this.handleChange}
              selectedOption={this.state.selectedOption}
            />
            <RadioButton
              name="Long"
              changeHandler={this.handleChange}
              selectedOption={this.state.selectedOption}
            />
          </p>
          <h1>{convertIntToTime(this.state.remainingTime)}</h1>
          <p>
            <Button name="Start" clickHandler={this.handleClick} />
            <Button name="Stop" clickHandler={this.handleClick} />
            <Button name="Reset" clickHandler={this.handleClick} />
          </p>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.initNotification();
  }

  initNotification() {
    if ("Notification" in window) {
      const permission = Notification.permission;
      if (permission === "denied" || permission === "granted") {
        return;
      }
    }
    Notification.requestPermission();
  };

  notificate() {
    if (Notification.permission === "granted") {
      new Notification("Timer Finished!");
    }
  };
}

App.propTypes = {
  remainingTime: PropTypes.number,
  maxTime: PropTypes.number,
  timerId: PropTypes.number,
  selectedOption: PropTypes.string
};

const controllOperation = (obj, buttonName, countDowner) => {
  if (buttonName === "Start") {
    return {
      remainingTime: obj.remainingTime,
      timerId: obj.timerId ? obj.timerId : setInterval(countDowner, 1000)
    };
  } else if (buttonName === "Stop" || buttonName === "Reset") {
    clearInterval(obj.timerId);
    return {
      remainingTime: buttonName === "Stop" ? obj.remainingTime : obj.maxTime,
      timerId: 0
    };
  }

  return obj;
};

const controllTimerType = (obj, buttonName, countDowner) => {
  if (TIMERS[buttonName]) {
    if (obj.timerId !== 0) {
      clearInterval(obj.timerId);
    }
    return {
      remainingTime: TIMERS[buttonName],
      maxTime: TIMERS[buttonName],
      timerId: setInterval(countDowner, 1000),
      selectedOption: buttonName
    };
  }

  return obj;
};

const convertIntToTime = num => {
  const m = Math.floor(num / 60);
  const s = num % 60;
  return ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2);
};

export default App;
