const express = require('express')
const router = express.Router()

const cookieParser = require('cookie-parser')
router.use(cookieParser())

router.get('/', (req, res) => {
  const name = req.cookies.name // 從cookies中取得name
  if (name) {
    // 如果有name，直接回傳name
    res.send(`user’s name from cookies:  ${name}`)
  } else {
    // 如果沒有name，顯示表單
    res.send(`
      <form action="/trackName" method="GET">
        <label for="name">Enter your name:</label>
        <input type="text" id="name" name="name">
        <button type="submit">Submit</button>
      </form>
    `)
  }
})

module.exports = router
