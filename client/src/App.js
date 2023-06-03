import logo from './logo.svg';
import './App.css';
import React from 'react' 
import '../node_modules/font-awesome/css/font-awesome.min.css';


let time = [];
for (let i = 59; i >= 1; i--) {
  if(i < 10) {
    time.push("0" + i.toString())
  } else {
    time.push(i.toString());
  }
}
time.unshift("00")

let min = [];
for (let i = 60; i >= 0; i--) {
  if(i < 10) {
    min.push("0" + i.toString())
  } else {
    min.push(i.toString());
  }
}

let str = (x) => x ? "Break" : "Session"
var interval;
const beep = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
)

var oper = false;

export class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      breakVal: 5,
      sessionVal: 25,
      swap: false,
      state: str(false),
      timeLeft: min.indexOf("25"),
      sec: 0
    } 
    this.manageClock = this.manageClock.bind(this);
    this.restart = this.restart.bind(this);
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }
  
  manageClock() {
    oper = !oper;
    if(oper) {
      interval = setInterval(() => {
    if(this.state.timeLeft ==
       min.length-1 && this.state.sec==
       time.length-1 && this.state.state == "Session") {
        this.setState((state) => ({
          breakVal: state.breakVal,
          sessionVal: state.sessionVal,
          swap: state.swap,
          state: "Break",
          timeLeft: (min.length - 1) - state.breakVal,
          sec: 0
        }))
             beep.play()
      }
        
      else if(this.state.timeLeft ==
       min.length-1 && this.state.sec==
       time.length-1 && this.state.state == "Break") {
        this.setState((state) => ({
          breakVal: state.breakVal,
          sessionVal: state.sessionVal,
          swap: state.swap,
          state: "Session",
          timeLeft: (min.length - 1) - state.sessionVal,
          sec: 0
        }))
             beep.play()
      }
      
     else if(this.state.sec == 0) {
        this.setState((state) => ({
          breakVal: state.breakVal,
          sessionVal: state.sessionVal,
          swap: state.swap,
          state: state.state,
          timeLeft: state.timeLeft + 1,
          sec: 1
        }))
        console.log(this.state.sec)
      }
      
      else if(this.state.sec > 0 && this.state.sec <= time.length - 1) {
        this.setState((state) => ({
          breakVal: state.breakVal,
          sessionVal: state.sessionVal,
          swap: state.swap,
          state: state.state,
          timeLeft: state.timeLeft,
          sec: state.sec + 1
        }))
      }
      
      else if(this.state.sec > time.length - 1) {
        this.setState((state) => ({
          breakVal: state.breakVal,
          sessionVal: state.sessionVal,
          swap: state.swap,
          state: state.state,
          timeLeft: state.timeLeft,
          sec: 0
        }))
      }
}, 1000);
    } else {
      clearInterval(interval);
      }
    return;
  }
  
  restart() {
    beep.pause();
    beep.load();
    oper = false;
    clearInterval(interval);
    this.setState({
      breakVal: 5,
      sessionVal: 25,
      swap: false,
      state: str(false),
      timeLeft: min.indexOf("25"),
      sec: 0
    })
  }
  
  increment(x) {
    if(oper) {
      return;
    }
    switch(x) {
      case "ib":
        this.setState((state) => {
          if(state.breakVal < 60) {
            return ({
          breakVal:state.breakVal+1,
          sessionVal:state.sessionVal,
          timeLeft:state.timeLeft,
          swap:state.swap,
          state:state.state,
          sec:state.sec
            })
          }
        })
        break;
      case "is":
        this.setState((state) => {
          if(state.sessionVal < 60) {
            return ({
          breakVal:state.breakVal,
          sessionVal:state.sessionVal+1,
          timeLeft:state.timeLeft - 1,
          swap:state.swap,
          state:state.state,
          sec:state.sec
            })
          }
        })
        break;
      default:
        return;
    }
  }
  
  decrement(x) {
    if(oper) {
      return;
    }
    switch(x) {
      case "db":
        this.setState((state) => {
          if(state.breakVal > 1) {
            return ({
          breakVal:state.breakVal-1,
          sessionVal:state.sessionVal,
          timeLeft:state.timeLeft,
          swap:state.swap,
          state:state.state,
          sec:state.sec
            })
          }
        })
        break;
      case "ds":
        this.setState((state) => {
          if(state.sessionVal > 1) {
            return ({
          breakVal:state.breakVal,
          sessionVal:state.sessionVal-1,
          timeLeft:state.timeLeft + 1,
          swap:state.swap,
          state:state.state,
          sec:state.sec
            })
          }
        })
        break;
      default:
        return;
    }
  }
  
  
  render() {
    return (
      <div id="frame">
        <h1>25 + 5 Clock</h1>
        
        <div id = "row">
          <div className='column'>
            
            <p id="break-label"><strong>Break Length</strong></p>
            <span>
              <button id="break-decrement" className="btn" onClick={() => this.decrement("db")}><i className="fa fa-arrow-down"></i></button>
             
              <span id="break-length">{this.state.breakVal}</span>
              
              
              <button id="break-increment" className="btn" onClick={() => this.increment("ib")}><i className="fa fa-arrow-up "></i></button>
            </span>
          </div>
          <div className='column'>
            
            <p id="session-label"><strong>Session Length</strong></p>
            <span>
              <button id="session-decrement" className="btn" onClick={() => this.decrement("ds")}><i className="fa fa-arrow-down"></i></button>
             
              <span id="session-length">{this.state.sessionVal}</span>
              
              
              <button id="session-increment" className="btn" onClick={() => this.increment("is")}><i className="fa fa-arrow-up "></i></button>
            </span>
          </div>
        </div>
        <div id="timer">
          <h4 id="timer-label">{this.state.state}</h4>
          <p id="time-left">{min[this.state.timeLeft]}:{time[this.state.sec]}</p>
          <span>
            <button onClick={this.manageClock} id="start_stop" className="btn"><i className="fa fa-play-circle-o"></i></button>
            <button id="reset" onClick={this.restart} className="btn"><i className="fa fa-refresh"></i></button>
          </span>
        </div>
        </div>
    )
  }
}



export default App;
