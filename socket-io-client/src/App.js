import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("TIME", data => this.setState({ response: data }));
  }
  
  getLocalTime() {
	const localDate = new Date();
	var hora = localDate.getDate() + " del mes " + localDate.getMonth()+1 + " de " + localDate.getFullYear() +
		" La hora es: " + localDate.getHours() + ":" + localDate.getMinutes() + ":" + localDate.getSeconds() + ":" + localDate.getMilliseconds();
	return hora;
  }
  
  render() {
    const { response } = this.state;
	
	const hora  = this.getLocalTime();
	
	
    return (
      <div style={{textAlign: "center", color: "red" }}>
	  
        {response
          ? <p>
              La fecha y hora del servidor es: {response} <br/>
			   
            </p>
			
          : <p>Loading... </p>}
		  
		  <p>La fecha y hora del cliente es: {hora} </p>
      </div>
	  
    );
  }
}


export default App;