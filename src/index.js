import React from 'react';
import ReactDOM from 'react-dom';
import ms from 'pretty-ms';
import UseDoubleClick from './doubleClick';
import './index.scss';

function DoubleClickBtn(props) {
  const [refCallback] = UseDoubleClick(props.clickHandler);
  return (
    <button className={props.className} ref={refCallback}>
      {props.value}
      <div className='subline'>double click</div>
    </button>
  );
}

class Stopwatch extends React.Component {
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
    const startBtnClasses = 'btn btn--green';

    if (this.state.time === 0) {
      start = <button className={startBtnClasses} onClick={() => this.startTimer()}>Start</button>;
    } else if (this.state.time !== 0 && !this.state.isOn) {
      start = <button className={startBtnClasses} onClick={() => this.startTimer()}>Start</button>;
    } else {
      start = <button className={startBtnClasses} onClick={() => this.resetTimer()}>Stop</button>;
    }

    const wait = <DoubleClickBtn clickHandler={() => this.stopTimer()} className='btn btn--yellow' value='Wait' />

    const reset = <button className='btn btn--white' onClick={() => this.restartTimer()}>Restart</button>;


    return(
      <div className='container'>
        <div className='stopwatch'>
          <h1 className='stopwatch__headline'>
            Stopwatch
          </h1>
          <div className='stopwatch__time'>
            {ms(this.state.time, {colonNotation: true})}
          </div>
          <div className='stopwatch__btns'>
            {start}
            {wait}
            {reset}
          </div>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <Stopwatch />,
  document.getElementById('root')
);
