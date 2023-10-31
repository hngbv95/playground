onmessage = (e) => {
    const data = e.data;
    const { log } = console
    log('from worker:', data)
    Atomics.wait(data, 0, 0)
    log('from worker:', data)
}