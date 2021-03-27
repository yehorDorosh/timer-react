import React from 'react';
import ReactDOM from 'react-dom';
import ms from 'pretty-ms';
import UseDoubleClick from './doubleClick';
import './index.css';

function DoubleClickBtn(props) {
  const [refCallback] = UseDoubleClick(props.clickHandler);
  return (
    <button ref={refCallback}>
      {props.value}
    </button>
  );
}

class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0
    }
  }


  startTimer() {
    this.setState({
      isOn: true,
      start: Date.now() - this.state.time
    })

    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }


  stopTimer() {
    if (this.state.isOn) {
      this.setState({isOn: false});
      clearInterval(this.timer);
    }
  }


  resetTimer() {
    this.setState({time: 0, isOn: false});
    clearInterval(this.timer);
  }

  
  restartTimer() {
    this.resetTimer();
    setTimeout(() => this.startTimer(), 0);
  }



  render() {
    let start; 
    if (this.state.time === 0) {
      start = <button onClick={() => this.startTimer()}>Start/Stop</button>;
    } else if (this.state.time !== 0 && !this.state.isOn) {
      start = <button onClick={() => this.startTimer()}>Start/Stop</button>;
    } else {
      start = <button onClick={() => this.resetTimer()}>Start/Stop</button>;
    }

    let wait = <DoubleClickBtn value='Wait' clickHandler={() => this.stopTimer()}/>

    let reset = <button onClick={() => this.restartTimer()}>Reset</button>;


    return(
      <div>
        <h3>timer: {ms(this.state.time)}</h3>
        {start}
        {wait}
        {reset}
      </div>
    )
  }
}


ReactDOM.render(
  <Timer />,
  document.getElementById('root')
);
