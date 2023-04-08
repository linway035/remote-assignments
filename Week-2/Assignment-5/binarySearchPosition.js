function binarySearchPosition(numbers, target) {
  // your code here
  // numbers = numbers.sort()  已經sorted了，且index位置會被改變
  let left = 0
  let right = numbers.length - 1
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (numbers[mid] === target) {
      return mid
    } else if (numbers[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
}

console.log(binarySearchPosition([1, 2, 5, 6, 7], 1)) // should print 0
console.log(binarySearchPosition([1, 2, 5, 6, 7], 6)) // should print 3
