package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"strconv"
)

func main() {
	// open file
	file, error := os.Open("input.txt")
	if error != nil {
		log.Fatal(error)
	}

	// close file at end of program
	defer file.Close()

	// read the file line by line with the scanner
	scanner := bufio.NewScanner(file)

	var cumulative_cals float64 = 0
	var max_cals float64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if len(line) != 0 {
			curr_cals, error := strconv.ParseFloat(line, 64)

			if error != nil {
				log.Fatal(error)
			}

			cumulative_cals += curr_cals
		} else {
			max_cals = math.Max(max_cals, cumulative_cals)
			cumulative_cals = 0
		}
	}

	fmt.Println(max_cals)
}
