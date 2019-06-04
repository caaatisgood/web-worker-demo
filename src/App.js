import React, { useState, useEffect } from 'react';

const setupWorker = () => {
  if (window.Worker) {
    const worker = new Worker('worker.js')
    worker.onmessage = (evt) => {
      console.log(evt.data.log)
    }
    return worker
  }
}

const worker = setupWorker()

const Counter = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const doSlowThings = () => {
    let i = 0
    while (i < 1000000000) {
      i++
    }
    console.log('[browser] complete doing slow things')
  }

  const doSlowThingsWithWorker = () => {
    worker.postMessage({ work: 'doSlowThings' })
  }

  // const doOtherThingsWithWorker2 = () => {
  //   worker.postMessage({ work: 'doOtherThings' })
  // }

  const terminateWorker = () => {
    worker.terminate()
  }

  return (
    <div>
      <button onClick={doSlowThings}>do slow things</button>&nbsp;
      <button onClick={doSlowThingsWithWorker}>do slow things with worker</button>&nbsp;
      {/* <button onClick={doOtherThingsWithWorker2}>do other things with worker 2</button>&nbsp; */}
      <button onClick={terminateWorker}><b>terminate worker</b></button>
      <h1>{count}</h1>
    </div>
  )
}

export default Counter;
