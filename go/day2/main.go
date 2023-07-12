package main

/*
packages to import
"bufio"
"os"
*/

import (
	_ "embed"
	"fmt"
)

// go embed directive syntax
//go:embed day2.txt
var input string

func main() {
	fmt.Println(input)
}
