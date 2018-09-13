import React, {Component} from 'react';
import './CustomGame.css';
import axios from 'axios';
import YourCustomGame from '../YourCustomGame/YourCustomGame';
import HomeButton from "../HomeButton/HomeButton";

class CustomGame extends Component {
    state = {
        songLink: '',
        question: '',
        correctAnswer: '',
        wrongAnswer1: '',
        wrongAnswer2: '',
        wrongAnswer3: ''
    }

    constructor(props) {
        super(props);

        // this.onClickGenerate = this.onClickGenerate.bind(this);
        this.addToQuiz = this.addToQuiz.bind(this);
        this.state = {
            yourCustomGame: false,
            quizArray: [],
            pin: Math.floor(Math.random() * 999999) + 100000
        };

    }

    addToQuiz = (e) => {
        e.preventDefault();

        const customGame = {
            pin: this.state.pin,
            songLink: this.state.songLink.replace(/.com/g, '.com/embed'),
            question: this.state.question,
            correctAnswer: this.state.correctAnswer,
            wrongAnswer1: this.state.wrongAnswer1,
            wrongAnswer2: this.state.wrongAnswer2,
            wrongAnswer3: this.state.wrongAnswer3
        }

        this.state.quizArray.push(customGame);

        console.log(this.state.quizArray);

        this.setState({
            songLink: '',
            question: '',
            correctAnswer: '',
            wrongAnswer1: '',
            wrongAnswer2: '',
            wrongAnswer3: ''
        })

    }

    onClickGenerate = () => {

        axios.post('http://localhost:8080/addcustomquestion', this.state.quizArray)
        console.log(this.state.quizArray);

        this.setState({yourCustomGame: true});
    }


    render() {
        const yourCustomGame = this.state.yourCustomGame;
        console.log(this.state.songLink);


        if (yourCustomGame) {
            return (
                <div>
                    <YourCustomGame/>
                </div>
            )
        }

        return (
            <div>
                <div>
                    <p className="headlineCustomGame">
                        Skapa ett quiz med dina egna frågor
                    </p>
                </div>

                <div className="form">
                    <div className="select">
                        <form onSubmit={this.addToQuiz}>

                            <p><input className="customRow" value={this.state.songLink}
                                      onChange={(event) => this.setState({songLink: event.target.value})} required
                                      type="text" placeholder="Låtlänk från Spotify"/></p>
                            <p><input className="customRow" value={this.state.question}
                                      onChange={(event) => this.setState({question: event.target.value})} required
                                      type="text" placeholder="Fråga"/></p>
                            <p><input className="customRow" value={this.state.correctAnswer}
                                      onChange={(event) => this.setState({correctAnswer: event.target.value})} required
                                      type="text" placeholder="Rätt svar"/></p>
                            <p><input className="customRow" value={this.state.wrongAnswer1}
                                      onChange={(event) => this.setState({wrongAnswer1: event.target.value})} required
                                      type="text" placeholder="Fel svar 1"/></p>
                            <p><input className="customRow" value={this.state.wrongAnswer2}
                                      onChange={(event) => this.setState({wrongAnswer2: event.target.value})} required
                                      type="text" placeholder="Fel svar 2"/></p>
                            <p><input className="customRow" value={this.state.wrongAnswer3}
                                      onChange={(event) => this.setState({wrongAnswer3: event.target.value})} required
                                      type="text" placeholder="Fel svar 3"/></p>

                            <div>
                                <input type="submit" value="Lägg till fråga" id="addCustomQuestion"/>
                                <button id="createPinCodeCustom" onClick={this.onClickGenerate}>Skapa quiz</button>
                            </div>
                        </form>

                        <div>
                            <p className="questionsInQuiz">Antal frågor i quiz: {this.state.quizArray.length}</p>
                        </div>
                    </div>
                </div>

                <HomeButton/>

            </div>
        );


    }
}


export default CustomGame; 