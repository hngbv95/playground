onmessage = (e) => {
    const data = e.data;
    postMessage({
        id: data.id,
        list: data.list.sort()
    })
}