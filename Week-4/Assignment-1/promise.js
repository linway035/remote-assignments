function delayedResultPromise(n1, n2, delayTime) {
  // your code here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = n1 + n2
      resolve(result)
    }, delayTime)
  })
}
delayedResultPromise(4, 5, 3000).then(console.log)
// 9 (4+5) will be shown in the console after 3 seconds

//回傳的是一個Promise物件，所以可以接then or catch
