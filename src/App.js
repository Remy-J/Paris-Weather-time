import React, { Component } from 'react';
import './App.css';
import Navbar from './commponents/Navbar'

// API meteo 
const API_KEY="b9657f55f833d7cff18e3c5da9645015";


class App extends Component {
 getweather = async () =>{
const api_call = await fetch("https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b9657f55f833d7cff18e3c5da9645015")
 const data =await api_call.json();
 console.log(data);
 

}

  render() {

    return (
      <div className="App">
       
       <Navbar />
      </div>
    );
  }
}

export default App;
