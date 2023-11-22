package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

type User struct {
	Name   string   `json:"name"`
	Assets []string `json:"assets"`
}

var users = []User{
	{Name: "John Lennon", Assets: []string{"laptop", "car"}},
	{Name: "Bob Dylan", Assets: []string{"laptop", "car"}},
	{Name: "Larry David", Assets: []string{"laptop", "car"}},
}

var AssetType = graphql.NewEnum(graphql.EnumConfig{
	Name: "Asset",
	Values: graphql.EnumValueConfigMap{
		"laptop": &graphql.EnumValueConfig{Value: "laptop"},
		"car":    &graphql.EnumValueConfig{Value: "car"},
	},
})

var UserType = graphql.NewObject(graphql.ObjectConfig{
	Name: "User",
	Fields: graphql.Fields{
		"name":   &graphql.Field{Type: graphql.String},
		"assets": &graphql.Field{Type: graphql.NewList(AssetType)},
	},
})

func main() {
	fields := graphql.Fields{
		"users": &graphql.Field{
			Type: graphql.NewList(UserType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return users, nil
			},
		},
	}
	rootQuery := graphql.ObjectConfig{Name: "RootQuery", Fields: fields}
	schemaConfig := graphql.SchemaConfig{Query: graphql.NewObject(rootQuery)}

	schema, err := graphql.NewSchema(schemaConfig)
	if err != nil {
		log.Fatalf("failed to create new schema, error: %v", err)
	}

	h := handler.New(&handler.Config{
		Schema:     &schema,
		Pretty:     true,
		GraphiQL:   true,
		Playground: true,
	})

	http.Handle("/graphql", h)
	http.HandleFunc("/bar", func(w http.ResponseWriter, r *http.Request) {
		fmt.Print("Hello")
	})

	fmt.Printf("Listen and Serve at 8080")
	http.ListenAndServe(":8080", nil)
}
