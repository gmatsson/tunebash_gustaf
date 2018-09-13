import React, { Component } from "react";
import "./GameLeaderPage.css";
import NewGame from "../NewGame/NewGame.js";
import Quiz from "../Quiz/Quiz";
import axios from "axios";
import io from "socket.io-client";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import AnswersInText from "../AnswersInText/AnswersInText";
import GameResults from "../GameResults/GameResults";

const socketUrl = "https//secure-shelf-15160.herokuapp.com/:3231";
class GameLeaderPage extends Component {
  constructor(props) {
    super(props);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.state = {
      start: false,
      questions: [],
      usersArray: [],
      newUsersArray: [],
      socket: io(socketUrl),
      counter: 0,
      gameEnded: false
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.showResult = this.showResult.bind(this);
    const lengthOfSong = this.props.lengthOfSong;

    axios

      .get(
        "http://localhost:8080/getquestions/" +
        this.props.numberOfQuestions +
        "/" +
        this.props.level +
        "/" +
        this.props.category +
        "/" +
        this.props.language
      )

      .then(response => {
        const newQuiz = response.data;

        // create a new "State" object without mutating
        // the original State object.
        const newState = Object.assign({}, this.state, { questions: newQuiz });

        this.state.initialQuestions = newState.questions;
        // store the new state object in the component's state
        this.setState(newState);
        console.log(newQuiz);
        console.log(this.state.questions);
      })
      .catch(error => console.log('error'));
  }

  componentWillMount() {
    this.onSocket();
    this.final();
  }

  onSocket = () => {
    this.state.socket.on("user joined", data => {
      console.log(data);
      this.setState({ usersArray: data.users });
    });
  };

  handleClickStart = () => {
    this.setState({ start: true });
    const newUsersArray = [];
    console.log(this.state.usersArray);
    for (let user of this.state.usersArray) {
      newUsersArray.push([user, 0]);
    }
    console.log(newUsersArray);
    this.setState({ usersArray: newUsersArray });
    console.log(this.state.usersArray);
    console.log(this.state.counter);
    console.log(this.state.questions[this.state.counter]);
    this.state.socket.emit(
      "startgame",
      true,
      this.state.questions,
      this.state.usersArray
    );
  };

  nextQuestion() {
    this.setState({ counter: this.state.counter + 1 });
    this.state.socket.emit("next", this.state.counter + 1);
  }

  endGame = () => {
    this.setState({ gameEnded: true });
  };

  showResult() {
    this.state.socket.emit("endGame", true);
  }

  
  
    final() {
    this.state.socket.on("final", data => {
      console.log(data);
      this.setState({ newUsersArray: data });
      this.setState({ gameEnded: true });
      console.log(data);
      console.log(this.state.usersArray);
    });
  }

  render() {
    const quizz = this.state.questions;
    const start = this.state.start;
    const gameId = this.props.gameId;
    const gameEnded = this.state.gameEnded;
    console.log(this.props.level);
    console.log(this.props.category);
    console.log(this.state.questions);
    console.log(quizz[0]);
    console.log(this.state.counter);
    console.log(this.state.usersArray);

    if (start && this.state.counter >= quizz.length) {
      return <GameResults usersArray={this.state.newUsersArray} />;
    }


    if(gameEnded) {
      return <GameResults usersArray={this.state.newUsersArray}/>

    }

    if (start) {
      return (
        <div>
           <p className="counter">
            Fråga {this.state.counter + 1} av {quizz.length}
          </p>
        
          <Quiz questions={this.state.questions} />
          <AnswersInText question={quizz[this.state.counter]} />
          <div className="next">
          <button className="next_quit_button" onClick={this.showResult}>Avsluta spel</button>
            <button className="next_quit_button" onClick={this.nextQuestion}>Nästa fråga</button>
            
          </div>
          <MusicPlayer question={quizz[this.state.counter]} />
        </div>
      );
    }

    return (
      <div>
        <div>
          <p className="headline">Spelomgångens pinkod:</p>
        </div>
        <div>
          <p className="random">{gameId}</p>
        </div>
        <div class="buttonStartGame">
          <button id="startGameButton" onClick={this.handleClickStart}>
            Starta spel
          </button>
        </div>
        <div>
          <p className="instructions">
            När alla som ska spela har slagit in pinkoden på sin enhet, klickar
            du på Starta spel.
          </p>
        </div>
        <div className="names">{this.state.usersArray}</div>
      </div>
    );
  }
}

export default GameLeaderPage;
