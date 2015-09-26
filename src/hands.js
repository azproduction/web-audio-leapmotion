import Sound from './sound';
import {stopAnimation, startAnimation} from './terrain';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//
//let hands = {
//  left: [
//    new Sound('/samples/korg/glitch1.wav', audioContext),
//    new Sound('/samples/korg/glitch1.wav', audioContext),
//    new Sound('/samples/korg/glitch1.wav', audioContext),
//    new Sound('/samples/korg/glitch1.wav', audioContext),
//    new Sound('/samples/korg/glitch1.wav', audioContext)
//  ],
//
//  right: [
//    new Sound('/samples/korg/glitch2.wav', audioContext),
//    new Sound('/samples/korg/glitch2.wav', audioContext),
//    new Sound('/samples/korg/glitch2.wav', audioContext),
//    new Sound('/samples/korg/glitch2.wav', audioContext),
//    new Sound('/samples/korg/glitch2.wav', audioContext)
//  ]
//};

const sounds = [];
const SAMPLES = 36;

for (let i = 1; i <= SAMPLES; i++) {
  sounds[i] = new Sound(`/samples/korg/glitch${i}.wav`, audioContext);
}
//
//const leftHandSound = null;
//const rightHandSound = null;

let handSounds = {
  left: null,
  right: null
};

let handsPresence = {
  right: false,
  left: false
};

function handPresenceChange() {
  if (handsPresence.right || handsPresence.left) {
    startAnimation();
  } else {
    stopAnimation();
  }
}

Leap.loop({
    hand(hand) {
      let [x, volume, z] = hand.indexFinger.tipPosition;

      volume = volume / 450;
      if (volume < 0) {
        volume = 0;
      }
      if (volume > 1) {
        volume = 1;
      }

      x = (x + 300) / 600;
      if (x < 0) {
        x = 0;
      }
      if (x > 1) {
        x = 1;
      }

      z = (z + 250) / 500;
      if (z < 0) {
        z = 0;
      }
      if (z > 1) {
        z = 1;
      }

      let sampleIndex = Math.round(SAMPLES * x * z);
      let prevSample = handSounds[hand.type];
      let nextSample = sounds[sampleIndex];

      if (prevSample && prevSample !== nextSample) {
        prevSample.stopGradually(1000);
      }
      nextSample.play();
      nextSample.setVolume(volume);

      handSounds[hand.type] = nextSample;
    }
  })
  .use('riggedHand', {
    offset: new THREE.Vector3(0, -10, 0)
  })
  .use('handEntry')
  .on('handLost', (hand) => {
    handsPresence[hand.type] = false;
    handPresenceChange();
    let sound = handSounds[hand.type];
    if (sound) {
      sound.stop();
    }

  })
  .on('handFound', (hand) => {
    handsPresence[hand.type] = true;
    handPresenceChange();
  })
  /*.use('playback', {
    recording: './modules/left-or-right-77fps.json.lz',
    timeBetweenLoops: 1000
  })*/;
