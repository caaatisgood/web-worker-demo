this.onmessage = (evt) => {
  if (evt.data.work === 'doSlowThings') {
    let i = 0
    while (i < 1000000000) {
      i++
    }
    this.postMessage({ log: '[worker] complete doing slow things' })
  }
}

// importScripts('worker2.js')
