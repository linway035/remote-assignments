const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes') // 引用路由器

// setting static files靜態檔案
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello, My Server!')
})

// 將 request 導入路由器
app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
