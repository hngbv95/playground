import { delay } from "lodash"

const serverToken = <HTMLInputElement> document.getElementById('token')
const clientToken = <HTMLInputElement> document.getElementById('stored-token')

const request1 = document.getElementById('first')
const request2 = document.getElementById('second')
const request3 = document.getElementById('third')

const TOKEN_EXPIRED = 3
let state = {
  requestingToken: false,
  requestTokenPromise: Promise.resolve()
}
// Sample: Solution for intercepting request and renew token

// fake request return a promise
async function request() {
  if (serverToken.value !== clientToken.value) {
    return Promise.reject(TOKEN_EXPIRED)
  }

  return Promise.resolve({status: 'success'})
}

async function renew(second) {
  state.requestingToken = true
  console.log('renewing Token')
  return new Promise((rs) => {
    delay(() => {
      rs(serverToken.value)
    }, second * 1000)
  }).then((token) => {
    state.requestingToken = false
    console.log('finish Token')
    clientToken.value = <string><unknown>token
  })
}

async function doRequest() {
  return new Promise((rs, rj) => {
    request()
    .then(data => rs(data))
    .catch((err) => {
      if (err === TOKEN_EXPIRED) {
        if (!state.requestingToken) {
          state.requestTokenPromise = renew(3)
        }
        state.requestTokenPromise.then(() => request()).then(data => rs(data))
      } else {
        rj(rs)
      }
    })
  })
}

request1?.addEventListener('click', () => {
  doRequest().then((data) => {
    console.log('first ', data)
  })
})
request2?.addEventListener('click', () => {
  doRequest().then((data) => {
    console.log('second ', data)
  })
})
request3?.addEventListener('click', () => {
  doRequest().then((data) => {
    console.log('last ', data)
  })
})