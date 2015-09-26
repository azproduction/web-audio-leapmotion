const MIN_VOL = 0.0001;
const MAX_VOL = 0.1;

export default class Sound {

  constructor(url, audioContext) {
    this.audioContext = audioContext;
    this.oscillator = this.audioContext.createOscillator();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.samplePromise = this.fetch(url);
    this.gainNode.gain.value = MIN_VOL;
  }

  fetch(url) {
    return fetch(url).then((response) => {
      return response.arrayBuffer()
    }).then((arrayBuffer) => {
      return new Promise((resolve) => {
        this.audioContext.decodeAudioData(arrayBuffer, resolve);
      });
    })
  }

  play() {
    if (!this.isPlaying) {
      this.samplePromise.then((buffer) => {
        this.isPlaying = true;
        this.player = this.audioContext.createBufferSource();
        this.player.buffer = buffer;
        this.player.loop = true;
        this.player.connect(this.gainNode);
        this.player.start(0);
      });
    }
  }

  stop() {
    if (this.isPlaying) {
      this.player.stop(0);
      this.isPlaying = false;
    }
  }

  stopGradually(ms) {
    if (this.isPlaying) {
      this.player.stop(this.audioContext.currentTime + ms / 1000);
      this.gainNode.gain.linearRampToValueAtTime(
        0,
        this.audioContext.currentTime + ms / 1000
      );
      this.isPlaying = false;
    }
  }

  setVolume(volume) {
    //this.gainNode.gain.value = MIN_VOL + volume * (MAX_VOL - MIN_VOL);
    this.gainNode.gain.linearRampToValueAtTime(
      MIN_VOL + volume * (MAX_VOL - MIN_VOL),
      this.audioContext.currentTime + 0.1
    );
  }

}
