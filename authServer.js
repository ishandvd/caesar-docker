require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(express.json())

let refreshTokens = []
const users = []

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})


app.post('/createAccount', async (req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { username: req.body.username, password: hashedPassword }
    users.push(user)
    console.log(users)
    res.status(201).send()
  }
  catch{
    res.status(500).send()
  }


})



// send user an access token and a refresh token
// access token will expire after pre-determined amount of time
// upon which user has to use refresh token to generate new access token
app.post('/login', async (req, res) => {
  const username = req.body.username
  const user = users.find(user => user.username === req.body.username)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }

  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken(user)
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      // store the refresh token locally... (here, we use a list of refresh tokens. *Very* unsafe)
      refreshTokens.push(refreshToken) 
      res.json({ accessToken: accessToken, refreshToken: refreshToken })
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }

  
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '400s' })
}

app.listen(4000)