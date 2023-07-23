var cycleGenerator = function* (arr, startIndex) {
  const indexObj = {
    currIndex: startIndex
  }
  
  let jump = yield arr[indexObj.currIndex];

  while (true) {
    jump = yield getValue(arr, indexObj, jump)
  }
    
};

function getValue(arr, indexObj, jump) {
  const { currIndex }= indexObj
  let newIndex;

  if (jump < 0 && currIndex === 0) newIndex = arr.length - 1;
  else if (jump > 0 && currIndex === arr.length - 1) newIndex = 0;
  else newIndex = Math.abs(currIndex + jump) % arr.length;
  indexObj.currIndex = newIndex
  
  return arr[newIndex];
}

// console.log(`currIdx: ${currIndex}, jump: ${jump}, newIndex: ${newIndex}`)
/**
 * len = 5
 * index: 0 + 3
 * index: 3 + 3 = 6 => greater than len =>
 * [0,1,2,3,4]
 */

const cg = cycleGenerator([10, 11, 12, 13, 14, 15], 1)

console.log(cg.next())

for (const input of [1, 4, 0, -1, -3]) {
  console.log(cg.next(input))
}