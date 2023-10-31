onmessage = (e) => {
    const workerName = e.data;
    const { log } = console
    log(`${workerName} log`)
}