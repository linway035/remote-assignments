const express = require('express')
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
