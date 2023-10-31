let privateNumber = 123

function setNumber() {
    privateNumber = 0
    console.log(privateNumber)
}

setNumber()

export function getNumber() {
    return privateNumber
}

export function add(number) {
    privateNumber = privateNumber + number
    return  privateNumber
}