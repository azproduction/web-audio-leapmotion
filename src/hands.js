Leap.loop({
    hand(hand) {
      // TODO
    }
  })
  .use('riggedHand')
  .use('handEntry')
  .on('handLost', (hand) => {
    // TODO
  })
  .use('playback', {
    recording: './modules/left-or-right-77fps.json.lz',
    timeBetweenLoops: 1000
  });