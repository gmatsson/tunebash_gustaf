import React, { Component } from "react";
import "./App.css";
import StartPage from "./StartPage/StartPage";
import MusicPlayer from "./MusicPlayer/MusicPlayer";

class App extends Component {


  render() {
    const audio = new Audio;
    return (
      <div className="App">
        <StartPage />    
      </div>
    );
  }
}

export default App;
