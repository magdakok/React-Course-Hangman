import React, { Component } from "react";
import "./Hangman.css";
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
    images: [[img0,"0 wrong guesses"], [img1,"1 wrong guess"],[img2,"2 wrong guesses"], [img3,"3 wrong guesses"], [img4,"4 wrong guesses"], [img5,"5 wrong guesses"], [img6,"6 wrong guesses"]]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: "apple" };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
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

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img 
          src={this.props.images[this.state.nWrong][0]} 
          alt={`${this.props.images[this.state.nWrong][1]} out of ${this.props.maxWrong}`} 
        />
        <p className="Hangman-counter">Wrong guesses: {this.state.nWrong}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        
        {this.state.nWrong < this.props.maxWrong && <p className='Hangman-btns'>{this.generateButtons()}</p>}
        {this.state.nWrong == this.props.maxWrong && <p className='Looser'>You loose!</p>}
        
      </div>
    );
  }
}

export default Hangman;
