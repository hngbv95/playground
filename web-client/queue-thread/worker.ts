onmessage = (e) => {
    const index = e.data;
    runProcess(index)
}

function runProcess(i) {
    const endTime = Date.now() + 2000; 
    // Freeze the process
    while (Date.now() < endTime) {}
    console.log('finish process: ', i)
}