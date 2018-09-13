import React, { Component } from "react";
import './AnswersInText.css';
class AnswersInText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffle: true
    };
  }

  shuffleAnswers = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.setState({ shuffle: false });
    return array;
  };

  render() {
    const question = this.props.question;

    const answers = [
      question.correctAnswer,
      question.wrongAnswer1,
      question.wrongAnswer2,
      question.wrongAnswer3
    ];

    if (this.state.shuffle) {
      this.shuffleAnswers(answers);
    }
    return (
      <div className="AnswersDiv">
        <p className="answerOption">{answers[0]}</p>
        <p className="answerOption">{answers[1]}</p>
        <p className="answerOption">{answers[2]}</p>
        <p className="answerOption">{answers[3]}</p>
      </div>
    );
  }
}

export default AnswersInText;
