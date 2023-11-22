package main

import (
	"encoding/json"
	"fmt"
)

type JsonObject = map[string]interface{}
type JsonArray = []interface{}

func main() {
	jsonData := `{"objectData": { "arrayData": ["john", "tim", "greg"],"objectNullData": {} }}`

	var data map[string]interface{}
	json.Unmarshal([]byte(jsonData), &data)

	list := []string{"asd", "asdasd", "qweqwe"}

	member, ok := data["objectData"].(JsonObject)["arrayData"].(JsonArray)
	if !ok {
		fmt.Printf("\n%v", ok)
	}
	fmt.Printf("\n%v", list)
	fmt.Printf("\n%v", member)
}
