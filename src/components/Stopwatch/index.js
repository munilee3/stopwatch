import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {isRunningTimer: false, timerInSeconds: 0}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onStartTimer = () => {
    this.intervalId = setInterval(this.updateTime, 1000)
    this.setState({
      isRunningTimer: true,
    })
  }

  updateTime = () => {
    this.setState(prevState => ({
      timerInSeconds: prevState.timerInSeconds + 1,
    }))
  }

  onStopTimer = () => {
    clearInterval(this.intervalId)
    this.setState({isRunningTimer: false})
  }

  onResetTimer = () => {
    clearInterval(this.intervalId)
    this.setState({timerInSeconds: 0, isRunningTimer: false})
  }

  getTimerFormat = () => {
    const {timerInSeconds} = this.state
    const seconds = Math.floor(timerInSeconds % 60)
    const minutes = Math.floor(timerInSeconds / 60)
    const stringifiedInSeconds = seconds > 9 ? seconds : `0${seconds}`
    const stringifiedInMinutes = minutes > 9 ? minutes : `0${minutes}`
    return `${stringifiedInMinutes}:${stringifiedInSeconds}`
  }

  isDisableBtn = () => {
    const {isRunningTimer} = this.state
    return isRunningTimer ? 'disable' : ''
  }

  render() {
    const {isRunningTimer} = this.state
    return (
      <div className="app-container">
        <div className="stopwatch-title-container">
          <h1 className="title">Stopwatch</h1>
          <div className="stopwatch-container">
            <div className="timer-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="timer-img"
              />
              <p className="timer-label">Timer</p>
            </div>
            <h1 className="stopwatch-timer">{this.getTimerFormat()}</h1>
            <div>
              <button
                type="button"
                className="stopwatch-btn start-btn"
                onClick={this.onStartTimer}
                disabled={isRunningTimer}
              >
                Start
              </button>
              <button
                type="button"
                className="stopwatch-btn stop-btn"
                onClick={this.onStopTimer}
              >
                Stop
              </button>
              <button
                type="button"
                className="stopwatch-btn reset-btn"
                onClick={this.onResetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
