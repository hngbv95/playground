
onmessage = (e) => {
    const canvas = <OffscreenCanvas>e.data.canvas;

    const ctx = canvas.getContext('2d')!
    
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const { log } = console
    log('from worker', canvas)
}