function count(input) {
  // your code here
  let result = {}
  for (let i = 0; i < input.length; i++) {
    // 如果key已存在則value+1，若key尚未存在則建立
    if (result[input[i]]) {
      result[input[i]] += 1
    } else {
      result[input[i]] = 1
    }
  }
  return result
}
let input1 = ["a", "b", "c", "a", "c", "a", "x"]
console.log(count(input1))
// should print {a:3, b:1, c:2, x:1}

function groupByKey(input) {
  // your code here
  let result = {}
  for (let i = 0; i < input.length; i++) {
    let current = input[i]
    if (result[current.key] === undefined) {
      result[current.key] = current.value
    } else {
      result[current.key] += current.value
    }
  }
  return result
}
let input2 = [
  { key: "a", value: 3 },
  { key: "b", value: 1 },
  { key: "c", value: 2 },
  { key: "a", value: 3 },
  { key: "c", value: 5 },
]
console.log(groupByKey(input2))
// should print {a:6, b:1, c:7}
