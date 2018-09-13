import React, { Component } from "react";
import "./Quiz.css";
import Question from "../Question/Question";
import GameResults from "../GameResults/GameResults";
import io from "socket.io-client";


const socketUrl = "http://localhost:3231";
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      counter: 0,
      usersArray: this.props.usersArray,
      socket: io(socketUrl), 
    };

    console.log(this.state.usersArray);
  }

   
  componentWillMount() {
    this.onSocket();
    this.next();
  }

  onSocket = () => {
    this.state.socket.on("user joined", data => {
      console.log(data);
      this.setState({ usersArray: data.users });
    });
  };

  
  next() {
    this.state.socket.on('next', (nextquestion) => {
      this.setState({counter: nextquestion });
    })
    console.log("startgame " + this.state.start);
  }

  render() {
    const quizz = this.props.questions;
  
    return (
      <div className="questions">
        <Question
          question={quizz[this.state.counter]}
          counter={this.state.counter}
        />
      </div>
    );
  }
}

export default Quiz;
