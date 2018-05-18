import React, { Component } from 'react';
import '../styles/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.playWavKeyPress = this.playWavKeyPress.bind(this);
  }

  playWavClick(datakey) {
    const audio = document.querySelector(`audio[data-key="${datakey}"]`);
    const button = document.querySelector(`button[data-key="${datakey}"]`);
    this.playAudio(audio, button);
  }

  playWavKeyPress(keypress) {
    const audio = document.querySelector(`audio[data-key="${keypress.key.toUpperCase().charCodeAt(0)}"]`);
    const button = document.querySelector(`button[data-key="${keypress.key.toUpperCase().charCodeAt(0)}"]`);
    this.playAudio(audio, button);
  }

  playAudio(audio, button) {
    if (audio && button) {
      button.classList.add('highlightkey');
      audio.play();
      setTimeout(() => {
        button.classList.remove('highlightkey');
      }, 500);
    }
  }
  audioFiles() {
    return [
      'clap-808',
      'clap-analog',
      'hihat-808',
      'clap-crushed',
      'clap-fat',
      'cowbell-808',
      'crash-808',
      'crash-acoustic',
      'crash-noise',
      'crash-tape',
      'hihat-analog',
      'perc-short',
      'perc-tambo',
      'openhat-slick',
      'perc-tambo',
      'snare-electro',
      'snare-lofi02',
      'tom-short',
      'tom-chiptune',
      'tom-acoustic01',
      'snare-tape',
      'snare-smasher',
      'snare-sumo',
      'snare-pinch',
      'snare-noise',
      'snare-punch',
      'snare-vinyl02',
      'snare-pinch',
    ];
  }

  createDivs() {
    let arrayDivs = [];
    let audiofiles = this.audioFiles();
    for (let index = 65; index <= 85; index++) {
      arrayDivs.push(
        <div key={index} className="soundboard">
          <button onClick={() => this.playWavClick(index)} data-key={index}>
            {String.fromCharCode(index)}
          </button>
          <audio
            id={`audio_${index}`}
            src={`https://s3.amazonaws.com/soundsfileslewis/${audiofiles[index - 65]}.wav`}
            type="audio/wav"
            data-key={index}
          />
        </div>,
      );
    }
    return arrayDivs;
  }

  render() {
    return <div className="container">{this.createDivs()}</div>;
  }
  componentDidMount() {
    window.addEventListener('keydown', this.playWavKeyPress);
  }
}

export default App;
