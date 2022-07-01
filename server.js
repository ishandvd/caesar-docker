require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

app.post('/caesar', authenticateToken, (req, res) => {
  const message = req.body.message
  const shiftedMessage = []
  for(let i = 0; i < message.length; i++) {
    var asciiVal = message.charCodeAt(i)
    var shift = parseInt(req.body.shift)
    var newAsciiVal = (((asciiVal - 97) + shift) % 26) + 97
    var newChar = String.fromCharCode(newAsciiVal)
    shiftedMessage.push(newChar)
    // 97 to 122 inclusive
    console.log(asciiVal)
  }

  res.json({"shifted" : shiftedMessage.join("")})

  res.json(posts)


})

function authenticateToken(req, res, next) {
  console.log("Authenticating Token")
  const authHeader = req.body.token
  console.log("token provided: " + authHeader)
  // const token = authHeader && authHeader.split(' ')[1]
  const token = authHeader
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(3000)