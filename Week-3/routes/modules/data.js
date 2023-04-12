const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  const numberStr = req.query.number
  const number = Number(numberStr) //必須轉成數字，isInteger才會判斷
  //0是falsy
  if (!numberStr) {
    res.send('Lack of Parameter')
  } else if (isNaN(number) || !Number.isInteger(number) || number <= 0) {
    res.send('Wrong Parameter')
  } else {
    //或是高斯求和sum=(N*(N+1))/2，以提升效率
    let sum = 0
    for (let i = 1; i <= number; i++) {
      sum += i
    }
    if (number === 1) {
      res.send(`1=${sum}`)
    } else if (number === 2) {
      res.send(`1+2=${sum}`)
    } else res.send(`1+2+....+${number}=${sum}`)
  }
})

module.exports = router
