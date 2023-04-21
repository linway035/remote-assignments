const express = require('express')
const { faker } = require('@faker-js/faker') //需要加上{}
require('dotenv').config()

const app = express()
const port = 3000

const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})

app.use(express.urlencoded({ extended: true }))

//home
app.get('/', (req, res) => {
  res.send(`
    <h1>Home Page</h1>  
    <h2>Sign Up</h2>
    <form method='post' action='/signup'>
      <label>Email:</label>
      <input type='email' name='email' required>
      <br>
      <label>Password:</label>
      <input type='password' name='password' required>
      <br>
      <input type="submit" value="Sign Up">
    </form>
    <h2>Sign In</h2>
    <form method='post' action='/signin'>
      <label>Email:</label>
      <input type='email' name='email' required>
      <br>
      <label>Password:</label>
      <input type='password' name='password' required>
      <br>
      <input type="submit" value="Sign In">
    </form>  
  `)
})

//signup
app.post('/signup', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  // 檢查資料庫中是否已經有相同的 email
  const query = `SELECT * FROM user WHERE email = ?` // prepared statement，防SQL injection
  connection.query(query, [email], (err, results) => {
    if (err) {
      res.send('Error: ' + err.message)
      return //防止程式碼繼續執行
    }
    if (results.length > 0) {
      res.send(`
        <script>
          setTimeout(() => {
            alert('This email is already registered')        
            window.location.href = '/'
          },1000)
        </script>    
      `)
      return
    }
    // 如果沒有相同的 email，則將使用者資料插入資料庫
    const insertQuery = `INSERT INTO user (email, password) VALUES (?, ?)`
    connection.query(insertQuery, [email, password], (err, results) => {
      if (err) {
        res.send('Error: ' + err.message)
        return
      }
      res.redirect('/member')
    })
  })
})

//signin
app.post('/signin', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const query = `SELECT * FROM user WHERE email = ? AND password = ?`
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      res.send('Error: ' + err.message)
      return
    }
    if (results.length === 0) {
      res.send(`
        <script>
          setTimeout(() => {
            alert('Invalid email or password')        
            window.location.href = '/'
          },1000)
        </script>    
      `)
      return
    }
    res.redirect('/member')
  })
})

//member
app.get('/member', (req, res) =>
  res.send(`
  simple welcome message 
  <br>
  <a href="/">Back</a>
  `)
)
//fake user author 設3個
for (let i = 0; i < 3; i++) {
  const email = faker.internet.email()
  const password = faker.internet.password()
  const query = `INSERT INTO user (email, password) VALUES (?, ?)`
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.log('Error inserting user:', err.message)
    }
  })
}

//fake articles 設30篇
for (let i = 0; i < 30; i++) {
  const title = faker.lorem.sentence()
  const content = faker.lorem.paragraphs()
  const authorId = Math.floor(Math.random() * 3) + 1 // 設3人。 測試變數名為駝峰，sql用snake case，可行。

  const query = `INSERT INTO article (title, content, author_id) VALUES (?, ?, ?)`
  connection.query(query, [title, content, authorId], (err, results) => {
    if (err) {
      console.log('Error inserting article:', err.message)
    }
  })
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
