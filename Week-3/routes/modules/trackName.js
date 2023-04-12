const express = require('express')
const router = express.Router()

const cookieParser = require('cookie-parser')
router.use(cookieParser())

router.get('/', (req, res) => {
  const name = req.query.name
  if (name) {
    res.cookie('name', name) // 將name存入cookies
  }
  res.redirect('/myName') // 重新導向到/myName
})

module.exports = router
