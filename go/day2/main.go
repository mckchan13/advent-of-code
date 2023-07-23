package main

/*
packages to import
"bufio"
"os"
"reflect"
*/

import (
	"bufio"
	_ "embed"
	"fmt"
	"os"
	"strings"
)

func main() {
	moveCode := make(map[string]string)
	moveCode["A"] = "rock"
	moveCode["B"] = "paper"
	moveCode["C"] = "scissors"
	moveCode["X"] = "rock"
	moveCode["Y"] = "paper"
	moveCode["Z"] = "scissors"

	moveBeats := make(map[string]string)
	moveBeats["rock"] = "scissors"
	moveBeats["paper"] = "rock"
	moveBeats["scissors"] = "paper"

	rpsPointsMap := make(map[string]int)
	rpsPointsMap["rock"] = 1
	rpsPointsMap["paper"] = 2
	rpsPointsMap["scissors"] = 3

	readFile, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	fileScanner := bufio.NewScanner(readFile)
	fileScanner.Split(bufio.ScanLines)

	myScore := 0

	for fileScanner.Scan() {
		line := fileScanner.Text()
		stringSlice := strings.Split(line, " ")
		fmt.Println(stringSlice[0], stringSlice[1])
		opponentMoveCode := stringSlice[0]
		myMoveCode := stringSlice[1]

		oppMove := moveCode[opponentMoveCode]
		myMove := moveCode[myMoveCode]
		if oppMove == myMove {
			myScore += 3 + rpsPointsMap[myMove]
		} else if moveBeats[myMove] == oppMove {
			myScore += 6 + rpsPointsMap[myMove]
		} else {
			myScore += rpsPointsMap[myMove]
		}
	}

	fmt.Println(myScore)
}
