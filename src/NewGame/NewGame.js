import React, { Component } from "react";
import "./NewGame.css";
import GameLeaderPage from "../GameLeaderPage/GameLeaderPage";
import CustomGame from "../CustomGame/CustomGame";
import axios from 'axios';
import HomeButton from "../HomeButton/HomeButton";


class newGame extends Component {
  state = {
    level: '',
    category: '',
    numberOfQuestions: 0,
    lengthOfSong: 0,
    language: '',
  }

  constructor(props) {
    super(props);
    this.submitDataHandler = this.submitDataHandler.bind(this);
    this.handleClickGenerateCustomGame = this.handleClickGenerateCustomGame.bind(this);
    this.state = {
      generate: false,
      custom: false,
      gameId: 0
    };
  }

  submitDataHandler = () => {
    const random = Math.floor(Math.random() * (999999 - 100000) + 100000);
    this.setState({ gameId: random });

    this.setState({ generate: true });
    console.log(this.state.level);
  }

  handleClickGenerateCustomGame = () => {
    this.setState({ custom: true });
  };

  render() {
    const generate = this.state.generate;
    const custom = this.state.custom;

    if (generate) {
      return (
        <div className="App">
          <GameLeaderPage onClickStart={this.handleClickStart} gameId={this.state.gameId}
            level={this.state.level} category={this.state.category}
            numberOfQuestions={this.state.numberOfQuestions}
            lengthOfSong={this.state.lengthOfSong}
            language={this.state.language}
          />
        </div>
      );
      console.log(this.level);
    }

    if (custom) {
      return (
        <div>
          <CustomGame onClickGenerate={this.handleClickGenerate} />
        </div>
      );
    }

    return (
      <div className="wrapper">
        <div>
          <p className="headlineNewGame">Välj kriterier för spelet</p>
        </div>

        <div className="form">
          <form className="select" onSubmit={this.submitDataHandler}>
            <p>
              <select value={this.state.level} onChange={(event) => this.setState({ level: event.target.value })}>
                <option value="" disabled selected>Svårighetsnivå</option>
                <option value="mix">Blanda nivåer</option>
                <option value="easy">Lätt</option>
                <option value="medium">Medel</option>
                <option value="hard">Svår</option>
              </select>
            </p>
            <p>
              <select value={this.state.category} onChange={(event) => this.setState({ category: event.target.value })}>
                <option value="" disabled selected>Genre</option>
                <option value="mix">Blanda genrer</option>
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Country">Country</option>
              </select>
            </p>

            <p>
              <select required value={this.state.numberOfQuestions} onChange={(event) => this.setState({ numberOfQuestions: event.target.value })}>
                <option value="" disabled selected>Antal frågor</option>
                <option value="5">5 frågor</option>
                <option value="10">10 frågor</option>
                <option value="15">15 frågor</option>
              </select>
            </p>

            <p>
              <select value={this.state.language} onChange={(event) => this.setState({ language: event.target.value })}>
                <option value="" disabled selected>Språk</option>
                <option value="mix">Blanda alla språk</option>
                <option value="Svenska">Endast svenska</option>
                <option value="Engelska">Endast engelska</option>
              </select>
            </p>

            <div className="createNewPinCode">
              <input type="submit" className="createPinCodeNewGame" value="Skapa pinkod" />
            </div>

          </form>
        </div>
        <div className="generateCustomGameDiv">
        
          <button id="generateCustomGame" onClick={this.handleClickGenerateCustomGame}>
            Eller skapa en omgång med dina egna frågor ➔
      </button>

      <button id="openCustomGame" onClick={this.handleOpenCutsomGame}>
            Har du redan gjort ett eget quiz? Starta spelomgången här!
      </button>
      
        </div>

        <HomeButton />
      </div>
    );

  }
}


export default newGame;
