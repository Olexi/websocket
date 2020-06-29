import React from 'react';
import logo from './logo.svg';
import './App.css';
import { w3cwebsocket } from 'websocket';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        ws: null,
        messageLog: ''
    };
  }

  componentDidMount() {
    this.connect();
  }

  timeout = 250;

  connect = () => {
    const ws = new w3cwebsocket('ws://172.28.2.130:3001', 'echo-protocol');
    let that = this; // cache the this
    let connectInterval;

    ws.onopen = () => {
      console.log("connected websocket main component");

      this.setState({ ws: ws });

      that.timeout = 250; // reset timer to 250 on open of websocket connection 
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    ws.onmessage = evt => {
      // listen to data sent from the websocket server
      console.log('start onMessage')
      const message = evt.data
      this.setState({messageLog: this.state.messageLog + message})
      console.log(message)
    }

    // websocket onclose event listener
    ws.onclose = e => {
        console.log(
            `Socket is closed. Reconnect will be attempted in ${Math.min(
                10000 / 1000,
                (that.timeout + that.timeout) / 1000
            )} second.`,
            e.reason
        );

        that.timeout = that.timeout + that.timeout; //increment retry interval
        connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = err => {
        console.error(
            "Socket encountered error: ",
            err.message,
            "Closing socket"
        );

        ws.close();
    };
  }

  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
  };

  sendMessage = () => {
    try {
        const userName = document.getElementById('username').value;
        const message = document.getElementById('text').value;
        document.getElementById('text').value = '';
        console.log(message)
        this.state.ws.send(`${userName}: ${message}\r\n`) //send data to the server
    } catch (error) {
        console.log(error) // catch error
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className='input'>
            Username: <input id='username'></input>
          </div>
          <div className='input'>
            Message: <input id='text'></input>
          </div>
          <div className='input'>
            <button style={{height: '30px', width: '60px', backgroundColor: 'red', color: 'white'}} onClick={() => this.sendMessage()}>Send</button>
          </div>
          <textarea style={{height:'400px', width:'600px'}} id='textarea' value={this.state.messageLog}>

          </textarea>
        </header>
      </div>
    );
  }
}

export default App;
