import { random, times, uniqueId } from "lodash"

// Proof of Concept: Spawning Worker Thread to do heavy task

// https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
// It seems the performance is not very good because Worker.postMessage use structuredClone Method to clone the parameters

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects
// CONCLUSION: HAVE TO USE TRANFERABLE OBJECT TO ACHIEVE THE BEST RESULT!

const NormalSort = document.getElementById('sort')
const WorkerSort = document.getElementById('worker-sort')
const Hello = document.getElementById('another')
const sortWorker = new Worker(new URL('worker.ts', import.meta.url))

const mapPromise: Map<string, (value: unknown) => void> = new Map()

async function sort(useWorker = false) {
  // Take around 0.3 seconds to generate
  const list = times(1000 * 1000 * 10, () => random(0, 1000 * 1000 * 1000));
  if (useWorker) {
    return new Promise((rs) => {
      
        const id = uniqueId()
        mapPromise.set(id, rs)
        sortWorker.postMessage({id, list})
    })
  }

  // because postMessage clone the list before pass it to the Worker.
  // For Equality, I'm gonna clone the list before return
  // Take around 2.5 seconds to structuredClone after sort
  return Promise.resolve(structuredClone(list).sort())
}

sortWorker.addEventListener('message', ({data}) => {
  mapPromise.get(data.id)?.(data.list)
  mapPromise.delete(data.id)
})


NormalSort?.addEventListener('click', () => {
  sort().then(() => {console.log('normal sorted')})
  console.log('normal start')
})

WorkerSort?.addEventListener('click', () => {
  sort(true).then(() => {console.log('worker sorted')})
  console.log('worker start')
})

Hello?.addEventListener('click', () => {
  alert("Hello")
})

