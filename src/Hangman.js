import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./words";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [ img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord()};
    this.handleGuess = this.handleGuess.bind(this);
    this.resetHandler = this.resetHandler.bind(this);

  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    let word = this.state.answer
    .split("")
    .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
    return word;
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        key={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** reset: reset game */

  resetHandler() {
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
  }

  /** render: render game */
  render() {
    let isWinner = this.guessedWord().join("") === this.state.answer;
    let isLoser = !isWinner && (this.state.nWrong >= this.props.maxWrong);
    let winnerInterface = <div className='Hangman-winner'>You won!</div>;
    let loserInterface = <div className='Hangman-looser'>You lose! The answer was: {this.state.answer.toUpperCase()}</div>;
    let gamePlay = <p className='Hangman-btns'>{this.generateButtons()}</p>
    
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <div className="Hangman-mainbox">
          <div className="Hangman-imagebox">
              <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} wrong answers out of ${this.props.maxWrong}`} />
          </div>
          <div className="Hangman-game">
              <p className='Hangman-word'>{this.guessedWord()}</p>
              {isWinner && winnerInterface}
              {isLoser && loserInterface}
              {(isWinner || isLoser) && <button className="Hangman-nextBtn" onClick={this.resetHandler}>Reset</button>}
              {(!isWinner && !isLoser) && gamePlay}
              <p className="Hangman-counter">Wrong guesses: {this.state.nWrong}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Hangman;
