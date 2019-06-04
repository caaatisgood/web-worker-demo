this.onmessage = (evt) => {
  if (evt.data.work === 'doOtherThings') {
    this.postMessage({ log: '[worker2] complete doing other things' })
  }
}