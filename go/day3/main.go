package main

import (
	"fmt"
	"reflect"
)

func main() {
	var hello string = "hello world"
	fmt.Println("hello world!")
	reflect.TypeOf(hello)
}
