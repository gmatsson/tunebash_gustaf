import React, { Component } from "react";
import Answer from "../Answer/Answer";
import io from "socket.io-client";

const socketUrl = "http//localhost:3231";
class QuizAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      usersArray: [],
      gameEnded: false,
      socket: io(socketUrl)
    };
  }

  componentWillMount() {
    this.onSocket();
    this.next();
    this.createArraysInArray();
    console.log("hej");
  }

  onSocket = () => {
    this.state.socket.on("user joined", data => {
      console.log(data);
      this.setState({ usersArray: data.users });
    });
  };

  next() {
    this.state.socket.on("next", nextquestion => {
      this.setState({ counter: nextquestion });
    });
    console.log("startgame " + this.state.start);
  }

  endGame = () => {
    this.setState({ gameEnded: true });
  }

  createArraysInArray = () => {
    const table = [];
    const users = this.props.usersArray;
    for (var i = 0; i < users.length; i++) {
      table[i] = [users[i], 0];
      console.log(users[i]);
    }
    console.log(table);
    this.setState({usersArray: table});
    console.log(this.state.usersArray);
    console.log("tjena");
  }

  render() {
    const quizz = this.props.questions;
    console.log(quizz);
    console.log(this.props.questions);
    console.log(this.props.usersArray);
    console.log(this.state.usersArray);
    
    return (
      <div className="questions">
        <Answer
          question={quizz[this.state.counter]}
          usersArray={this.state.usersArray}
          name={this.props.name}
        />
      </div>
    );
  }
}

export default QuizAnswer;
