import React from 'react';
import ReactDOM from 'react-dom';
import UseDoubleClick from './doubleClick';
import ms from './msToHMS';
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

function SwitchButton(props) {
  if (props.stateDisabled) {
    return <button className={props.classNameOn} onClick={props.switchOn}>{props.valueOn}</button>;
  } else if (props.statePaused) {
    return <button className={props.classNameOn} onClick={props.switchOn}>{props.valueOn}</button>;
  } else {
    return <button className={props.classNameOff} onClick={props.switchOff}>{props.valueOff}</button>;
  }
}

function TouchButton(props) {
  return (
    <button className={props.className} onClick={props.onClick}>{props.value}</button>
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
            <SwitchButton
              stateDisabled = {this.state.time === 0}
              statePaused = {this.state.time !== 0 && !this.state.isOn}
              classNameOn = 'btn btn--green'
              classNameOff = 'btn btn--red'
              switchOn = {() => this.startTimer()}
              switchOff = {() => this.resetTimer()}
              valueOn = 'Start'
              valueOff = 'Stop'
            />
             <DoubleClickBtn 
              clickHandler={() => this.stopTimer()} 
              className='btn btn--yellow' 
              value='Wait'
            />
            <TouchButton
              className='btn btn--white'
              onClick={() => this.restartTimer()}
              value='Restart'
            />
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
