// 總路由器

// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入  模組程式碼
const data = require('./modules/data')
const myName = require('./modules/myName')
const trackName = require('./modules/trackName')

router.use('/data', data)
router.use('/myName', myName)
router.use('/trackName', trackName)

// 匯出路由器
module.exports = router
