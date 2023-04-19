function delayedResultPromise(n1, n2, delayTime) {
  // your code here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = n1 + n2
      resolve(result)
    }, delayTime)
  })
}

async function main() {
  // your code here, you should call delayedResultPromise here and get the result using async/await.
  const result1 = await delayedResultPromise(4, 5, 5000)
  console.log(result1) // 執行後過5秒顯示9

  const result2 = await delayedResultPromise(-5, 10, 7000)
  console.log(result2) // 執行後過12秒顯示5
}
main() // result will be shown in the console after <delayTime> seconds

//結果會是9 5
