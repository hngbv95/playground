// 100 Int16 elements
const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 100);

// view
const sint = new Int32Array(sab);

const worker = new Worker(new URL('worker.ts', import.meta.url))

// share to worker
worker.postMessage(sint)

document.getElementById('submit')?.addEventListener('click', () => {
  const { value } = <HTMLInputElement>document.getElementById('input');
  console.log(Number(value))
  Atomics.store(sint, 0, Number(value))
  Atomics.notify(sint, 0)
})


