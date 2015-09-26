import Sound from './sound';

let audioContext = new (window.AudioContext || window.webkitAudioContext)();

let hands = {
  left: [
    new Sound('/samples/korg/glitch1.wav', audioContext),
    new Sound('/samples/korg/glitch1.wav', audioContext),
    new Sound('/samples/korg/glitch1.wav', audioContext),
    new Sound('/samples/korg/glitch1.wav', audioContext),
    new Sound('/samples/korg/glitch1.wav', audioContext),
  ],

  right: [
    new Sound('/samples/korg/glitch2.wav', audioContext),
    new Sound('/samples/korg/glitch2.wav', audioContext),
    new Sound('/samples/korg/glitch2.wav', audioContext),
    new Sound('/samples/korg/glitch2.wav', audioContext),
    new Sound('/samples/korg/glitch2.wav', audioContext),
  ]
};

Leap.loop({
    hand(hand) {
      hand.fingers.forEach((finger) => {
        // -300/300, 0/450, -250/250
        let volume = finger.tipPosition[1];
        let sound = hands[hand.type][finger.type];

        volume = volume / 450;
        if (volume < 0) {
          volume = 0;
        }

        if (volume > 1) {
          volume = 1;
        }

        sound.setVolume(volume);
      });
    }
  })
  .use('riggedHand', {
    scale: 1.2
  })
  .use('handEntry')
  .on('handLost', (hand) => {
    //if (hand.type !== 'right') {
    //  return;
    //}
    //
    //sound.stop();
    hands[hand.type].forEach((sound) => {
      sound.stop();
    });
  })
  .on('handFound', (hand) => {
    //if (hand.type !== 'right') {
    //  return;
    //}
    //
    //sound.play();
    hands[hand.type].forEach((sound) => {
      sound.play();
    });
  })
  /*.use('playback', {
    recording: './modules/left-or-right-77fps.json.lz',
    timeBetweenLoops: 1000
  })*/;
