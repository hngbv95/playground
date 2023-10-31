import { random, times } from "lodash"

const hiButton = document.getElementById('submit')
const runProcessButton = document.getElementById('heavy')

// Sample to show
function setup() {
  hiButton?.addEventListener('click', () => {
    alert('Hello');
  })

  runProcessButton?.addEventListener('click', () => {
    const nums = times(1000 * 1000, () => random(1000 * 1000 * 1000 * 1000))

  
    queueMicrotask(() => {
      console.time('sort')
      nums.sort();
      console.timeEnd('sort')
    })  
  })
}

setup()