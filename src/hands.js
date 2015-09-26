import Sound from './sound';
import {stopAnimation, startAnimation} from './terrain';

let audioContext = new (window.AudioContext || window.webkitAudioContext)();

let hands = {
  left: [
    new Sound(audioContext),
    new Sound(audioContext),
    new Sound(audioContext),
    new Sound(audioContext),
    new Sound(audioContext)
  ],

  right: [
    new Sound(audioContext),
    new Sound(audioContext),
    new Sound(audioContext),
    new Sound(audioContext),
    new Sound(audioContext)
  ]
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
      hand.fingers.forEach((finger) => {
        // -300/300, 0/450, -250/250
        let [volume, freq] = finger.tipPosition;
        let sound = hands[hand.type][finger.type];

        volume = (volume + 300) / 600;
        if (volume < 0) {
          volume = 0;
        }

        if (volume > 1) {
          volume = 1;
        }

        freq = freq / 450;
        if (freq < 0) {
          freq = 0;
        }

        if (freq > 1) {
          freq = 1;
        }

        sound.setVolume(volume);
        sound.setFrequency(freq);
      });
    }
  })
  .use('riggedHand', {
    scale: 1.2
  })
  .use('handEntry')
  .on('handLost', (hand) => {
    //hands[hand.type].forEach((sound) => {
    //  sound.stop();
    //});
    handsPresence[hand.type] = false;
    handPresenceChange();
  })
  .on('handFound', (hand) => {
    //hands[hand.type].forEach((sound) => {
    //  sound.play();
    //});
    handsPresence[hand.type] = true;
    handPresenceChange();
  })
  /*.use('playback', {
    recording: './modules/left-or-right-77fps.json.lz',
    timeBetweenLoops: 1000
  })*/;