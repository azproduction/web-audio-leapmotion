const MIN_FREQ = 3000;
const MAX_FREQ = 6000;
const MIN_VOL = 0.001;
const MAX_VOL = 0.02;

export default class Sound {

  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillator = this.audioContext.createOscillator();
    this.gainNode = this.audioContext.createGain();
    this.oscillator.connect(this.gainNode);

    this.oscillator.type = 'square';
    this.oscillator.frequency.value = MIN_FREQ; // value in hertz
    this.oscillator.detune.value = 100; // value in cents
    this.oscillator.start(0);
    this.oscillator.onended = function() {
      console.log('Your tone has now stopped playing!');
    }
    this.gainNode.gain.value = MIN_VOL;
  }

  play() {
    this.gainNode.connect(this.audioContext.destination);
  }

  stop() {
    this.gainNode.disconnect(this.audioContext.destination);
  }

  setVolume(volume) {
    this.gainNode.gain.value = MIN_VOL + volume * (MAX_VOL - MIN_VOL);
  }

  setFrequency(frequency) {
    this.oscillator.frequency.value = MIN_FREQ + frequency * (MAX_FREQ - MIN_FREQ);
  }

}
