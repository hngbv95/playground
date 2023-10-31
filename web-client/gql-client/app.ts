// local server port 8080
// start in server
const url = "/graphql"

fetch(url, {
  method: "POST",
  body: JSON.stringify({
    "query": "{\n  users {\n    name\n    assets\n  }\n}",
    "variables": {},
    "operationName": ""
  }),
  headers: new Headers({
    "Content-Type": "application/json"
  }),
}).then(res => {
  return res.json()
}).then(rs => {
  console.log(rs.data)
})
