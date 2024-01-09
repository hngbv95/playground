import { random, times } from "lodash"

const hiButton = document.getElementById('submit')
const runProcessButton = document.getElementById('heavy')

// Sample to show
function setup() {
  hiButton?.addEventListener('click', () => {
    alert('Hello');
  })

  const worker = new Worker(new URL('worker.ts', import.meta.url))

  runProcessButton?.addEventListener('click', () => {
    times(10, (i) => {
      worker.postMessage(i)
    });
  })
}

setup()