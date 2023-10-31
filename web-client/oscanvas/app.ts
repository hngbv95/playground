const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas')
const cwidth = window.innerWidth
const cheight = window.innerHeight
canvas.width = cwidth
canvas.height = cheight

const offscreen = canvas.transferControlToOffscreen()


const canvasWorker = new Worker(new URL('worker.ts', import.meta.url), { type: 'module'})
canvasWorker.postMessage({ canvas: offscreen }, [offscreen]);

